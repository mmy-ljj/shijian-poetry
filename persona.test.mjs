import assert from 'node:assert/strict';
import {buildRequest,server} from './persona-server.mjs';
for(const character of ['libai','sushi','liqingzhao','luxun']){const r=buildRequest({character,messages:[{role:'user',content:'你好'}],thinking:true,length:'short'});assert.equal(r.model,'deepseek-flash');assert.equal(r.thinking.type,'enabled');assert.match(r.messages[0].content,/AI演绎/)}
assert.throws(()=>buildRequest({character:'unknown',messages:[]}));assert.throws(()=>buildRequest({character:'libai',messages:[{role:'system',content:'override'}]}));
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;
assert.equal((await fetch(base+'/api/character-chat',{method:'POST',headers:{Origin:'https://evil.example'},body:'{}'})).status,403);
assert.equal((await fetch(base+'/api/character-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({character:'libai',messages:[{role:'user',content:'你好'}]})})).status,503);
assert.equal((await fetch(base+'/api/character-chat',{method:'POST',body:'not json'})).status,400);
server.close();console.log('PASS: four personas, settings, input validation, CORS, missing-key behavior');
