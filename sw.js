if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const u=e=>i(e,l),o={module:{uri:l},exports:t,require:u};s[l]=Promise.all(r.map((e=>o[e]||u(e)))).then((e=>(n(...e),t)))}}define(["./workbox-cd63daf5"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-M7Fu3oRP.css",revision:null},{url:"assets/index-OVaPzLTD.js",revision:null},{url:"assets/Timer-NKqJUu3B.js",revision:null},{url:"assets/Timer-oebawl9U.css",revision:null},{url:"assets/Typewriter-ISCBQ2D4.css",revision:null},{url:"assets/Typewriter-NuEOrWAK.js",revision:null},{url:"assets/useFullscreen--ZyiTm0U.js",revision:null},{url:"index.html",revision:"3898a0f161f3937988cb4a7552cf66b0"},{url:"registerSW.js",revision:"4295883455732da3e09adfd58fd0406c"},{url:"manifest.webmanifest",revision:"c2e3cb8a2eea471ea7e461b668aae900"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));