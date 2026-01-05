import{D as e,_ as t,a as n,b as r,c as i,d as a,f as o,g as s,l as c,p as l,s as u,t as d,v as f,w as p,x as m}from"./index-CMVI4DtR.js";import{a as h,i as g,n as _,r as v,t as y}from"./TargetCursor-BAX49N0b.js";var b={black:`#000000`,white:`#ffffff`,red:`#ff0000`,green:`#00ff00`,blue:`#0000ff`,fuchsia:`#ff00ff`,cyan:`#00ffff`,yellow:`#ffff00`,orange:`#ff8000`};function x(e){e.length===4&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]}function S(e){return e=parseInt(e),[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function C(e){return e===void 0?[0,0,0]:arguments.length===3?arguments:isNaN(e)?e[0]===`#`?x(e):b[e.toLowerCase()]?x(b[e.toLowerCase()]):(console.warn(`Color format not recognised`),[0,0,0]):S(e)}var w=class extends Array{constructor(e){return super(...Array.isArray(e)?e:C(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(e){this[0]=e}set g(e){this[1]=e}set b(e){this[2]=e}set(e){return Array.isArray(e)?this.copy(e):this.copy(C(...arguments))}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this}},T=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,E=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;
uniform vec3 uStarColor;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5; 
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);
      
      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base * uStarColor;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      
      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  
  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0); // Center in UV space
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha); // Enhance contrast
    alpha = min(alpha, 1.0); // Clamp to maximum 1.0
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`,D=o({__name:`Galaxy`,props:{color:{default:`#ffebc0`},focal:{default:()=>[.5,.5]},rotation:{default:()=>[1,0]},starSpeed:{default:.5},density:{default:1},hueShift:{default:140},disableAnimation:{type:Boolean,default:!1},speed:{default:1},mouseInteraction:{type:Boolean,default:!0},glowIntensity:{default:.3},saturation:{default:0},mouseRepulsion:{type:Boolean,default:!0},twinkleIntensity:{default:.3},rotationSpeed:{default:.1},repulsionStrength:{default:2},autoCenterRepulsion:{default:0},transparent:{type:Boolean,default:!0}},setup(e){let n=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},i=e,a=r(`ctnDom`),o=p({x:.5,y:.5}),u=p({x:.5,y:.5}),d=p(0),y=p(0),b=null,x=()=>{if(!a.value)return;let e=a.value,t=new g({alpha:i.transparent,premultipliedAlpha:!1}),r=t.gl;i.transparent?(r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),r.clearColor(0,0,0,0)):r.clearColor(0,0,0,1);let s;function c(){t.setSize(e.offsetWidth*1,e.offsetHeight*1),s&&(s.uniforms.uResolution.value=new w(r.canvas.width,r.canvas.height,r.canvas.width/r.canvas.height))}window.addEventListener(`resize`,c,!1),c();let l=new _(r);s=new h(r,{vertex:T,fragment:E,uniforms:{uTime:{value:0},uResolution:{value:new w(r.canvas.width,r.canvas.height,r.canvas.width/r.canvas.height)},uFocal:{value:new Float32Array(i.focal)},uRotation:{value:new Float32Array(i.rotation)},uStarSpeed:{value:i.starSpeed},uDensity:{value:i.density},uHueShift:{value:i.hueShift},uSpeed:{value:i.speed},uMouse:{value:new Float32Array([u.value.x,u.value.y])},uGlowIntensity:{value:i.glowIntensity},uSaturation:{value:i.saturation},uMouseRepulsion:{value:i.mouseRepulsion},uTwinkleIntensity:{value:i.twinkleIntensity},uRotationSpeed:{value:i.rotationSpeed},uRepulsionStrength:{value:i.repulsionStrength},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:i.autoCenterRepulsion},uTransparent:{value:i.transparent},uStarColor:{value:new Float32Array(n(i.color))}}});let f=new v(r,{geometry:l,program:s}),p;function m(e){p=requestAnimationFrame(m),i.disableAnimation||(s.uniforms.uTime.value=e*.001,s.uniforms.uStarSpeed.value=e*.001*i.starSpeed/10);let n=.05;u.value.x+=(o.value.x-u.value.x)*n,u.value.y+=(o.value.y-u.value.y)*n,y.value+=(d.value-y.value)*n,s.uniforms.uMouse.value[0]=u.value.x,s.uniforms.uMouse.value[1]=u.value.y,s.uniforms.uMouseActiveFactor.value=y.value,t.render({scene:f})}p=requestAnimationFrame(m),e.appendChild(r.canvas);function x(t){let n=e.getBoundingClientRect();o.value={x:(t.clientX-n.left)/n.width,y:1-(t.clientY-n.top)/n.height},d.value=1}function S(){d.value=0}i.mouseInteraction&&(e.addEventListener(`mousemove`,x),e.addEventListener(`mouseleave`,S)),b=()=>{cancelAnimationFrame(p),window.removeEventListener(`resize`,c),i.mouseInteraction&&(e.removeEventListener(`mousemove`,x),e.removeEventListener(`mouseleave`,S)),e.removeChild(r.canvas),r.getExtension(`WEBGL_lose_context`)?.loseContext()}};return s(()=>{b?.(),x()}),t(()=>{b?.()}),m(()=>i,()=>{b?.(),x()},{deep:!0}),(e,t)=>(f(),c(`div`,l({ref_key:`ctnDom`,ref:a,class:`relative w-full h-full`},e.$attrs),null,16))}}),O={class:`relative w-full h-full bg-[url('@/assets/main.jpg')] bg-no-repeat bg-cover`},k={key:0,class:`absolute w-full h-full left-0 top-0 mix-blend-screen`},A={class:`absolute right-4 top-4 z-50`},j={__name:`Home`,setup(t){let r=d(),o=p(localStorage.getItem(`galaxyVisible`)!==`false`),s=()=>{localStorage.setItem(`galaxyVisible`,o.value.toString())},l=()=>{r.push(`/lottery`)},m=()=>{o.value=!o.value,s()};return(t,r)=>(f(),c(n,null,[a(y,{"spin-duration":2,"hide-default-cursor":!0}),u(`div`,O,[o.value?(f(),c(`div`,k,[a(D,{color:`#ffebc0`})])):i(``,!0),u(`div`,A,[u(`button`,{class:`cursor-target px-3 py-1.5 bg-black/50 text-white text-sm rounded border border-white/30 hover:bg-black/70 transition-colors cursor-pointer`,onClick:m},e(o.value?`关闭特效`:`开启特效`),1)]),u(`div`,{class:`absolute left-10 bottom-5`},[u(`div`,{class:`flex gap-4 w-[400px]`},[u(`button`,{class:`cursor-target flex-1 bg-(--btn-bg-color) text-(--btn-text-color) border-2 border-(--btn-border-color) border-dashed rounded-lg px-3 py-6 text-lg font-bold uppercase cursor-pointer transition-all duration-0.3 ease-in-out hover:bg-(--btn-hover-bg-color) hover:box-shadow-(--btn-hover-box-shadow)`,onClick:l},`抽奖`),r[0]||=u(`button`,{class:`cursor-target flex-1 bg-(--btn-bg-color) text-(--btn-text-color) border-2 border-(--btn-border-color) border-dashed rounded-lg px-3 py-6 text-lg font-bold uppercase cursor-pointer transition-all duration-0.3 ease-in-out hover:bg-(--btn-hover-bg-color) hover:box-shadow-(--btn-hover-box-shadow)`},`游戏`,-1)])])])],64))}};export{j as default};