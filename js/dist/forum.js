module.exports=function(n){var t={};function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:o})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)e.d(o,r,function(t){return n[t]}.bind(null,r));return o},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=6)}([function(n,t){n.exports=flarum.core.compat.app},function(n,t){n.exports=flarum.core.compat.extend},function(n,t){n.exports=flarum.core.compat["components/LogInButtons"]},function(n,t){n.exports=flarum.core.compat["components/LogInButton"]},,,function(n,t,e){"use strict";e.r(t);var o=e(1),r=e(0),u=e.n(r),i=e(2),a=e.n(i),c=e(3),f=e.n(c);u.a.initializers.add("nomiscz/flarum-ext-auth-linkedin",(function(){Object(o.extend)(a.a.prototype,"items",(function(n){n.add("linkedin",m(f.a,{className:"Button LogInButton--linkdin",icon:"fab fa-linkedin",path:"/auth/linkedin"},u.a.translator.trans("nomiscz-auth-linkedin.forum.buttons.login")))}))}))}]);
//# sourceMappingURL=forum.js.map