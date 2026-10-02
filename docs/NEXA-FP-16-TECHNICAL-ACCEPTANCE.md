# NEXA FP-16 — Technical Acceptance
Status: **ISOLATED TECHNICAL PASS / PROMOTION HOLD**
Test branch: `br-proud-mode-b3ey59c4`; parent: `br-withered-breeze-b3maupkf`.

FP-16 adds persistent in-app notification rules/intents and an invoker-rights deterministic task composer. Database CHECK enforces in-app-only delivery; an attempted email rule was rejected. Daily Brief persisted with Asia/Bangkok timezone, 22:00–07:00 quiet-hours and 7/3/1 thresholds. Duplicate brief insertion was rejected by workspace/dedupe uniqueness. Repeated composer calls returned the same intent ID and one row. A 7-day deadline produced an actionable intent; an outside-threshold source was automatically persisted as suppressed. Composer also contains automatic suppression semantics for completed/cancelled/done tasks, disabled rules and snoozed rules. Both tables have RLS and zero DELETE policies.

Schema comparison to the sandbox parent contains only FP-16 tables/function/constraints/FKs/RLS/policies. No email, LINE, credentials, connector or outbound delivery is implemented. Production/default Neon branch and GitHub main remain out of scope. Promotion requires explicit Human Approval.