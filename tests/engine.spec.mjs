import assert from "node:assert/strict";
import {deduplicateTeachingBlocks,publicationEligibility,nextAction} from "../src/workflow-engine.js";
import {generateTeachingSessions,workloadSummary} from "../src/teaching-session-generator.js";
import {classifyAssistantAction,privacyGuard} from "../src/assistant-action-model.js";

const courses=[
 {code:"HED3505",day:"Monday",start:"11:30",end:"13:20",evidence:"VERIFIED"},
 {code:"RHE3101",sharedPhysicalBlock:"RHE3101-RHE3401",evidence:"VERIFIED"},
 {code:"RHE3401",sharedPhysicalBlock:"RHE3101-RHE3401",evidence:"VERIFIED"}
];
assert.equal(deduplicateTeachingBlocks(courses).length,2);
const semester={teachingStart:"2026-11-16",teachingEnd:"2027-03-05"};
const sessions=generateTeachingSessions(semester,courses,[{date:"2027-01-20",type:"NO_LECTURE"}]);
assert.ok(sessions.length>0);
assert.ok(workloadSummary(sessions).physicalTeachingBlocks>0);
assert.equal(publicationEligibility({visibility:"PUBLIC",approval:"APPROVED",evidence:"VERIFIED"}),true);
assert.equal(publicationEligibility({visibility:"PRIVATE",approval:"APPROVED",evidence:"VERIFIED"}),false);
assert.equal(nextAction({humanGate:true}),"WAITING");
assert.equal(classifyAssistantAction({externalMutation:false}).mayAutoProceed,true);
assert.equal(classifyAssistantAction({externalMutation:true}).mayAutoProceed,false);
assert.equal(privacyGuard({dataClasses:["MEDICAL"]}).publicSafe,false);
console.log("Command Center engine checks: PASS");
