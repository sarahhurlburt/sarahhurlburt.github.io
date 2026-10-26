/* portal.js -- renders the /projects/ section from Markdown files, in the browser.
 * No build step: the owner edits content/*.md and uploads them. Each page calls
 *   renderArea('content/manuscripts.md')   (area pages)
 *   renderIndex()                          (landing page)
 * Requires marked.js to be loaded first.
 */

// ---- Site-wide settings (edit here to rename nav items or add an area) ----
var AREAS = [
  { key: 'manuscripts', label: 'Manuscripts', href: 'manuscripts.html', md: 'content/manuscripts.md' },
  { key: 'photos',      label: 'Photographs', href: 'photos.html',      md: 'content/photos.md' },
  { key: 'maps',        label: 'Maps',        href: 'maps.html',        md: 'content/maps.md' }
];
var NAV = [{ key: 'index', label: 'Projects', href: 'index.html' }].concat(AREAS, [{ key: 'demos', label: 'Demos', href: 'demos.html' }]);

// Order in which fields appear on a card. Anything not listed goes last, in source order.
var FIELD_ORDER = ['What it is', 'Source', 'Collaborator', 'Question', 'Data', 'Method',
  'Process summary', 'Result', 'Supporting documents', 'Public demo', 'Public image',
  'Rights note', 'Next planned', 'Changelog'];
var META_FIELDS = ['Status', 'Active', 'Version', 'Last updated']; // shown in the metadata line
var COLLAPSIBLE = ['Process summary', 'Changelog'];                 // rendered as closed <details>
var SHOW_FORTHCOMING = ['Public demo', 'Public image'];             // shown as "Forthcoming." if empty
var NEVER_SHOW = ['Private links'];                                  // defensive

var FILE_MSG = 'This page loads its content from content/*.md and must be viewed from the web or a local server.';

// ---- Small helpers ----
function el(tag, cls, html) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
// Remove the owner's private notes: anything inside (and including) the angle brackets.
// Done on the raw Markdown so the notes can never reach the page. Stray brackets are dropped too.
function stripNotes(md) { return md.replace(/⟨[^⟩]*⟩/g, '').replace(/[⟨⟩]/g, ''); }
// True if an HTML fragment has no real content (blank, or only dashes / question marks).
function isEmpty(html) {
  var t = el('div', '', html).textContent;
  return /^[\s—–\-?]*$/.test(t);
}
function dateOf(p) { return p.meta['Last updated']; }

// ---- The parser: Markdown text -> { title, introHtml, projects[] } ----
function parseArea(mdText) {
  var root = el('div', '', marked.parse(stripNotes(mdText)));
  var area = { title: '', introHtml: '', projects: [] }, cur = null, haveIntro = false;
  Array.prototype.forEach.call(root.children, function (node) {
    var tag = node.tagName;
    if (tag === 'H1') { area.title = node.textContent.trim(); return; }
    if (tag === 'H2') {
      cur = { title: node.innerHTML, id: '', meta: {}, fields: [], extra: [] };
      cur.id = slugify(node.textContent);
      area.projects.push(cur);
      return;
    }
    if (!cur) {                                   // before the first H2
      if (tag === 'P' && !haveIntro) { area.introHtml = node.innerHTML; haveIntro = true; }
      return;
    }
    if (tag === 'UL' && !cur.listDone) {          // the project's field list
      cur.listDone = true;
      Array.prototype.forEach.call(node.children, function (li) { readField(cur, li); });
    } else {
      cur.extra.push(node);                       // stray paragraphs etc. kept as-is
    }
  });
  // make ids unique if two titles slugify the same
  var seen = {};
  area.projects.forEach(function (p) {
    if (seen[p.id]) { seen[p.id]++; p.id += '-' + seen[p.id]; } else { seen[p.id] = 1; }
  });
  return area;
}

// One top-level <li> of the form <strong>Label:</strong> value...
function readField(project, li) {
  var strong = li.querySelector('strong');
  if (!strong || li.firstElementChild !== strong && li.firstChild !== strong) return;
  var label = strong.textContent.replace(/:\s*$/, '').trim();
  strong.remove();
  var html = li.innerHTML.trim();
  if (NEVER_SHOW.indexOf(label) > -1) return;
  if (META_FIELDS.indexOf(label) > -1) {
    if (!isEmpty(html)) project.meta[label] = html;
    return;
  }
  if (isEmpty(html)) {
    if (SHOW_FORTHCOMING.indexOf(label) > -1) html = 'Forthcoming.'; else return;
  }
  project.fields.push({ label: label, html: html });
}

// ---- Rendering a project card ----
function badgeClass(status) {
  var s = status.toLowerCase();
  return s.indexOf('paused') > -1 ? 'badge badge-muted' : 'badge'; // "In use", "complete" etc. are neutral
}
function renderProject(p) {
  var art = el('article', 'project'); art.id = p.id;
  art.appendChild(el('h2', '', '<a class="anchor" href="#' + p.id + '">' + p.title + '</a>'));

  // Metadata line: Last updated (prominent), status badge, then Active / Version
  var m = el('p', 'meta');
  if (p.meta['Last updated']) m.appendChild(el('span', 'updated', 'Last updated: <strong>' + p.meta['Last updated'] + '</strong>'));
  if (p.meta['Status']) m.appendChild(el('span', badgeClass(p.meta['Status'].replace(/<[^>]*>/g, '')), p.meta['Status']));
  if (p.meta['Active']) m.appendChild(el('span', '', 'Active: ' + p.meta['Active']));
  if (p.meta['Version']) m.appendChild(el('span', '', 'Version: ' + p.meta['Version']));
  if (m.children.length) art.appendChild(m);

  p.extra.forEach(function (n) { art.appendChild(n); });

  // Known fields in the fixed order, then unknown ones in source order
  var sorted = [];
  FIELD_ORDER.forEach(function (l) { p.fields.forEach(function (f) { if (f.label === l) sorted.push(f); }); });
  p.fields.forEach(function (f) { if (FIELD_ORDER.indexOf(f.label) < 0) sorted.push(f); });

  sorted.forEach(function (f) {
    if (COLLAPSIBLE.indexOf(f.label) > -1) {
      art.appendChild(el('details', 'field', '<summary>' + esc(f.label) + '</summary><div>' + f.html + '</div>'));
    } else {
      art.appendChild(el('section', 'field', '<h3>' + esc(f.label) + '</h3><div>' + f.html + '</div>'));
    }
  });
  return art;
}

// ---- Shared header / footer, injected so all pages stay identical ----
function renderChrome() {
  var page = document.body.getAttribute('data-page');
  var nav = NAV.map(function (n) {
    var cur = n.key === page;
    return '<a href="' + n.href + '"' + (cur ? ' aria-current="page"' : '') + '>' + n.label + '</a>';
  }).join('');
  document.getElementById('site-header').innerHTML =
    '<div class="wrap bar"><a class="site-name" href="/">Sarah Hurlburt</a><nav aria-label="Projects">' + nav + '</nav></div>';
  document.getElementById('site-footer').innerHTML =
    '<div class="wrap">Pages generated from Markdown source · Each project shows its own last-updated date.</div>';
}

function showError(main) {
  main.innerHTML = '<p class="notice">' + FILE_MSG + '</p>';
}
function fetchText(path) {
  return fetch(path).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); });
}

// ---- Entry point for the three area pages ----
function renderArea(mdPath) {
  renderChrome();
  var main = document.getElementById('main');
  fetchText(mdPath).then(function (txt) {
    var area = parseArea(txt);
    main.innerHTML = '';
    main.appendChild(el('h1', '', esc(area.title)));
    if (area.introHtml) main.appendChild(el('p', 'intro', area.introHtml));
    area.projects.forEach(function (p) { main.appendChild(renderProject(p)); });
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  }).catch(function () { showError(main); });
}

// ---- Entry point for the landing page: one card per area ----
function renderIndex() {
  renderChrome();
  var main = document.getElementById('cards');
  Promise.all(AREAS.map(function (a) {
    return fetchText(a.md).then(parseArea);
  })).then(function (areas) {
    main.innerHTML = '';
    areas.forEach(function (area, i) {
      var a = AREAS[i], card = el('section', 'area-card');
      card.appendChild(el('h2', '', '<a href="' + a.href + '">' + esc(area.title || a.label) + '</a>'));
      card.appendChild(el('p', '', area.introHtml));
      var ul = el('ul', 'proj-list');
      area.projects.forEach(function (p) {
        var d = dateOf(p) ? ' <span class="when">Last updated ' + dateOf(p) + '</span>' : '';
        ul.appendChild(el('li', '', '<a href="' + a.href + '#' + p.id + '">' + p.title + '</a>' + d));
      });
      card.appendChild(ul);
      main.appendChild(card);
    });
  }).catch(function () { showError(main); });
}
