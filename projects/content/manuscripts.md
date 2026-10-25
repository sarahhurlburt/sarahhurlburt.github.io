# Manuscripts

Transcription, translation, and reading tools for nineteenth-century manuscript sources from the Columbia Plateau: fur trade post journals, missionary correspondence, and Catholic mission writings.

## Fort Nez Perces Post Journal — transcription
- **Status:** Paused. Two volumes complete; one verification pass pending.
- **Active:** Spring 2026
- **Last updated:** 26 May 2026
- **Version:** Transcription prompt v5
- **Source:** Hudson's Bay Company Archives, Fort Nez Perces post journals, from microfilm scans:
  - [B.146/a/1](https://pam.minisisinc.com/scripts/mwimain.dll/144/LISTINGS_WEB2_INT/LISTINGS_DET_REP_FULL_GR/SISN%2026130?sessionsearch), 26 March – 30 November 1831 (52 pages), kept by Simon McGillivray Jr., with an interim in another hand
  - [B.146/a/2](https://pam.minisisinc.com/scripts/mwimain.dll/144/LISTINGS_WEB2_INT/LISTINGS_DET_REP_FULL_GR/SISN%2026135?sessionsearch), 1 December 1831 – 17 March 1832 (25 pages), kept by McGillivray Jr.
- **What it is:** Complete diplomatic transcriptions of two consecutive Fort Nez Perces post journals, covering just under a year of daily life at the post. Each volume comes with a set of derived indexes built from the transcription:
  - named persons, with role tables for HBC officers, voyageurs and freemen, and chiefs and notables
  - places, grouped by posts, rivers, regions, and camps
  - significant events, each rated for how likely the reading is to be a machine error
  - a ledger of every good moving through the post (supply, trade, and farming at the post; wages and diplomatic gifts; furs)
  - a dated weather log
  - a running list of low-confidence readings
- **Process summary:**
  - Work proceeded page by page from 300 DPI images extracted from the microfilm PDFs, with left and right leaves cropped separately. Manuscript page numbers and leaf divisions are preserved in the transcription.
  - A timestamped log records each page and each correction pass, so any reading can be traced to when and how it was made.
  - A reusable transcription prompt, now in its fifth version, carries every convention and lesson forward to the next volume. It later served as the model for the De Smet project's handling of uncertain readings.
  - Scribal conventions were worked out against the hand rather than normalized: McGillivray's long dashes function as periods; paired slashes mark parentheticals; and long-s readings are resolved by context. The long-s also produced a systematic misreading in voyageur surnames ("Sory" for "Sous"), which was confirmed on one page and flagged retroactively everywhere else.
  - Corrections were made against the researcher's own knowledge of the post. For example, an apparent "Mr Pierre" can be McGillivray's abbreviation of "Nez Perces," and a garbled group name proved to be the Cayouses.
  - Watson's *Lives Lived West of the Divide* was used to disambiguate voyageur names.
  - Lesson: Markdown tables in the indexes needed strict rules (every cell filled, matching column counts) to avoid silent column collapse.
- **Next planned:** Image-level confirmation of the nine flagged "Sous" readings in B.146/a/1; the next surviving volume in the B.146 series, if procured.
- **Public demo:** ⟨to be made — the transcription and indexes can be shown as text; page images only within HBCA reproduction terms⟩
- **Rights note:** HBCA / Archives of Manitoba reproduction terms apply to page images.
- **Changelog:**
  - 2026-05-26 — Retroactive Sory→Sous pass staged in B.146/a/1.

## Perkins Journal-Letter — transcription and reading viewer
- **Status:** Paused (awaiting completion of transcription edits)
- **Active:** July–August 2026
- **Last updated:** August 2026 ⟨confirm⟩
- **Version:** ⟨?⟩
- **Source:** H.K.W. Perkins, journal-letter to Rev. Charles Pitman, Wascopam (The Dalles), December 1843 – March 1844. University of Puget Sound, Collins Memorial Library; digitized via JSTOR.
- **Collaborator:** Transcription by Sarah Hurlburt and Grace Baguma
- **What it is:** A facing-page reading tool that pairs each manuscript page with its diplomatic transcription. It covers 58 manuscript pages. Pages 21–24 were burned by Perkins before sending, and pages 29–32 and 41–44 are given as editorial summaries. Thematic flags mark passages on language, kinship, food security, labor, agriculture, climate, the Walla Walla, and settler perspective.
- **Process summary:**
  - The transcription is kept as a single Markdown file with light markup for uncertain readings, illegible passages, Perkins's underlines, linked corrections, index blocks, and thematic flags. The viewer converts that markup into styled text.
  - The scan PDF is loaded through a file picker rather than a fixed path, so the viewer works from any folder (including Google Drive) with no server.
  - The manuscript's non-linear sheet order required a hand-coded page map, and the PDF offset had to be verified directly from the file.
  - Rendering at native scan resolution and showing full two-page spreads fixed early image-quality and cropping problems.
  - Features: zoom and pan, a draggable divider, full-text search across all pages, a page-jump menu, keyboard navigation, and a legend.
- **Next planned:** A title page with document metadata; final build once the transcription edits are complete.
- **Public demo:** ⟨to be made — the JSTOR-hosted scans cannot be bundled; options are transcription-only, or a few cleared sample pages⟩
- **Changelog:** —

## De Smet manuscripts — transcription and verification pilot
- **Status:** Pilot complete; grant planning in progress
- **Active:** September 2026
- **Last updated:** 30 September 2026
- **Version:** Prototype, reviewer 1 and reviewer 2 copies
- **Source:** Sample pages of French-language manuscripts by Pierre-Jean De Smet, S.J. (clear hand, good scans, standard French)
- **What it is:** A test of machine transcription and translation at scale, plus a prototype verification tool. Reviewers check each line of the manuscript scan, the diplomatic transcription, and a close, line-bound English translation side by side, then accept, correct, or escalate flagged readings.
- **Process summary:**
  - Transcription accuracy is kept strictly separate from editorial standardization: period spellings are preserved, and Indigenous words, ethnonyms, and place names stay in manuscript form even in translation.
  - Uncertain readings follow the same editorial approach developed for the HBC post-journal work.
  - Pilot pages compared a custom AI workflow against Transkribus, with cost per page, quality, and time estimated by difficulty category rather than as a single project total.
  - The verification tool links each transcribed line to its location on the scan. It logs reviewer decisions and errors that were missed by the flags.
  - The tool was originally constructed to time transcription and translation review separately to measure effort for the purpose of writing a grant. This function exists but the design serves also to pilot a potential user interface.
  - The translation is deliberately close rather than fluent, since many researcher-users read no French and may wish to check against the original.
- **Public demo:** ⟨to be made — read-only copy without saving or timers; pages cleared by the holding archive⟩
- **Changelog:** —
