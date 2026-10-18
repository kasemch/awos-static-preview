# KASEM Academic Command Center — Architecture Baseline v1

Status: WORKING / NON-PRODUCTION

## Separation of concerns

### Public Academic Gateway
GitHub Pages public presentation layer. Only PUBLIC + APPROVED information may be rendered here.

### Private Academic Command Center
Private operational workspace for Today, Week, Planner, Tasks, Projects, Teaching, Research, Documents/Evidence, Calendar projection, Quick Capture, Personal Assistant and Human Gates.

### Workflow & Intelligence Layer
Canonical workflow: Capture → Classify → Plan → Execute → Verify → Human Gate → Archive/Publish.

## Privacy invariant
Never commit private Calendar, Gmail, Drive, medical appointments, student/participant records, credentials, unpublished evidence, or private operational records to the public GitHub Pages repository.

## Evidence states
VERIFIED / INFERRED / PROPOSED / UNKNOWN.

## Work states
NOW / NEXT / UPCOMING / WAITING / DONE.

## Teaching baseline — Semester 2/2569
Canonical course codes currently in scope:
HED1101, HED3505, HED4001, RHE2100, RHE3101, RHE3401, RHE3405, RHE3409, RHE4202, RED1002, RED3202, RAM1142.

Known verified constraints carried into the model:
- RHE3101 + RHE3401 represent one physical teaching block / two course codes.
- HED3505: Monday 11:30–13:20.
- HED4001: Friday 13:30–18:30.
- 20 January 2570: NO-LECTURE academic exception.
- Teaching period: 16 November 2569–5 March 2570.
- Examination period: 9–22 March 2570.
- Semester end: 23 March 2570.

Unknown MR30 day/time/room/instructor-role fields must remain UNKNOWN and must not be inferred.

## Initial domain model
Semester
Course
TeachingBlock
TeachingSession
AcademicException
CalendarLink
Task
Project
Evidence
Document
AssistantAction
HumanGate

## Build sequence
1. Command Center shell
2. Today / Week / Planner
3. Teaching & timetable
4. Workflow engine and status model
5. Projects / Research
6. Documents & Evidence
7. Personal Assistant
8. Calendar projection / conflict detection
9. Private data/authentication layer
10. Public/private publishing gate

## Deployment rule
GitHub Pages may host only the public/static presentation surface. Private operational data requires an authenticated private data layer before production use.
