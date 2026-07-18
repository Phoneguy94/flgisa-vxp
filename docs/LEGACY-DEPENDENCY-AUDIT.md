# Legacy Dependency Audit

## Final acceptance rule

The production Veytec repository and deployed site must contain **zero references** to the current personal GitHub account, personal GitHub Pages hostname, or the `/0924` project path.

Run this before final handoff:

```bash
node tools/check-legacy-references.js
```

The command must return:

```text
PASS: no legacy personal-host references found.
```

## Parallel-test dependencies still intentionally active

These remain temporarily because the new build must work with the existing live system during testing:

1. New GitHub Pages base URL in `config.js`.
2. Existing FLGISA background image in `config.js`.
3. Existing event-wall feed in `config.js`.
4. Existing claim destination in `config.js`.
5. Existing Webex Connect capture webhook.

The Webex Connect URL does not identify the personal GitHub account, but it still needs an ownership decision before Veytec handoff.

## Removal sequence

1. Copy all FLGISA backgrounds and static assets into the destination repository.
2. Replace the background URL with a repository-relative path.
3. Build the FLGISA feed directly in this repository or behind a Veytec-controlled secure endpoint.
4. Recreate the claim and photo pages in the destination repository.
5. Replace every QR destination with the Veytec-controlled claim URL.
6. Replace the GitHub Pages base URL with the final Veytec hostname.
7. Move Airtable access behind Webex Connect or another Veytec-controlled server-side layer.
8. Confirm Webex Connect flows, Airtable base, AI generation, SMS sender, and webhook ownership.
9. Run the audit tool without `ALLOW_LEGACY_REFERENCES`.
10. Perform a final browser test of camera, wall, claim, photo delivery, QR, and SMS.

## Temporary inventory mode

During parallel testing, this prints all remaining references without failing:

```bash
ALLOW_LEGACY_REFERENCES=1 node tools/check-legacy-references.js
```

## Handoff sign-off

The migration is not complete until:

- the audit passes;
- no browser request loads from the personal GitHub Pages account;
- no QR code points to the personal GitHub Pages account;
- no documentation, comments, configuration, metadata, or hidden constants mention it;
- all credentials and connected services are owned or explicitly approved by Veytec.
