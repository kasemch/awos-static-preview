# NEXA Homepage v2 — Design Decision

Status: IMPLEMENTED ON ISOLATED FEATURE BRANCH / NON-PRODUCTION

## Decision
Use a hybrid research-led homepage rather than a single visual concept.

The implementation combines:
- Academic Focus as the information-architecture core.
- Minimal Clean for hierarchy and reduced cognitive load.
- Productivity Hub for daily work and quick actions.
- AI Assistant as an entry point, not the dominant interface.
- Executive Dashboard patterns for concise status visibility.

## Functional hierarchy
1. Personal/private workspace identity.
2. Today Focus and high-priority work.
3. Four primary metrics: tasks, research projects, evidence, approvals.
4. Work queue.
5. Quick Actions.
6. Daily schedule.
7. Evidence/Governance state.
8. Responsive mobile bottom navigation.

## Governance
- Existing FP-17 implementation remains untouched.
- Existing Neon/Auth/RLS logic is not modified by this UI slice.
- Homepage uses representative preview data only.
- No production deployment, database migration, billing, external send, or main-branch merge is authorized by this change.
- Consequential operations retain Human Gate requirements.

## Design tokens
Navy #0B1F3A; Blue #2563EB; Cyan #06B6D4; Teal #10B981; Violet #8B5CF6.

## Acceptance targets
- Desktop and mobile responsive behavior.
- Keyboard-visible focus state.
- No external network dependency in homepage slice.
- Clear distinction between preview UI and persisted operational state.
- Preserve NEXA/AWOS architecture and private-by-default principle.
