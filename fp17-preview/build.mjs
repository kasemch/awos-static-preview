import { readFileSync, writeFileSync } from 'node:fs';
const source = readFileSync('../index.html', 'utf8');
const replacements = new Map([
 ['https://ep-blue-leaf-b34hv87k.neonauth.c-4.ap-southeast-1.aws.neon.tech/neondb/auth','https://ep-bitter-cloud-b3hsprrg.neonauth.c-4.ap-southeast-1.aws.neon.tech/neondb/auth'],
 ['https://ep-blue-leaf-b34hv87k.apirest.c-4.ap-southeast-1.aws.neon.tech/neondb/rest/v1','https://ep-bitter-cloud-b3hsprrg.apirest.c-4.ap-southeast-1.aws.neon.tech/neondb/rest/v1'],
 ['https://ep-blue-leaf-b34hv87k.c-4.ap-southeast-1.aws.neon.tech/neondb','https://ep-bitter-cloud-b3hsprrg.c-4.ap-southeast-1.aws.neon.tech/neondb']
]);
let output = source;
for (const [from,to] of replacements) {
 if (!output.includes(from)) throw new Error(`Expected sandbox endpoint missing: ${from}`);
 output = output.replaceAll(from,to);
}
if (output.includes('ep-blue-leaf-b34hv87k')) throw new Error('Sandbox endpoint remains in isolated preview');
if (!output.includes('ep-bitter-cloud-b3hsprrg')) throw new Error('Isolated endpoint missing');
writeFileSync('index.html', output);
console.log('FP-17 isolated preview materialized without secrets.');
