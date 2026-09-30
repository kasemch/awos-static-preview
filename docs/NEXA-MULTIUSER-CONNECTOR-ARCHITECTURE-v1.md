# NEXA Multi-user & Connector Architecture v1.0

Status: APPROVED ARCHITECTURE / NON-PRODUCTION
Date: 2026-09-30

## Architectural stance
NEXA is designed as multi-user and multi-workspace from the core. Personal-by-default; sharing is explicit. NEXA is the product layer; AWOS remains the underlying architecture.

## Tenancy model
Identity → User → Workspace → Membership → Resources.
A user may belong to multiple workspaces. Initial workspace types: Personal, Programme, Department, Research Team. Authorization is membership- and role-based; ownership and sharing are explicit.

Every tenant-scoped domain record must carry workspace identity (and creator/owner/audit metadata where applicable). PostgreSQL RLS is required as defense-in-depth; application authorization does not replace database policy.

## Proposed domain boundaries
profiles; workspaces; workspace_members; courses; teaching_sessions; tasks; calendar_events; projects; documents; document_versions; evidence; workflows; workflow_runs; notification_rules; connector_accounts; audit_events.

## Privacy and sharing
Personal workspace is private by default. Cross-workspace sharing requires an explicit action, scoped permission, auditable grant and revocation path. Do not infer that programme/department membership exposes personal tasks, documents, calendar details or evidence.

## Connector architecture
NEXA Core → Connector Service → Provider Adapter.
Provider examples are optional adapters, not workflow dependencies: calendar, storage, mail, messaging, Git hosting, LMS.

Each user connects their own provider account through provider-supported authorization. Never share one user's provider credential with another user. Tokens/secrets are server-side only, encrypted/managed through an approved secret mechanism, least-privilege scoped, revocable and excluded from client bundles/logs.

## Calendar
NEXA Calendar is canonical for NEXA workflow records. External calendar connection is optional.
Modes to support by policy: NEXA-only; read-only external context; controlled synchronization. Two-way synchronization requires conflict/idempotency design and a separate activation gate.

## Documents
Document lifecycle remains Capture → Create/Receive → Classify → Draft → Review → Approve → Route → Release → Evidence → Archive.
Destination routing is connector-independent. External storage is optional; master/version/provenance and authorization remain governed by NEXA policy.

## Notifications
Daily Brief and alerts are generated per user/workspace using timezone, quiet hours, channel preferences and minimum-necessary disclosure. External email/LINE delivery remains adapter-based and requires identity/consent/credential configuration gates.

## Onboarding
Sign in → create Personal Workspace → choose work contexts → optional connector setup → Smart Capture.
Users must not need to configure a database, repository or API to begin normal use.

## Distribution
Primary delivery target: hosted responsive Web App / installable PWA. Native apps are not required for the initial architecture. Updates remain centrally managed.

## Security invariants
- deny by default;
- workspace isolation;
- least privilege;
- server-side secrets;
- auditable privileged actions;
- explicit external release;
- reversible connector disconnect;
- data export/deletion design before production;
- synthetic fixtures only until privacy/security gates pass.

## Human gates before production
Authentication provider choice; production database/project; RLS/security review; privacy/retention policy; connector OAuth registrations/scopes; token storage; external calendar write/two-way sync; email/LINE delivery; real-user pilot; production launch.

No production database, OAuth credential, real-user data, external delivery or connector write is authorized by this document.
