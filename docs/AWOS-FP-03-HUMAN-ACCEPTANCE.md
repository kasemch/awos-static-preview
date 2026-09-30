# AWOS-FP-03 — Human Acceptance Checklist
Status: READY FOR HUMAN REVIEW; not an assertion that real-device tests passed.

Baseline: published main remains unchanged. Candidate: feature/awos-fp-01 commit b674b749854b406fe164762bfadab48270ead4e9, Draft PR #1.
Automated CI: push run 36644857814 SUCCESS; PR run 36644861959 SUCCESS. Artifact 11068286708, SHA256 9ee6d2570c27506db1c0f1ff1b03795819ba9dd3ab11d86c3472dfb3200e5b19.

## Reviewer protocol
1. Download isolated CI artifact from PR run. Open index.html locally; it is not the live Pages release.
2. Mobile (iPhone Safari): inspect 320/375-equivalent portrait and landscape, ten modules, navigation, capture, form labels, scrolling and legibility. Record device/browser and screenshot.
3. Tablet/Desktop: inspect 768/1024/1440-equivalent layouts; check no horizontal overflow and consistent information hierarchy.
4. Keyboard-only: navigate all ten buttons and forms with Tab/Shift+Tab; activate with Enter/Space; verify visible focus, meaningful order and status feedback.
5. VoiceOver on iOS: check nav label, ten buttons, form labels, status announcement, and synthetic-only warning. Record actual observations; automated checks cannot substitute.
6. Interaction: add a synthetic task, filter, change state, simulate approval; reload and confirm state resets. No real personal data.
7. Compare ten distinct module layouts/content with approved design direction. Record any deviations as issues.

## Decision record
Reviewer: PENDING
Date/device/browser: PENDING
Visual design: PENDING
Mobile: PENDING
Keyboard: PENDING
VoiceOver: PENDING
Release decision: HOLD until explicit authorization.
If failed, repair on development branch and rerun CI. If passed, request separate authorization for merge and Pages deployment. Do not touch kasemch.github.io or production data.
