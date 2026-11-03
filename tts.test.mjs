import {makeSSML} from './tts-service.mjs';import assert from 'node:assert/strict';
for(const id of ['libai','sushi','liqingzhao','luxun'])assert.match(makeSSML(id,'你好，<script>&'),/&lt;script&gt;&amp;/);assert.throws(()=>makeSSML('unknown','text'));assert.throws(()=>makeSSML('libai','x'.repeat(6001)));console.log('PASS: voice profiles, SSML escaping, input bounds');
