# NEXA FP-14 — Acceptance Freeze

Status: **PASS / ACCEPTED (Development Sandbox)**

## Scope
FP-14 Persistent Workflow Engine & NEXA Internal Calendar Foundation extends the approved NEXA development preview without redesigning the frozen UI baseline.

## Verified implementation
- `workflow_steps` persists deterministic workflow steps under workspace-scoped RLS.
- `calendar_items` persists NEXA-internal calendar records under workspace-scoped RLS.
- INSERT/UPDATE audit triggers are installed for both resources.
- Smart Capture confirmation persists Capture → Interpretation → Task → Workflow → Workflow Steps and, when a due date is supplied, a NEXA Calendar Item.
- Teaching workflow deterministically creates three steps: เตรียมการสอน → ดำเนินการสอน → จัดเก็บหลักฐานและสะท้อนผล.

## CI and deployment evidence
- Feature candidate: `57afae9cfa5ccbf087fb5fd7154d9e13344085f5`.
- Static Preview Checks run `36952036550`: SUCCESS.
- Correct Development Preview deployment run `36952664915`: SUCCESS.
- Deployment log confirmed candidate `57afae9cfa5ccbf087fb5fd7154d9e13344085f5` was copied from `candidate/index.html` to `_site/dev/index.html`.
- Earlier deployment run `36952487801` failed because it was manually dispatched from the feature branch using the obsolete branch-local deployment workflow; this was diagnosed and superseded by the successful main-branch deployment above.

## Real-browser E2E evidence
User completed authenticated Smart Capture in the deployed development preview with original text `เตรียมเอกสารประกอบการสอน` and due date `2026-10-09`.

Direct read-only verification on Neon sandbox branch `br-withered-breeze-b3maupkf` confirmed:
- Capture `7ca694aa-c8f3-4db3-a91a-0bb93f417b64` in workspace `763af724-488b-463a-80fc-a34570db2227`.
- Confirmed interpretation `9fce69ad-4233-465b-b3f0-000075edac2a` with Teaching category and due date `2026-10-09`.
- Task `da8f2e31-054c-4475-aa33-9c52049c22bb`.
- Confirmed teaching workflow `0fe63b74-d490-4164-bd25-f9b70fa0489d`.
- Exactly three ordered workflow steps were persisted: step 1 active, steps 2–3 pending.
- NEXA calendar item `879910b9-1f95-4b90-be9a-db8288a37a00` linked to the same task/workflow, with source `nexa` and `starts_at=2026-10-09T02:00:00Z` (09:00 Asia/Bangkok development assumption).
- Audit trail contains `capture.created`, `interpretation.created`, `task.created`, `workflow.created`, three `workflow_step.created`, and `calendar_item.created` events for this transaction chain.

## Boundary / non-claims
This acceptance is limited to the development preview and Neon sandbox. It does **not** claim production readiness, production migration, PR merge, external Google/Microsoft Calendar synchronization, connector write permissions, AI/LLM workflow generation, autonomous workflow execution, or full CRUD/delete support.

Production/default Neon branch remains out of scope. No production migration or feature-to-main merge is authorized by this acceptance freeze.

## Decision
FP-14 acceptance criteria for the approved sandbox/development scope are satisfied. FP-14 is frozen as the accepted baseline for the next reversible development phase.