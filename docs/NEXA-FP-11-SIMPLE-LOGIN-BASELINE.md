# NEXA FP-11 Simple Login Baseline

Status: APPROVED DESIGN / NON-PRODUCTION
Date: 2026-09-30

## User experience
Primary login methods:
1. Continue with Google
2. Continue with Microsoft
3. Email Magic Link

No NEXA-local password in the baseline.

First successful sign-in provisions or resolves the user's NEXA identity and Personal Workspace. The Personal Workspace is private by default. Optional service connections never block onboarding.

## Security boundary
Authentication and provider connections are separate grants. Signing in with Google or Microsoft does not grant Calendar, Drive, Mail or other provider scopes. Those are requested later, explicitly and minimally.

## Identity rules
One NEXA person may have multiple verified login identities. Provider subject identifiers and verified email metadata map to an internal immutable user id. Do not rely on email alone as the permanent authorization key. Account linking requires verified ownership and audit.

## Session baseline
Server-issued secure session; short-lived access semantics; rotation/revocation; logout from NEXA; device/session review before production. No provider token exposed to browser persistence.

## Recovery
Magic Link is the passwordless fallback. Rate limiting, expiry, single-use semantics, anti-enumeration responses and verified redirect/origin controls are required before real delivery.

## Onboarding
Sign in → Personal Workspace (Private) → Dashboard/Smart Capture.
Profile completion and Connections are optional.

## Human gates before real activation
Auth platform/provider selection; Google/Microsoft app registration; redirect domains; email delivery provider; privacy/retention terms; production secrets; account-linking policy; security review; real-user pilot.

Current prototype must remain mock-only until these gates are explicitly approved.
