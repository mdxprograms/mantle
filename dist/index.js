parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"b9XL":[function(require,module,exports) {
function o(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?module.exports=o=function(o){return typeof o}:module.exports=o=function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},o(t)}module.exports=o;
},{}],"IxO8":[function(require,module,exports) {
function e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}module.exports=e;
},{}],"fDBh":[function(require,module,exports) {
var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var o=new Uint8Array(16);module.exports=function(){return e(o),o}}else{var r=new Array(16);module.exports=function(){for(var e,o=0;o<16;o++)0==(3&o)&&(e=4294967296*Math.random()),r[o]=e>>>((3&o)<<3)&255;return r}}
},{}],"dAjQ":[function(require,module,exports) {
for(var r=[],o=0;o<256;++o)r[o]=(o+256).toString(16).substr(1);function t(o,t){var n=t||0,u=r;return[u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],"-",u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]],u[o[n++]]].join("")}module.exports=t;
},{}],"hVVj":[function(require,module,exports) {
var e,r,o=require("./lib/rng"),s=require("./lib/bytesToUuid"),i=0,n=0;function c(c,l,u){var v=l&&u||0,a=l||[],d=(c=c||{}).node||e,t=void 0!==c.clockseq?c.clockseq:r;if(null==d||null==t){var m=o();null==d&&(d=e=[1|m[0],m[1],m[2],m[3],m[4],m[5]]),null==t&&(t=r=16383&(m[6]<<8|m[7]))}var q=void 0!==c.msecs?c.msecs:(new Date).getTime(),f=void 0!==c.nsecs?c.nsecs:n+1,b=q-i+(f-n)/1e4;if(b<0&&void 0===c.clockseq&&(t=t+1&16383),(b<0||q>i)&&void 0===c.nsecs&&(f=0),f>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");i=q,n=f,r=t;var k=(1e4*(268435455&(q+=122192928e5))+f)%4294967296;a[v++]=k>>>24&255,a[v++]=k>>>16&255,a[v++]=k>>>8&255,a[v++]=255&k;var w=q/4294967296*1e4&268435455;a[v++]=w>>>8&255,a[v++]=255&w,a[v++]=w>>>24&15|16,a[v++]=w>>>16&255,a[v++]=t>>>8|128,a[v++]=255&t;for(var g=0;g<6;++g)a[v+g]=d[g];return l||s(a)}module.exports=c;
},{"./lib/rng":"fDBh","./lib/bytesToUuid":"dAjQ"}],"hYHi":[function(require,module,exports) {
var r=require("./lib/rng"),n=require("./lib/bytesToUuid");function e(e,i,u){var a=i&&u||0;"string"==typeof e&&(i="binary"===e?new Array(16):null,e=null);var l=(e=e||{}).random||(e.rng||r)();if(l[6]=15&l[6]|64,l[8]=63&l[8]|128,i)for(var o=0;o<16;++o)i[a+o]=l[o];return i||n(l)}module.exports=e;
},{"./lib/rng":"fDBh","./lib/bytesToUuid":"dAjQ"}],"qQO4":[function(require,module,exports) {
var e=require("./v1"),r=require("./v4"),v=r;v.v1=e,v.v4=r,module.exports=v;
},{"./v1":"hVVj","./v4":"hYHi"}],"FAj7":[function(require,module,exports) {
module.exports=["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input",'input[type="hidden"]','input[type="text"]','input[type="search"]','input[type="tel"]','input[type="url"]','input[type="password"]','input[type="date"]','input[type="datetime"]','input[type="datetime-local"]','input[type="month"]','input[type="week"]','input[type="time"]','input[type="number"]','input[type="range"]','input[type="color"]','input[type="checkbox"]','input[type="radio"]','input[type="file"]','input[type="submit"]','input[type="image"]','input[type="reset"]','input[type="button"]',"ins","isindex","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","nextid","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","plaintext","pre","progress","q","rb","rbc","rp","rt","rtc","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr","xmp"];
},{}],"n9cH":[function(require,module,exports) {
"use strict";module.exports=function(t,e,r){var n,o=t.length;if(!(e>=o||0===r)){var f=o-(r=e+r>o?o-e:r);for(n=e;n<f;++n)t[n]=t[n+r];t.length=f}};
},{}],"Yjno":[function(require,module,exports) {
function o(o,n,r){t(o==n,r)}function n(o,n,r){t(o!=n,r)}function r(o,n){t(!o,n)}function t(o,n){if(!o)throw new Error(n||"AssertionError")}t.notEqual=n,t.notOk=r,t.equal=o,t.ok=t,module.exports=t;
},{}],"WJwS":[function(require,module,exports) {
var e=require("assert"),t="undefined"!=typeof window;function n(){var e;return t?(window._nanoScheduler||(window._nanoScheduler=new i(!0)),e=window._nanoScheduler):e=new i,e}function i(e){this.hasWindow=e,this.hasIdle=this.hasWindow&&window.requestIdleCallback,this.method=this.hasIdle?window.requestIdleCallback.bind(window):this.setTimeout,this.scheduled=!1,this.queue=[]}i.prototype.push=function(t){e.equal(typeof t,"function","nanoscheduler.push: cb should be type function"),this.queue.push(t),this.schedule()},i.prototype.schedule=function(){if(!this.scheduled){this.scheduled=!0;var e=this;this.method(function(t){for(;e.queue.length&&t.timeRemaining()>0;)e.queue.shift()(t);e.scheduled=!1,e.queue.length&&e.schedule()})}},i.prototype.setTimeout=function(e){setTimeout(e,0,{timeRemaining:function(){return 1}})},module.exports=n;
},{"assert":"Yjno"}],"XNjw":[function(require,module,exports) {
var r,e=require("nanoscheduler")(),a=require("assert");n.disabled=!0;try{r=window.performance,n.disabled="true"===window.localStorage.DISABLE_NANOTIMING||!r.mark}catch(i){}function n(u){if(a.equal(typeof u,"string","nanotiming: name should be type string"),n.disabled)return t;var o=(1e4*r.now()).toFixed()%Number.MAX_SAFE_INTEGER,s="start-"+o+"-"+u;function c(a){var n="end-"+o+"-"+u;r.mark(n),e.push(function(){var e=null;try{var t=u+" ["+o+"]";r.measure(t,s,n),r.clearMarks(s),r.clearMarks(n)}catch(i){e=i}a&&a(e,u)})}return r.mark(s),c.uuid=o,c}function t(r){r&&e.push(function(){r(new Error("nanotiming: performance API unavailable"))})}module.exports=n;
},{"nanoscheduler":"WJwS","assert":"Yjno"}],"d8gF":[function(require,module,exports) {
var e=require("remove-array-items"),t=require("nanotiming"),s=require("assert");function n(e){if(!(this instanceof n))return new n(e);this._name=e||"nanobus",this._starListeners=[],this._listeners={}}module.exports=n,n.prototype.emit=function(e){s.ok("string"==typeof e||"symbol"==typeof e,"nanobus.emit: eventName should be type string or symbol");for(var n=[],i=1,r=arguments.length;i<r;i++)n.push(arguments[i]);var o=t(this._name+"('"+e.toString()+"')"),u=this._listeners[e];return u&&u.length>0&&this._emit(this._listeners[e],n),this._starListeners.length>0&&this._emit(this._starListeners,e,n,o.uuid),o(),this},n.prototype.on=n.prototype.addListener=function(e,t){return s.ok("string"==typeof e||"symbol"==typeof e,"nanobus.on: eventName should be type string or symbol"),s.equal(typeof t,"function","nanobus.on: listener should be type function"),"*"===e?this._starListeners.push(t):(this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(t)),this},n.prototype.prependListener=function(e,t){return s.ok("string"==typeof e||"symbol"==typeof e,"nanobus.prependListener: eventName should be type string or symbol"),s.equal(typeof t,"function","nanobus.prependListener: listener should be type function"),"*"===e?this._starListeners.unshift(t):(this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].unshift(t)),this},n.prototype.once=function(e,t){s.ok("string"==typeof e||"symbol"==typeof e,"nanobus.once: eventName should be type string or symbol"),s.equal(typeof t,"function","nanobus.once: listener should be type function");var n=this;return this.on(e,function s(){t.apply(n,arguments);n.removeListener(e,s)}),this},n.prototype.prependOnceListener=function(e,t){s.ok("string"==typeof e||"symbol"==typeof e,"nanobus.prependOnceListener: eventName should be type string or symbol"),s.equal(typeof t,"function","nanobus.prependOnceListener: listener should be type function");var n=this;return this.prependListener(e,function s(){t.apply(n,arguments);n.removeListener(e,s)}),this},n.prototype.removeListener=function(t,n){return s.ok("string"==typeof t||"symbol"==typeof t,"nanobus.removeListener: eventName should be type string or symbol"),s.equal(typeof n,"function","nanobus.removeListener: listener should be type function"),"*"===t?(this._starListeners=this._starListeners.slice(),i(this._starListeners,n)):(void 0!==this._listeners[t]&&(this._listeners[t]=this._listeners[t].slice()),i(this._listeners[t],n));function i(t,s){if(t){var n=t.indexOf(s);return-1!==n?(e(t,n,1),!0):void 0}}},n.prototype.removeAllListeners=function(e){return e?"*"===e?this._starListeners=[]:this._listeners[e]=[]:(this._starListeners=[],this._listeners={}),this},n.prototype.listeners=function(e){var t="*"!==e?this._listeners[e]:this._starListeners,s=[];if(t)for(var n=t.length,i=0;i<n;i++)s.push(t[i]);return s},n.prototype._emit=function(e,t,s,n){if(void 0!==e&&0!==e.length){void 0===s&&(s=t,t=null),t&&(s=void 0!==n?[t].concat(s,n):[t].concat(s));for(var i=e.length,r=0;r<i;r++){var o=e[r];o.apply(o,s)}}};
},{"remove-array-items":"n9cH","nanotiming":"XNjw","assert":"Yjno"}],"H0u9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.on=exports.dispatch=void 0;var e=t(require("nanobus"));function t(e){return e&&e.__esModule?e:{default:e}}var r=(0,e.default)(),o=function(e,t){return r.emit(e,t)};exports.dispatch=o;var n=function(e,t){return r.on(e,t)};exports.on=n;
},{"nanobus":"d8gF"}],"fRxd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("@babel/runtime/helpers/typeof")),r=i(require("@babel/runtime/helpers/defineProperty")),t=require("uuid"),n=i(require("./elements.json")),o=require("./emitter");function i(e){return e&&e.__esModule?e:{default:e}}function u(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){(0,r.default)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var c={};n.default.map(function(r){c[r]=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1?arguments[1]:void 0,u=Object.assign(document.createElement(r),a({},n)),c=document.createDocumentFragment();if(u.mId="mId"in n?n.mId:(0,t.v4)(),Array.isArray(i))i.flatMap(function(e){return c.appendChild(e)});else if("string"==typeof i){var d=document.createTextNode(i);c.appendChild(d)}else"object"===(0,e.default)(i)&&c.appendChild(i);return u.appendChild(c),u.on=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};for(var r in e)r in e&&u.addEventListener(r,e[r]);return u},u.when=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=function(r){r in e&&(0,o.on)(r,function(t){return e[r](u,t)})};for(var t in e)r(t);return u},u}});var d=c;exports.default=d;
},{"@babel/runtime/helpers/typeof":"b9XL","@babel/runtime/helpers/defineProperty":"IxO8","uuid":"qQO4","./elements.json":"FAj7","./emitter":"H0u9"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"DOM",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"dispatch",{enumerable:!0,get:function(){return t.dispatch}}),Object.defineProperty(exports,"on",{enumerable:!0,get:function(){return t.on}}),exports.mount=void 0;var e=r(require("./dom")),t=require("./emitter");function r(e){return e&&e.__esModule?e:{default:e}}var n=function(e,t){e.appendChild(t)};exports.mount=n;
},{"./dom":"fRxd","./emitter":"H0u9"}]},{},["Focm"], "@wallerbuilt/mantle")
//# sourceMappingURL=/index.js.map