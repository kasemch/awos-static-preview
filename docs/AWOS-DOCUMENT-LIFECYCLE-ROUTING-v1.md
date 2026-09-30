# AWOS Document Lifecycle & Routing Engine v1.0
Status: APPROVED ARCHITECTURE / NON-PRODUCTION

## Principle
Documents are governed records, not loose files. Routing is policy-driven and connector-independent:
Document Type → Destination Policy → Connector.
One master document may be referenced by multiple contexts without uncontrolled duplication.

## Lifecycle
Capture → Create/Receive → Classify → Draft → Review → Approve → Route → Release → Evidence → Archive.

## Core destinations
1. Workspace — working drafts and editable material.
2. Course Repository — approved teaching material linked to course/session.
3. Student Delivery — material intentionally released to learners.
4. Evidence Archive — immutable/reference evidence for teaching, QA, PSF or other authorized contexts.
Additional adapters may later target Drive, LMS, GitHub Learning Hub, email or other approved services.

## Teaching-material policy
Smart Capture example: "สร้างเอกสารสอน HED1101 ศุกร์นี้".
Resolve course/date/session → propose material type → create Draft → link Course + Teaching Session → Review → Approve → propose destinations.
External/student release is never implied by document creation and requires a Human Gate.

## Restricted assessment policy
Exam/assessment material follows Restricted Draft → Review/Moderation → Approved → Restricted Assessment Repository → Authorized Use → Archive.
It must not route to Student Delivery before an explicitly authorized release condition.

## Routing proposal contract
Before confirmation show: source capture, document type, course/project/context, version, proposed destination(s), intended audience, release time/condition, sensitivity, required approver and evidence/archive behavior.
Ambiguity or destination mismatch blocks release.

## Version and provenance
Preserve original capture and source metadata. Draft revisions are versioned. Approved/released versions identify the exact artifact and approval. Evidence references an approved/released version rather than silently tracking a mutable draft.

## Human gates
Required for external release, student delivery, restricted/sensitive material, destructive replacement, destination-policy override, or unresolved ambiguity. Reversible internal draft organization may be automated when confidence is sufficient.

## Current implementation boundary
Architecture only. No external connector, real document upload, email/LINE delivery, LMS/Drive write, Supabase persistence or production release is authorized by this baseline.
