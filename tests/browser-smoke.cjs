const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage();
 const requests=[];
 page.on('request',r=>{if(!r.url().startsWith('file:'))requests.push(r.url())});
 await page.goto('file://'+path.resolve('index.html'));
 for(const width of [320,375,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  assert.equal(overflow,false,'horizontal overflow at '+width);
 }
 const buttons=page.locator('#nav button');
 assert.equal(await buttons.count(),10);
 for(let i=0;i<10;i++){await buttons.nth(i).click();assert.equal(await buttons.nth(i).getAttribute('aria-pressed'),'true')}
 await page.locator('#draft').fill('Synthetic browser smoke');
 await page.locator('#capture button').click();
 assert.equal(await page.locator('#count').textContent(),'4');
 assert.match(await page.locator('#status').textContent(),/ยังไม่บันทึก Cloud/);
 await page.reload();
 assert.equal(await page.locator('#count').textContent(),'3');
 assert.equal(requests.length,0,'unexpected network requests: '+requests.join(','));
 console.log('PASS: Chromium responsive widths, 10 modules, in-memory capture, reload reset, no network.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
