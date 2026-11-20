const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
const map={'/three.min.js':'node_modules/three/build/three.min.js','/fflate.min.js':'node_modules/three/examples/js/libs/fflate.min.js','/FBXLoader.js':'node_modules/three/examples/js/loaders/FBXLoader.js','/':'clips.html'};
await p.route('http://local.test/**',r=>{const u=new URL(r.request().url()).pathname;const f=map[u]||(/^\/c_\w+\.fbx$/.test(u)?u.slice(1):null);f?r.fulfill({body:fs.readFileSync(f),contentType:u=='/'?'text/html':'application/octet-stream'}):r.abort();});
await p.goto('http://local.test/');await p.waitForFunction('window.OUT',{timeout:60000});const O=await p.evaluate('OUT');console.log(JSON.stringify(O.info,null,1));fs.writeFileSync('clips_all.json',JSON.stringify(O.clips));console.log(fs.statSync('clips_all.json').size);await b.close();})();
