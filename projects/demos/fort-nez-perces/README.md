# Fort Nez Perces post journal — review demonstration

A demonstration of a machine-reading-and-review workflow for 19th-century
fur-trade manuscripts, using five leaves of the Fort Nez Perces post journal
(Hudson's Bay Company Archives B.146/a/2, December 1831 – January 1832,
kept by Simon McGillivray Jr.).

**Open `index.html`** (or the GitHub Pages address for this repository). It is
one self-contained file; no account or installation is needed.

## What it shows
- **A blind machine reading.** Each leaf was transcribed by Claude (Anthropic)
  from the scan alone: no names list, no earlier transcription, no reference
  works. Spelling, punctuation and abbreviations are kept as written.
- **Flags for review.** Every personal name, Indigenous name or word, name of
  a people, place name, French word and uncertain reading is marked. Each flag
  carries a note and a rating of how likely the reading is to be wrong.
- **Human review.** A reviewer accepts, corrects or escalates each flag
  against the scan, and logs any errors the reading did not flag.

In this demonstration your decisions are saved only in your own browser.
**Reset demo** clears them; **Export JSON** downloads them.

## Using the viewer
- Tabs switch between the five leaves.
- Scroll or drag to move the scan; pinch, Ctrl/⌘ + scroll or − / + to zoom.
- Click a line to move the scan to about where it sits (a dashed guide marks
  it; the position is estimated, not measured).
- Click an underlined word, or a chip, to open its flag.
- Click a colour in the legend to show one kind of flag only.
- Press `?` for keyboard shortcuts.

## Source and credit
Scans: Hudson's Bay Company Archives, Archives of Manitoba, B.146/a/2, Fort
Nez Perces post journal, vol. 2 (1 Dec. 1831 – 17 Mar. 1832), from the
Archives' digitized microfilm. The journal is in the public domain.
<https://gov.mb.ca/chc/archives/hbca/hbca_microfilm_digitization.html>

Transcription and flags: machine reading, unreviewed. Not an edition; do not
cite readings without checking the manuscript.

Workflow and review design: Sarah Hurlburt, Whitman College, 2026.
