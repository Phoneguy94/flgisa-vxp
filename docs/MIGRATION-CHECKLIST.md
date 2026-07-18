# FLGISA Migration Checklist

## Current parallel-build scope

- Camera: `/camera/`
- Wall: `/wall/`
- Source repository `Phoneguy94/0924` is not modified.
- Existing Airtable table/fields, Webex Connect capture flow, FLGISA background, city/county selections, and claim flow remain in use for like-for-like testing.

## External dependencies to examine before Veytec cutover

### Airtable

- Base ID: `appSxuH0GH10rxd5y`
- Table ID: `tblI7llQH93Xkin3O`
- FLGISA hero attachment field: `fldptFIDcWfVutGRP`
- QR field currently associated with the existing implementation: `fld2Ehe0YS7e6W6jm`
- 1976 bonus-image field previously identified: `fldCRbWvEMARVOIhS`
- Review every automation triggered by `EventName` values beginning with `Kiosk-FLGISA-`.
- Review AI-generation actions, attachment updates, claim-data updates, retry behavior, and record-retention policy.

### Webex Connect

- Existing capture webhook remains in use by the parallel camera.
- Examine the capture flow payload mapping, Airtable integration credentials, error handling, payload-size limits, duplicate protection, and rate limits.
- Examine the claim/SMS flow separately, including the link template and the 1976 bonus-image delivery.
- Move Airtable access behind Connect or another Veytec-controlled API before revoking the exposed Airtable token.

### URLs requiring cutover review

- Camera URL
- Wall URL
- Claim-form URL encoded into QR codes
- Photo-page URL sent by SMS
- Background/asset URLs
- Any URLs embedded in Airtable formulas or Webex Connect message templates

## Security conversion order

1. Keep the existing production flow working.
2. Build a protected wall-feed endpoint in Webex Connect or a Veytec backend.
3. Test the protected endpoint with the parallel repository.
4. Update the parallel wall to use the protected endpoint.
5. Run full camera-to-SMS testing.
6. Cut over production URLs.
7. Revoke and replace the exposed Airtable token last.

## Consent and privacy items

- Required delivery disclosure for the requested photo.
- Separate optional marketing-consent checkbox.
- Store consent version, timestamp, event, and submission record.
- Publish or link a privacy notice.
- Define retention/deletion periods for names, phone numbers, email addresses, companies, selfies, and generated images.
