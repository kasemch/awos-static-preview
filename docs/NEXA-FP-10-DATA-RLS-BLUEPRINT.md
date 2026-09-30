# NEXA FP-10 Multi-user Data & RLS Blueprint

Status: NON-PRODUCTION DESIGN BASELINE
Date: 2026-09-30

## Identity and tenancy
auth.users → profiles
workspaces(id, type, name, owner_user_id, created_at)
workspace_members(workspace_id, user_id, role, status)
All tenant resources require workspace_id. Personal workspace is private by default.

## Core resource contracts
tasks(id, workspace_id, creator_user_id, title, state, due_at)
calendar_events(id, workspace_id, task_id, provider_ref nullable, sync_mode)
projects(id, workspace_id, owner_user_id, title, state)
documents(id, workspace_id, owner_user_id, classification, sensitivity)
document_versions(id, document_id, version_no, provenance)
evidence(id, workspace_id, source_type, source_id, version_ref)
workflows(id, workspace_id, template_key, state)
workflow_runs(id, workflow_id, actor_user_id, state)
connector_accounts(id, workspace_id, user_id, provider, scopes, status, secret_ref)
audit_events(id, workspace_id, actor_user_id, action, target_type, target_id, occurred_at)

## Roles
owner; admin; member; reviewer; viewer.
Role names do not grant cross-workspace access. Membership must be active for every tenant query.

## RLS policy baseline
Default deny. SELECT requires active membership in row.workspace_id. INSERT requires active membership plus role/action permission. UPDATE/DELETE require explicit capability and audit event. Personal workspace sharing requires an explicit grant. connector_accounts are user-bound and never readable as raw credentials by client roles.

## Connector security
No provider token in browser tables or repository. connector_accounts stores metadata plus a server-side secret reference only. Least scopes, revocation, rotation and audit are mandatory. Calendar write/two-way sync remains disabled until a separate Human Gate.

## Data lifecycle
Production activation requires retention, export, deletion, backup/restore, breach-response and account-offboarding rules. Synthetic fixtures only before those gates.

## Test matrix before production
User A cannot read/write Workspace B; revoked membership loses access; viewer cannot mutate; member cannot expose personal workspace; connector metadata cannot reveal secret; cross-workspace share requires explicit grant; audit is append-oriented; external release requires approved workflow state.
