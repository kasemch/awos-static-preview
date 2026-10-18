"use strict";

export const WORK_STATES = Object.freeze(["NOW","NEXT","UPCOMING","WAITING","DONE"]);
export const EVIDENCE_STATES = Object.freeze(["VERIFIED","INFERRED","PROPOSED","UNKNOWN"]);

export function physicalBlockKey(course) {
  return course.sharedPhysicalBlock || course.code;
}

export function deduplicateTeachingBlocks(courses) {
  const blocks = new Map();
  for (const course of courses) {
    const key = physicalBlockKey(course);
    if (!blocks.has(key)) blocks.set(key, { key, courses: [], day: course.day ?? null, start: course.start ?? null, end: course.end ?? null });
    blocks.get(key).courses.push(course.code);
  }
  return [...blocks.values()];
}

export function applyAcademicExceptions(sessions, exceptions) {
  const noLecture = new Set(exceptions.filter(x => x.type === "NO_LECTURE").map(x => x.date));
  return sessions.map(session => ({ ...session, cancelled: noLecture.has(session.date), exception: noLecture.has(session.date) ? "NO_LECTURE" : null }));
}

export function detectTimeConflicts(items) {
  const known = items.filter(x => x.date && x.start && x.end);
  const conflicts = [];
  for (let i = 0; i < known.length; i++) for (let j = i + 1; j < known.length; j++) {
    const a = known[i], b = known[j];
    if (a.date === b.date && a.start < b.end && b.start < a.end && a.physicalBlock !== b.physicalBlock) conflicts.push([a,b]);
  }
  return conflicts;
}

export function publicationEligibility(record) {
  return record.visibility === "PUBLIC" && record.approval === "APPROVED" && record.evidence === "VERIFIED";
}

export function nextAction(record) {
  if (record.humanGate) return "WAITING";
  if (record.completed) return "DONE";
  if (record.dueToday) return "NOW";
  if (record.ready) return "NEXT";
  return "UPCOMING";
}
