"use strict";

export const ACTION_RISK = Object.freeze({SAFE_REVERSIBLE:"SAFE_REVERSIBLE",HUMAN_GATE:"HUMAN_GATE"});

export function classifyAssistantAction(action){
  const externalMutation=Boolean(action.externalMutation);
  const destructive=Boolean(action.destructive);
  const costBearing=Boolean(action.costBearing);
  const publishesPrivateData=Boolean(action.publishesPrivateData);
  const needsSecret=Boolean(action.needsSecret);
  const risk=(externalMutation||destructive||costBearing||publishesPrivateData||needsSecret)?ACTION_RISK.HUMAN_GATE:ACTION_RISK.SAFE_REVERSIBLE;
  return {...action,risk,mayAutoProceed:risk===ACTION_RISK.SAFE_REVERSIBLE};
}

export function assistantQueue(records){
  const priority={NOW:0,NEXT:1,UPCOMING:2,WAITING:3,DONE:4};
  return records.slice().sort((a,b)=>(priority[a.workState]??9)-(priority[b.workState]??9));
}

export function privacyGuard(record){
  const forbidden=new Set(["PRIVATE_CALENDAR","GMAIL_RAW","DRIVE_PRIVATE_URL","MEDICAL","STUDENT_RECORD","CREDENTIAL","UNPUBLISHED_EVIDENCE"]);
  const tags=new Set(record.dataClasses||[]);
  return {publicSafe:![...tags].some(x=>forbidden.has(x)),blockedClasses:[...tags].filter(x=>forbidden.has(x))};
}
