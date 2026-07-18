# FLGISA VXP

Parallel, FLGISA-only recreation of the existing camera and hero wall.

## Test pages

- `/camera/` — FLGISA camera/kiosk
- `/wall/` — FLGISA hero wall
- `/` — test landing page

## Isolation guarantee

This repository was built separately. No files in the existing live source repository were modified.

## Current compatibility mode

The first version deliberately uses the existing production dependencies for like-for-like testing:

- Existing Webex Connect capture webhook
- Existing Airtable table and FLGISA fields, indirectly through the existing wall feed
- Existing FLGISA background asset
- Existing claim and QR destination flow
- Existing `Kiosk-FLGISA-<City or County>` EventName pattern

## Final Veytec handoff rule

The production repository and deployed site must contain zero references to the current personal GitHub account or legacy project path. Run `node tools/check-legacy-references.js` before handoff; it must pass with no findings.

See `docs/MIGRATION-CHECKLIST.md` and `docs/LEGACY-DEPENDENCY-AUDIT.md` for Airtable, Webex Connect, security, consent, dependency removal, and Veytec cutover work.
