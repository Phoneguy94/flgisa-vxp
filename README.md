# FLGISA VXP

Parallel, FLGISA-only recreation of the existing camera and hero wall.

## Test pages

- `/camera/` — FLGISA camera/kiosk
- `/wall/` — FLGISA hero wall
- `/` — test landing page

## Isolation guarantee

This repository was built separately. No files in `Phoneguy94/0924` were modified.

## Current compatibility mode

The first version deliberately uses the existing production dependencies for like-for-like testing:

- Existing Webex Connect capture webhook
- Existing Airtable table and FLGISA fields, indirectly through the existing wall feed
- Existing FLGISA background asset
- Existing claim and QR destination flow
- Existing `Kiosk-FLGISA-<City or County>` EventName pattern

See `docs/MIGRATION-CHECKLIST.md` for the Airtable, Webex Connect, security, consent, and eventual Veytec cutover work.
