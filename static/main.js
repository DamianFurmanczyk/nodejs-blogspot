!function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,r){r(1),r(2)},function(t,e){},function(t,e){!function(t){const e=document.querySelectorAll("a"),r=document.querySelectorAll("textarea[required]"),n=document.querySelectorAll(".flash"),o=document.querySelectorAll(".flash--remover"),a=t=>{t.classList.add("flipOutY")};r.forEach(t=>{t.addEventListener("blur",function(t){console.log(t.target),0===t.target.value.length?(t.target.classList.add("invalid"),t.target.classList.remove("valid")):(t.target.classList.remove("invalid"),t.target.classList.add("valid"))})}),$(".button-collapse").sideNav(),$(".parallax").parallax(),$(".dropdown-button").dropdown({hover:!1}),o.forEach(t=>t.addEventListener("click",function(){a(this.parentElement)})),n.forEach((t,e)=>{setTimeout(()=>{a(t)},3500+750*e)});let l=[0,null];e.forEach(t=>{const e=location.pathname,r=t.getAttribute("href"),n=r.length;e.slice(0,n)===r&&n>l[0]&&(l[0]=n,l[1]=t)}),l[1].classList.add("active")}(window)}]);