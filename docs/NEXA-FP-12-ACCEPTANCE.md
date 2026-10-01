# NEXA FP-12 — Persistent Personal Workspace Acceptance

Status: **PASS — Development / Neon Sandbox**
Date: 2026-10-02 (Thailand)

## Verified baseline
- Candidate: `e50999db07058625721fe265b322aebe002c5dd3`
- Static CI: run #36935144438 — SUCCESS.
- Development Preview deployment: run #36936492505 — SUCCESS; deployment log verified the candidate SHA above was copied to `/dev/index.html`.
- Environment: Neon sandbox branch `nexa-fp11-auth-sandbox` (`br-withered-breeze-b3maupkf`). Production was not modified.

## Real-browser / database acceptance evidence
1. Google/Neon authenticated Personal Workspace loaded with prior FP-11F RLS isolation PASS.
2. User created `FP12 TEST 01` in My Tasks.
3. Database verification: task `27b3bb4e-1b95-4015-800f-34558c8cd78e` persisted in workspace `763af724-488b-463a-80fc-a34570db2227`, status `open`, with one `task.created` audit event.
4. Browser refresh retained/reloaded the task — refresh persistence PASS.
5. User changed status to `in_progress`.
6. Database verification confirmed status `in_progress` and exactly one `task.updated` audit event.

## Security repair recorded
Task insertion initially failed with `permission denied for schema auth`. The sandbox helper `public.current_user_id()` was changed, with explicit human approval, to a controlled `SECURITY DEFINER` function with restricted `search_path = pg_catalog, auth`. The authenticated client retains EXECUTE on the public helper; broad client access to the auth schema was not introduced.

## Acceptance result
PASS: authenticated Create, database persistence, refresh/read persistence, creator-scoped Update, audit-on-create, audit-on-update, and previously verified workspace RLS isolation.

Not claimed: DELETE/full CRUD, production readiness, production migration, multi-user sharing, connector integration, or PR merge.

## Governance
- Development/sandbox only.
- No production database changes.
- No merge to main.
- Preserve approved NEXA design baseline.
