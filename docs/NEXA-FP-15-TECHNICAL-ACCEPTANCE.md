# NEXA FP-15 — Technical Acceptance

Status: **ISOLATED TECHNICAL PASS / PROMOTION HOLD**

## Scope
Workflow Execution Foundation above FP-14 persistent workflow/calendar. Tested only on Neon child branch `br-restless-meadow-b3ez055f`, whose parent is the verified NEXA sandbox `br-withered-breeze-b3maupkf`. Production/default Neon branch and GitHub main were not modified.

## Evidence
- Added `workflow_runs` and append-oriented `workflow_run_events`.
- E2E synthetic lifecycle completed: `pending → running → awaiting_human → completed`; four ordered events recorded and timestamps present.
- Run idempotency duplicate was rejected by `workflow_runs_workspace_id_idempotency_key_key`.
- Transition validator returned TRUE for `pending→running` and `running→awaiting_human`; FALSE for `pending→completed` and `completed→running`.
- RLS enabled on both FP-15 tables.
- `workflow_runs`: member SELECT, creator INSERT/UPDATE; no DELETE policy.
- `workflow_run_events`: member SELECT, actor INSERT; no UPDATE or DELETE policy for authenticated RLS path.
- Schema comparison against parent showed only FP-15 function/tables/constraints/FKs/RLS/policies.
- Regression presence check passed for `tasks`, `captures`, `capture_interpretations`, `workflow_items`, `workflow_steps`, and `calendar_items`.

## Evidence limitation
A direct malformed/illegal-transition insertion probe was blocked by tool safety before reaching Neon and is **not** counted as PASS. Transition-function checks provide database evidence for allowed/denied state pairs, but promotion verification should repeat authenticated negative-path testing through the application/data API.

## Privilege interpretation
Owner grants shown for `neondb_owner` are administrative privileges and must not be interpreted as authenticated-user authority. Application authorization remains governed by authenticated role grants plus RLS.

## Gate
Do not promote this migration into the NEXA sandbox baseline until explicit Human Approval. Do not apply to production/default Neon branch.
