# AWOS Notification & Daily Brief Engine — Architecture v1.0
Status: APPROVED DESIGN / NON-PRODUCTION / NO DELIVERY CREDENTIALS

## Pipeline
AWOS source records → notification rules → brief composer → delivery queue → channel adapters → delivery log.
Channels: in-app, email, LINE Messaging API adapter. Prototype renders previews only.

## Rule classes
1. Daily Academic Brief: consolidated Today / Upcoming / Waiting / Documents / Teaching / Research / QA.
2. Deadline: configurable 7/3/1-day thresholds.
3. Event: configurable lead time for teaching/meetings.
4. Exception: incomplete prerequisite, human approval pending, failed workflow or other actionable exception.

## Noise control
Consolidate alerts; suppress completed items; quiet hours; snooze; channel preferences; severity and deduplication. Never send repeated item-level messages when one brief is sufficient.

## Governance and privacy
No credentials in client code or repository. Production channel setup requires explicit approval, recipient identity verification, consent/preferences, secret storage, delivery/retry policy and audit review. Notifications contain minimum necessary data and link to AWOS for sensitive detail. Delivery log records rule/source IDs, generated/sent status and error metadata without message secrets.

## Smart Capture contract
Natural-language reminder intent becomes a proposed notification rule linked to the underlying Task/Event. Relative dates must resolve to an explicit date/time before confirmation. Ambiguous course/person/date/channel remains a Human Gate. Original capture remains provenance and is never overwritten.

## LINE
Future LINE delivery is adapter-based and must use a currently supported official LINE messaging mechanism at implementation time; integration details must be re-verified against current provider documentation before production activation.

## Current prototype
UI preview only. No email, LINE, network call, authentication, persistence or Supabase connection.
