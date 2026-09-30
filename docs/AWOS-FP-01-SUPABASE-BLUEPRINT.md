# MASTER-AWOS-FP-01 — Supabase Integration Blueprint (design only)

Status: non-production architecture proposal. The current static preview remains standalone, without authentication, database, API calls or persistence. Never place a Supabase service-role key in client code.

## Source of truth and separation
- `kasemch/awos-static-preview` main: published synthetic baseline; feature/awos-fp-01: development branch. Do not change main or Pages before acceptance.
- `kasemch/wpos` remains separate; its draft PR #2 is not merged.
- WordPress, if used later, is an entry/content portal, not an independent master for AWOS transactional records.
- Identity, application records, evidence files and public analytics are separate logical domains. No real records in this phase.

## Proposed PostgreSQL model
`profiles(user_id PK references auth.users, display_name, created_at)`;
`projects(id PK, owner_id, title, status, created_at)`;
`tasks(id PK, project_id nullable, owner_id, title, category, status, due_at nullable, created_at, updated_at)`;
`evidence(id PK, project_id, owner_id, title, storage_path, verification_status, created_at)`;
`approval_requests(id PK, resource_type, resource_id, requester_id, approver_id, status, decided_at nullable)`;
`audit_events(id PK, actor_id, action, entity_type, entity_id, created_at, payload_redacted)`.
All transactional tables require tenant/user authorization and restrictive RLS; approval transitions require server-side authorization and append-only audit. No direct client write to audit events.

## Auth and security gates
Use Supabase Auth with verified redirect allowlist for the approved Pages origin. Public anon/publishable key may be used in a future browser bundle; service-role key must never be included. RLS deny-by-default and explicit owner/member policies; separate approver checks; test IDOR and cross-user read/write with synthetic identities. Signed storage URLs and private buckets for evidence. No actual personal data until explicit authorization and privacy review.

## Data contracts
Tasks: id, title, category, status, owner_id, updated_at; project and evidence references use stable UUIDs. Quick Capture is an in-memory UI action until an authenticated write contract and conflict policy are approved. Sync must show pending/error/confirmed state; never claim success before server acknowledgement. Audit includes request ID and actor, excludes secrets.

## Quality gates and rollback
G1 baseline and branch diff; G2 static browser checks at 320/375/768/1024/1440; G3 keyboard and screen-reader manual acceptance; G4 synthetic RLS cross-user tests; G5 secret scan and dependency audit; G6 human approval of target Supabase project, migration and Pages release. Rollback: revert Pages release to prior known-good commit, with database changes separately migration-tested. No production deployment or database schema creation in FP-01.

## Master continuation
After FP-01 CI and manual acceptance, open a review PR without automatic merge; resolve any browser issues. Only then consider a synthetic-only Supabase sandbox integration behind explicit human approval.
