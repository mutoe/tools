import{r as o,o as c,a}from"./index-OVaPzLTD.js";function m(u){const l=o(!1),t=e=>{l.value=document.fullscreenElement===e.target},r=()=>{var e,n,s;document.fullscreenElement?(e=document.exitFullscreen)==null||e.call(document):(s=(n=u.value)==null?void 0:n.requestFullscreen)==null||s.call(n)};return c(()=>{document.addEventListener("fullscreenchange",t)}),a(()=>{document.removeEventListener("fullscreenchange",t)}),{isFullscreen:l,toggleFullscreen:r}}export{m as u};