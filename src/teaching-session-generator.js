"use strict";

const DAY_INDEX = Object.freeze({Sunday:0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6});

function isoLocal(date){
  const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,"0"),d=String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}

export function generateTeachingSessions(semester,courses,exceptions=[]){
  const start=new Date(`${semester.teachingStart}T12:00:00`);
  const end=new Date(`${semester.teachingEnd}T12:00:00`);
  const noLecture=new Set(exceptions.filter(x=>x.type==="NO_LECTURE").map(x=>x.date));
  const known=courses.filter(c=>c.day in DAY_INDEX && c.start && c.end);
  const sessions=[];
  for(const course of known){
    const cursor=new Date(start);
    const delta=(DAY_INDEX[course.day]-cursor.getDay()+7)%7;
    cursor.setDate(cursor.getDate()+delta);
    while(cursor<=end){
      const date=isoLocal(cursor);
      sessions.push({courseCode:course.code,physicalBlock:course.sharedPhysicalBlock||course.code,date,start:course.start,end:course.end,status:noLecture.has(date)?"NO_LECTURE":"SCHEDULED",evidence:course.evidence||"UNKNOWN"});
      cursor.setDate(cursor.getDate()+7);
    }
  }
  return sessions.sort((a,b)=>`${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`));
}

export function workloadSummary(sessions){
  const active=sessions.filter(s=>s.status==="SCHEDULED");
  const blocks=new Map();
  for(const s of active){
    const key=`${s.date}|${s.physicalBlock}|${s.start}|${s.end}`;
    if(!blocks.has(key)) blocks.set(key,s);
  }
  let minutes=0;
  for(const s of blocks.values()){
    const [sh,sm]=s.start.split(":").map(Number),[eh,em]=s.end.split(":").map(Number);
    minutes+=(eh*60+em)-(sh*60+sm);
  }
  return {sessionRecords:active.length,physicalTeachingBlocks:blocks.size,physicalTeachingMinutes:minutes};
}
