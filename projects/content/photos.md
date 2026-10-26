# Photographs

Tools and workflows for cataloging family photograph collections, including loans for the Métis Families of the Columbia Plateau collection.

## Photo Catalog Tool — Local and Remote
- **Status:** In use; development paused
- **Active:** Summer–September 2026
- **Last updated:** ⟨?⟩
- **Version:** Local V5 + Remote ⟨confirm numbering⟩
- **Source:** Family photograph loans for the Métis Families of the Columbia Plateau collection, bound for Whitman's digital archive (arminda.whitman.edu). Four loan collections cataloged so far. The tool is now general-purpose and also used for a separate family photo collection.
- **What it is:** Two companion browser tools for cataloging scanned photographs against a shared Google Sheet.
  - The **Local** tool loads photos from a folder on the cataloger's computer.
  - The **Remote** tool is opened from an emailed link and serves photos from Google Drive, so collaborators need no local setup.
  - Both tools edit their connected spreadsheet live.
- **Process summary:**
  - The Google Sheet is the single source of truth. A small Apps Script backend reads its columns and dropdown lists automatically, so new collections need no reconfiguration.
  - Recto/verso pairing supports three filename conventions (suffix, a/b pairs, and odd/even sequential), chosen per tab. Verso option is greyed out if no verso file is found.
  - Other features: rotation, grid and record views, per-tab column visibility, and a filtered print-ready album export with custom ordering and rotation saved back to the sheet.
  - Key lessons:
    - Apps Script deployments serve cached code, so every update needs a new deployment.
    - Each spreadsheet's script needs its own Drive authorization.
    - Images have to be sent as encoded data rather than raw files for anonymous visitors.
    - Opening new tabs from inside Apps Script is unreliable, so exports download instead.
  - Collaborator compatibility (an older Mac) shaped many interface decisions.
- **Supporting documents:** Deployment checklist, new-collection link instructions, local user guide, collaborator guide
- **Public demo:** https://sarahhurlburt.com/projects/demos/metis-photos/
- **Rights note:** Photographs are family loans; public images only with the families' permission.
- **Changelog:** —
