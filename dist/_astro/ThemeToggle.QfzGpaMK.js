import{j as c}from"./jsx-runtime.ClP7wGfN.js";import{r as a}from"./index.DK-fsZOb.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),m=(...e)=>e.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var p={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:s="",children:n,iconNode:i,...d},h)=>a.createElement("svg",{ref:h,...p,width:t,height:t,stroke:e,strokeWidth:r?Number(o)*24/Number(t):o,className:m("lucide",s),...d},[...i.map(([u,k])=>a.createElement(u,k)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(e,t)=>{const o=a.forwardRef(({className:r,...s},n)=>a.createElement(f,{ref:n,iconNode:t,className:m(`lucide-${g(e)}`,r),...s}));return o.displayName=`${e}`,o};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=l("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=l("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);function b(){const[e,t]=a.useState("light");a.useEffect(()=>{const r=document.documentElement.classList.contains("dark");t(r?"dark":"light")},[]);const o=()=>{const r=e==="light"?"dark":"light";t(r),document.documentElement.classList[r==="dark"?"add":"remove"]("dark"),localStorage.setItem("theme",r)};return c.jsx("button",{onClick:o,className:"p-1.5 rounded-md hover:bg-muted/80 transition-colors flex items-center justify-center text-foreground","aria-label":`Switch to ${e==="light"?"dark":"light"} theme`,children:e==="light"?c.jsx(y,{className:"h-4 w-4"}):c.jsx(w,{className:"h-4 w-4"})})}export{b as default};
