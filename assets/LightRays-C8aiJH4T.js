import{E as e,_ as t,b as n,f as r,g as i,l as a,m as o,o as s,v as c,w as l,x as u}from"./index-kdEK8O4I.js";import{a as d,i as f,n as p,r as m}from"./TargetCursor-Bo2f4a5T.js";var h=`myDatabase`,g=`myStore`,_=1;function v(e){h=e}function y(){return new Promise((e,t)=>{let n=indexedDB.open(h,_);n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error),n.onupgradeneeded=()=>{let e=n.result;e.objectStoreNames.contains(g)||e.createObjectStore(g,{keyPath:`id`,autoIncrement:!0})}})}function b(e,t){return new Promise((n,r)=>{let i=e.transaction(g,`readwrite`).objectStore(g).add(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}function x(e,t){return new Promise((n,r)=>{let i=e.transaction(g,`readonly`).objectStore(g),a=t?i.get(t):i.getAll();a.onsuccess=()=>n(a.result),a.onerror=()=>r(a.error)})}function S(e,t){return new Promise((n,r)=>{let i=e.transaction(g,`readwrite`).objectStore(g).put(t);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}var C=`lotteryDB`,w=`winnerList`;async function T(e){try{let t=await x(e);return Array.isArray(t)&&t.length>0&&w in t[0]?t[0][w]:null}catch{return null}}async function E(e,t){let n=JSON.parse(JSON.stringify(t)),r=await x(e);if(Array.isArray(r)&&r.length>0){let t=r[0].id;await S(e,{id:t,[w]:n})}else await b(e,{[w]:n})}function D(e){v(e.storeName||C);let t=null,n=null;function r(){return t?Promise.resolve(t):n||(n=y().then(e=>(t=e,e)),n)}let i=l(0),a=l(1),o=l(!1),c=l({}),u=l([]),d=null,f=s(()=>e.prizeList.value.find(e=>e.id===i.value)),p=s(()=>{let t=e.prizeList.value.find(e=>e.id===i.value);if(!t)return 0;let n=c.value[i.value]?.length||0;return t.maxCount-n}),m=s(()=>{if(e.personList.value.length===0)return[];let t=[];return Object.values(c.value).forEach(e=>{t.push(...e)}),e.personList.value.filter(e=>!t.includes(e.id))});function h(t=!1){let n=f.value;if(!n)return[];let o=i.value,s=c.value[o]||[];if(!t){let t=Object.values(c.value).flat(),n=e.personList.value.filter(e=>!t.includes(e.id)),r=Math.min(a.value,n.length),i=[];for(let e=0;e<r&&n.length!==0;e++){let e=Math.floor(Math.random()*n.length),t=n.splice(e,1);t[0]&&i.push(t[0].id)}return u.value=i,i}let l=Object.values(c.value).flat(),d=new Set(s),p=n.allowTags,m=new Set(p.map(e=>e.tag)),h=new Set(e.personList.value.filter(e=>e.tag.some(e=>m.has(e))).map(e=>e.id)),g=e.personList.value.filter(e=>!l.includes(e.id)&&h.has(e.id)),_=e.personList.value.filter(e=>!l.includes(e.id)&&!h.has(e.id)),v=n.predetermined.map(t=>e.personList.value.find(e=>e.id===t)).filter(e=>!!e).filter(e=>!d.has(e.id)),y=new Map;for(let{tag:e}of p)y.set(e,0);for(let t of s){let n=e.personList.value.find(e=>e.id===t);if(n)for(let{tag:e}of p)n.tag.includes(e)&&y.set(e,(y.get(e)||0)+1)}let b=[],x=[];for(let e of v){let t=!1;for(let{tag:n,count:r}of p)if(e.tag.includes(n)){let i=y.get(n)||0;if(i<r){b.push(e),y.set(n,i+1),t=!0;break}}t||x.push(e)}for(let{tag:e,count:t}of p){let n=t-(y.get(e)||0);if(n<=0)continue;let r=g.filter(t=>t.tag.includes(e)&&!b.some(e=>e.id===t.id)),i=Math.min(n,r.length);for(let t=0;t<i&&r.length!==0;t++){let t=Math.floor(Math.random()*r.length),n=r.splice(t,1)[0];n&&(b.push(n),y.set(e,(y.get(e)||0)+1))}}let S=n.maxCount-s.length-b.length;if(S>0){let e=0;for(let t of x){if(e>=S)break;b.push(t),e++}}let C=n.maxCount-s.length-b.length;if(C>0){let e=_.filter(e=>!b.some(t=>t.id===e.id)),t=Math.min(C,e.length);for(let n=0;n<t&&e.length!==0;n++){let t=Math.floor(Math.random()*e.length),n=e.splice(t,1)[0];n&&b.push(n)}}let w=b.slice(0,a.value).map(e=>e.id);return u.value=w,w=(e=>{for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e})([...w]),u.value=w,c.value[o]=[...c.value[o]||[],...w],r().then(e=>E(e,c.value)),w}function g(){if(f.value){if(p.value<=0){alert(`该奖项名额已满`);return}o.value=!0,u.value=[],d=setInterval(()=>{h(!1)},100)}}function _(){d&&=(clearInterval(d),null),o.value=!1,!(p.value<=0)&&h(!0)}function b(){c.value[i.value]=[],r().then(e=>E(e,c.value))}async function x(){await E(await r(),c.value)}async function S(){let e=await T(await r());e&&(c.value=e)}return{currentPrize:i,drawCount:a,drawCountMax:p,isDrawing:o,unwonPersons:m,winnerList:c,currentWinnerList:u,startDrawing:g,stopDrawing:_,resetWinnerList:b,saveWinnerList:x,loadWinnerList:S}}var O=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,k=`precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;

  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`,A=r({__name:`LightRays`,props:{raysOrigin:{default:`top-center`},raysColor:{default:`#ffffff`},raysSpeed:{default:1},lightSpread:{default:1},rayLength:{default:2},pulsating:{type:Boolean,default:!1},fadeDistance:{default:1},saturation:{default:1},followMouse:{type:Boolean,default:!0},mouseInfluence:{default:.1},noiseAmount:{default:0},distortion:{default:0},className:{default:``}},setup(r){let h=r,g=n(`containerRef`),_=l(null),v=l(null),y=l({x:.5,y:.5}),b=l({x:.5,y:.5}),x=l(null),S=l(null),C=l(null),w=l(!1),T=l(null),E=l(null),D=s(()=>M(h.raysColor)),A=s(()=>h.pulsating?1:0),j=s(()=>Math.min(window.devicePixelRatio||1,2)),M=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},N=(e,t,n)=>{let r=.2;switch(e){case`top-left`:return{anchor:[0,-r*n],dir:[0,1]};case`top-right`:return{anchor:[t,-r*n],dir:[0,1]};case`left`:return{anchor:[-r*t,.5*n],dir:[1,0]};case`right`:return{anchor:[(1+r)*t,.5*n],dir:[-1,0]};case`bottom-left`:return{anchor:[0,(1+r)*n],dir:[0,-1]};case`bottom-center`:return{anchor:[.5*t,(1+r)*n],dir:[0,-1]};case`bottom-right`:return{anchor:[t,(1+r)*n],dir:[0,-1]};default:return{anchor:[.5*t,-r*n],dir:[0,1]}}},P=(()=>{let e=null;return t=>{e!==null&&clearTimeout(e),e=window.setTimeout(()=>{t(),e=null},16)}})(),F=async()=>{if(g.value&&(await o(),g.value))try{let e=new f({dpr:j.value,alpha:!0,antialias:!1,powerPreference:`high-performance`});v.value=e;let t=e.gl;for(t.canvas.style.width=`100%`,t.canvas.style.height=`100%`;g.value.firstChild;)g.value.removeChild(g.value.firstChild);g.value.appendChild(t.canvas);let n={iTime:{value:0},iResolution:{value:[1,1]},rayPos:{value:[0,0]},rayDir:{value:[0,1]},raysColor:{value:D.value},raysSpeed:{value:h.raysSpeed},lightSpread:{value:h.lightSpread},rayLength:{value:h.rayLength},pulsating:{value:A.value},fadeDistance:{value:h.fadeDistance},saturation:{value:h.saturation},mousePos:{value:[.5,.5]},mouseInfluence:{value:h.mouseInfluence},noiseAmount:{value:h.noiseAmount},distortion:{value:h.distortion}};_.value=n;let r=new m(t,{geometry:new p(t),program:new d(t,{vertex:O,fragment:k,uniforms:n})});S.value=r;let i=()=>{if(!g.value||!e)return;e.dpr=j.value;let{clientWidth:t,clientHeight:r}=g.value;e.setSize(t,r);let i=e.dpr,a=t*i,o=r*i;n.iResolution.value=[a,o];let{anchor:s,dir:c}=N(h.raysOrigin,a,o);n.rayPos.value=s,n.rayDir.value=c},a=t=>{if(!(!v.value||!_.value||!S.value||!w.value)){if(n.iTime.value=t*.001,h.followMouse&&h.mouseInfluence>0){let e=.92;b.value.x=b.value.x*e+y.value.x*(1-e),b.value.y=b.value.y*e+y.value.y*(1-e),n.mousePos.value=[b.value.x,b.value.y]}try{e.render({scene:r}),x.value=requestAnimationFrame(a)}catch(e){console.warn(`WebGL rendering error:`,e);return}}},o=()=>{P(i)};window.addEventListener(`resize`,o,{passive:!0}),i(),x.value=requestAnimationFrame(a),C.value=()=>{if(x.value&&=(cancelAnimationFrame(x.value),null),window.removeEventListener(`resize`,o),E.value&&=(clearTimeout(E.value),null),e)try{let t=e.gl.canvas,n=e.gl.getExtension(`WEBGL_lose_context`);n&&n.loseContext(),t&&t.parentNode&&t.parentNode.removeChild(t)}catch(e){console.warn(`Error during WebGL cleanup:`,e)}v.value=null,_.value=null,S.value=null}}catch(e){console.error(`Failed to initialize WebGL:`,e)}},I=null,L=e=>{!g.value||!v.value||(I||=requestAnimationFrame(()=>{if(!g.value)return;let t=g.value.getBoundingClientRect();y.value={x:(e.clientX-t.left)/t.width,y:(e.clientY-t.top)/t.height},I=null}))};return i(()=>{g.value&&(T.value=new IntersectionObserver(e=>{w.value=e[0].isIntersecting},{threshold:.1,rootMargin:`50px`}),T.value.observe(g.value))}),u(w,e=>{e&&g.value?(C.value&&=(C.value(),null),F()):!e&&C.value&&(x.value&&=(cancelAnimationFrame(x.value),null))}),u([()=>h.raysColor,()=>h.raysSpeed,()=>h.lightSpread,()=>h.raysOrigin,()=>h.rayLength,()=>h.pulsating,()=>h.fadeDistance,()=>h.saturation,()=>h.mouseInfluence,()=>h.noiseAmount,()=>h.distortion],()=>{if(!_.value||!g.value||!v.value)return;let e=_.value,t=v.value;e.raysColor.value=D.value,e.raysSpeed.value=h.raysSpeed,e.lightSpread.value=h.lightSpread,e.rayLength.value=h.rayLength,e.pulsating.value=A.value,e.fadeDistance.value=h.fadeDistance,e.saturation.value=h.saturation,e.mouseInfluence.value=h.mouseInfluence,e.noiseAmount.value=h.noiseAmount,e.distortion.value=h.distortion;let{clientWidth:n,clientHeight:r}=g.value,i=t.dpr,{anchor:a,dir:o}=N(h.raysOrigin,n*i,r*i);e.rayPos.value=a,e.rayDir.value=o},{flush:`post`}),u(()=>h.followMouse,e=>{e?window.addEventListener(`mousemove`,L,{passive:!0}):(window.removeEventListener(`mousemove`,L),I&&=(cancelAnimationFrame(I),null))},{immediate:!0}),t(()=>{T.value&&=(T.value.disconnect(),null),C.value&&=(C.value(),null),I&&=(cancelAnimationFrame(I),null),window.removeEventListener(`mousemove`,L)}),(t,n)=>(c(),a(`div`,{ref_key:`containerRef`,ref:g,class:e([`w-full h-full relative pointer-events-none z-3 overflow-hidden`,r.className])},null,2))}});export{D as n,A as t};