parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fDBh":[function(require,module,exports) {
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
module.exports=[{element:"a",link:"https://w3c.github.io/html/textlevel-semantics.html#the-a-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"abbr",link:"https://w3c.github.io/html/textlevel-semantics.html#the-abbr-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"acronym",link:"http://www.w3.org/TR/html401/struct/text.html#edef-ACRONYM",specs:["4.01","X1.0","X1.1"]},{element:"address",link:"https://w3c.github.io/html/sections.html#the-address-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"applet",link:"http://www.w3.org/TR/html401/struct/objects.html#edef-APPLET",specs:["3.2","4.01","X1.0"]},{element:"area",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-area-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"article",link:"https://w3c.github.io/html/sections.html#the-article-element",specs:["5","5.1","5.2"]},{element:"aside",link:"https://w3c.github.io/html/sections.html#the-aside-element",specs:["5","5.1","5.2"]},{element:"audio",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-audio-element",specs:["5","5.1","5.2"]},{element:"b",link:"https://w3c.github.io/html/textlevel-semantics.html#the-b-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"base",link:"https://w3c.github.io/html/document-metadata.html#the-base-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"basefont",link:"http://www.w3.org/TR/html401/present/graphics.html#edef-BASEFONT",specs:["3.2","4.01","X1.0"]},{element:"bdi",link:"https://w3c.github.io/html/textlevel-semantics.html#the-bdi-element",specs:["5","5.1","5.2"]},{element:"bdo",link:"https://w3c.github.io/html/textlevel-semantics.html#the-bdo-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"big",link:"http://www.w3.org/TR/html401/present/graphics.html#edef-BIG",specs:["3.2","4.01","X1.0","X1.1"]},{element:"blockquote",link:"https://w3c.github.io/html/grouping-content.html#the-blockquote-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"body",link:"https://w3c.github.io/html/sections.html#the-body-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"br",link:"https://w3c.github.io/html/textlevel-semantics.html#the-br-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"button",link:"https://w3c.github.io/html/sec-forms.html#the-button-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"canvas",link:"https://w3c.github.io/html/the-canvas-element.html#the-canvas-element",specs:["5","5.1","5.2"]},{element:"caption",link:"https://w3c.github.io/html/tabular-data.html#the-caption-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"center",link:"http://www.w3.org/TR/html401/present/graphics.html#edef-CENTER",specs:["3.2","4.01","X1.0"]},{element:"cite",link:"https://w3c.github.io/html/textlevel-semantics.html#the-cite-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"code",link:"https://w3c.github.io/html/textlevel-semantics.html#the-code-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"col",link:"https://w3c.github.io/html/tabular-data.html#the-col-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"colgroup",link:"https://w3c.github.io/html/tabular-data.html#the-colgroup-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"data",link:"https://w3c.github.io/html/textlevel-semantics.html#the-data-element",specs:["5","5.1","5.2"]},{element:"datalist",link:"https://w3c.github.io/html/sec-forms.html#the-datalist-element",specs:["5","5.1","5.2"]},{element:"dd",link:"https://w3c.github.io/html/grouping-content.html#the-dd-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"del",link:"https://w3c.github.io/html/edits.html#the-del-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"details",link:"https://w3c.github.io/html/interactive-elements.html#the-details-element",specs:["5.1","5.2"]},{element:"dfn",link:"https://w3c.github.io/html/textlevel-semantics.html#the-dfn-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"dialog",link:"https://w3c.github.io/html/interactive-elements.html#the-dialog-element",specs:["5.2"]},{element:"dir",link:"http://www.w3.org/TR/html401/struct/lists.html#edef-DIR",specs:["2.0","3.2","4.01","X1.0"]},{element:"div",link:"https://w3c.github.io/html/grouping-content.html#the-div-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"dl",link:"https://w3c.github.io/html/grouping-content.html#the-dl-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"dt",link:"https://w3c.github.io/html/grouping-content.html#the-dt-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"em",link:"https://w3c.github.io/html/textlevel-semantics.html#the-em-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"embed",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-embed-element",specs:["5","5.1","5.2"]},{element:"fieldset",link:"https://w3c.github.io/html/sec-forms.html#the-fieldset-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"figcaption",link:"https://w3c.github.io/html/grouping-content.html#the-figcaption-element",specs:["5","5.1","5.2"]},{element:"figure",link:"https://w3c.github.io/html/grouping-content.html#the-figure-element",specs:["5","5.1","5.2"]},{element:"font",link:"http://www.w3.org/TR/html401/present/graphics.html#edef-FONT",specs:["3.2","4.01","X1.0"]},{element:"footer",link:"https://w3c.github.io/html/sections.html#the-footer-element",specs:["5","5.1","5.2"]},{element:"form",link:"https://w3c.github.io/html/forms.html#the-form-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"frame",link:"http://www.w3.org/TR/html401/present/frames.html#edef-FRAME",specs:["4.01"]},{element:"frameset",link:"http://www.w3.org/TR/html401/present/frames.html#edef-FRAMESET",specs:["4.01"]},{element:"h1",link:"https://w3c.github.io/html/sections.html#the-h1-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"h2",link:"https://w3c.github.io/html/sections.html#the-h2-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"h3",link:"https://w3c.github.io/html/sections.html#the-h3-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"h4",link:"https://w3c.github.io/html/sections.html#the-h4-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"h5",link:"https://w3c.github.io/html/sections.html#the-h5-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"h6",link:"https://w3c.github.io/html/sections.html#the-h6-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"head",link:"https://w3c.github.io/html/document-metadata.html#the-head-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"header",link:"https://w3c.github.io/html/sections.html#the-header-element",specs:["5","5.1","5.2"]},{element:"hgroup",link:"https://w3c.github.io/html/obsolete.html#hgroup",specs:[]},{element:"hr",link:"https://w3c.github.io/html/grouping-content.html#the-hr-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"html",link:"https://w3c.github.io/html/semantics.html#the-html-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"i",link:"https://w3c.github.io/html/textlevel-semantics.html#the-i-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"iframe",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-iframe-element",specs:["4.01","X1.0","5","5.1","5.2"]},{element:"img",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-img-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"input",link:"https://w3c.github.io/html/sec-forms.html#the-input-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="hidden"]',link:"https://w3c.github.io/html/sec-forms.html#hidden-state-typehidden",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="text"]',link:"https://w3c.github.io/html/sec-forms.html#text-typetext-state-and-search-state-typesearch",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="search"]',link:"https://w3c.github.io/html/sec-forms.html#text-typetext-state-and-search-state-typesearch",specs:["5","5.1","5.2"]},{element:'input[type="tel"]',link:"https://w3c.github.io/html/sec-forms.html#telephone-state-typetel",specs:["5","5.1","5.2"]},{element:'input[type="url"]',link:"https://w3c.github.io/html/sec-forms.html#url-state-typeurl",specs:["5","5.1","5.2"]},{element:'input[type="password"]',link:"https://w3c.github.io/html/sec-forms.html#password-state-typepassword",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="date"]',link:"https://w3c.github.io/html/sec-forms.html#date-state-typedate",specs:["5","5.1","5.2"]},{element:'input[type="datetime"]',link:"https://w3c.github.io/html/sec-forms.html#date-and-time-state-typedatetime",specs:["5.1","5.2"]},{element:'input[type="datetime-local"]',link:"https://w3c.github.io/html/sec-forms.html#local-date-and-time-state-typedatetimelocal",specs:["5.1","5.2"]},{element:'input[type="month"]',link:"https://w3c.github.io/html/sec-forms.html#month-state-typemonth",specs:["5.1","5.2"]},{element:'input[type="week"]',link:"https://w3c.github.io/html/sec-forms.html#week-state-typeweek",specs:["5.1","5.2"]},{element:'input[type="time"]',link:"https://w3c.github.io/html/sec-forms.html#time-state-typetime",specs:["5","5.1","5.2"]},{element:'input[type="number"]',link:"https://w3c.github.io/html/sec-forms.html#number-state-typenumber",specs:["5","5.1","5.2"]},{element:'input[type="range"]',link:"https://w3c.github.io/html/sec-forms.html#range-state-typerange",specs:["5","5.1","5.2"]},{element:'input[type="color"]',link:"https://w3c.github.io/html/sec-forms.html#color-state-typecolor",specs:["5","5.1","5.2"]},{element:'input[type="checkbox"]',link:"https://w3c.github.io/html/sec-forms.html#checkbox-state-typecheckbox",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="radio"]',link:"https://w3c.github.io/html/sec-forms.html#radio-button-state-typeradio",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="file"]',link:"https://w3c.github.io/html/sec-forms.html#file-upload-state-typefile",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="submit"]',link:"https://w3c.github.io/html/sec-forms.html#submit-button-state-typesubmit",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="image"]',link:"https://w3c.github.io/html/sec-forms.html#image-button-state-typeimage",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="reset"]',link:"https://w3c.github.io/html/sec-forms.html#reset-button-state-typereset",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:'input[type="button"]',link:"https://w3c.github.io/html/sec-forms.html#button-state-typebutton",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"ins",link:"https://w3c.github.io/html/edits.html#the-ins-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"isindex",link:"http://www.w3.org/TR/html401/interact/forms.html#edef-ISINDEX",specs:["2.0","3.2","4.01","X1.0"]},{element:"kbd",link:"https://w3c.github.io/html/textlevel-semantics.html#the-kbd-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"keygen",link:"https://w3c.github.io/html/sec-forms.html#the-keygen-element",specs:["5","5.1","5.2"]},{element:"label",link:"https://w3c.github.io/html/sec-forms.html#the-label-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"legend",link:"https://w3c.github.io/html/sec-forms.html#the-legend-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"li",link:"https://w3c.github.io/html/grouping-content.html#the-li-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"link",link:"https://w3c.github.io/html/document-metadata.html#the-link-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"main",link:"https://w3c.github.io/html/grouping-content.html#the-main-element",specs:["5","5.1","5.2"]},{element:"map",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-map-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"mark",link:"https://w3c.github.io/html/textlevel-semantics.html#the-mark-element",specs:["5","5.1","5.2"]},{element:"menu",link:"https://w3c.github.io/html/interactive-elements.html#the-menu-element",specs:["2.0","3.2","4.01","X1.0","5.1","5.2"]},{element:"menuitem",link:"https://w3c.github.io/html/interactive-elements.html#the-menuitem-element",specs:["5.1","5.2"]},{element:"meta",link:"https://w3c.github.io/html/document-metadata.html#the-meta-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"meter",link:"https://w3c.github.io/html/sec-forms.html#the-meter-element",specs:["5","5.1","5.2"]},{element:"nav",link:"https://w3c.github.io/html/sections.html#the-nav-element",specs:["5","5.1","5.2"]},{element:"nextid",link:"http://www.w3.org/MarkUp/html-spec/html-spec_5.html#SEC5.2.6",specs:["2.0"]},{element:"noframes",link:"http://www.w3.org/TR/html401/present/frames.html#edef-NOFRAMES",specs:["4.01","X1.0"]},{element:"noscript",link:"https://w3c.github.io/html/semantics-scripting.html#the-noscript-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"object",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-object-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"ol",link:"https://w3c.github.io/html/grouping-content.html#the-ol-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"optgroup",link:"https://w3c.github.io/html/sec-forms.html#the-optgroup-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"option",link:"https://w3c.github.io/html/sec-forms.html#the-option-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"output",link:"https://w3c.github.io/html/sec-forms.html#the-output-element",specs:["5","5.1","5.2"]},{element:"p",link:"https://w3c.github.io/html/grouping-content.html#the-p-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"param",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-param-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"picture",link:"https://w3c.github.io/html/embedded-content.html#the-picture-element",specs:["5.1","5.2"]},{element:"plaintext",link:"http://www.w3.org/TR/REC-html32#plaintext",specs:["2.0","3.2"]},{element:"pre",link:"https://w3c.github.io/html/grouping-content.html#the-pre-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"progress",link:"https://w3c.github.io/html/sec-forms.html#the-progress-element",specs:["5","5.1","5.2"]},{element:"q",link:"https://w3c.github.io/html/textlevel-semantics.html#the-q-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"rb",link:"https://w3c.github.io/html/textlevel-semantics.html#the-rb-element",specs:["5","5.1","5.2"]},{element:"rbc",link:"http://www.w3.org/TR/ruby/#rbc",specs:[]},{element:"rp",link:"https://w3c.github.io/html/textlevel-semantics.html#the-rp-element",specs:["X1.1","5","5.1","5.2"]},{element:"rt",link:"https://w3c.github.io/html/textlevel-semantics.html#the-rt-element",specs:["X1.1","5","5.1","5.2"]},{element:"rtc",link:"http://www.w3.org/TR/ruby/#rtc",specs:[]},{element:"ruby",link:"https://w3c.github.io/html/textlevel-semantics.html#the-ruby-element",specs:["X1.1","5","5.1","5.2"]},{element:"s",link:"http://www.w3.org/TR/html401/present/graphics.html#edef-S",specs:["4.01","X1.0","5","5.1","5.2"]},{element:"samp",link:"https://w3c.github.io/html/textlevel-semantics.html#the-samp-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"script",link:"https://w3c.github.io/html/semantics-scripting.html#the-script-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"section",link:"https://w3c.github.io/html/sections.html#the-section-element",specs:["5","5.1","5.2"]},{element:"select",link:"https://w3c.github.io/html/sec-forms.html#the-select-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"small",link:"https://w3c.github.io/html/textlevel-semantics.html#the-small-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"source",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-source-element",specs:["5","5.1","5.2"]},{element:"span",link:"https://w3c.github.io/html/textlevel-semantics.html#the-span-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"strike",link:"http://www.w3.org/TR/html401/present/graphics.html#edef-STRIKE",specs:["3.2","4.01","X1.0"]},{element:"strong",link:"https://w3c.github.io/html/textlevel-semantics.html#the-strong-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"style",link:"https://w3c.github.io/html/document-metadata.html#the-style-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"sub",link:"https://w3c.github.io/html/textlevel-semantics.html#the-sub-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"summary",link:"https://w3c.github.io/html/interactive-elements.html#the-summary-element",specs:["5.1","5.2"]},{element:"sup",link:"https://w3c.github.io/html/textlevel-semantics.html#the-sup-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"table",link:"https://w3c.github.io/html/tabular-data.html#the-table-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"tbody",link:"https://w3c.github.io/html/tabular-data.html#the-tbody-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"td",link:"https://w3c.github.io/html/tabular-data.html#the-td-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"template",link:"https://w3c.github.io/html/semantics-scripting.html#the-template-element",specs:["5","5.1","5.2"]},{element:"textarea",link:"https://w3c.github.io/html/sec-forms.html#the-textarea-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"tfoot",link:"https://w3c.github.io/html/tabular-data.html#the-tfoot-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"th",link:"https://w3c.github.io/html/tabular-data.html#the-th-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"thead",link:"https://w3c.github.io/html/tabular-data.html#the-thead-element",specs:["4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"time",link:"https://w3c.github.io/html/textlevel-semantics.html#the-time-element",specs:["5","5.1","5.2"]},{element:"title",link:"https://w3c.github.io/html/document-metadata.html#the-title-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"tr",link:"https://w3c.github.io/html/tabular-data.html#the-tr-element",specs:["3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"track",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-track-element",specs:["5","5.1","5.2"]},{element:"tt",link:"http://www.w3.org/TR/html401/present/graphics.html#edef-TT",specs:["2.0","3.2","4.01","X1.0","X1.1"]},{element:"u",link:"https://w3c.github.io/html/textlevel-semantics.html#the-u-element",specs:["3.2","4.01","X1.0","5","5.1","5.2"]},{element:"ul",link:"https://w3c.github.io/html/grouping-content.html#the-ul-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"var",link:"https://w3c.github.io/html/textlevel-semantics.html#the-var-element",specs:["2.0","3.2","4.01","X1.0","X1.1","5","5.1","5.2"]},{element:"video",link:"https://w3c.github.io/html/semantics-embedded-content.html#the-video-element",specs:["5","5.1","5.2"]},{element:"wbr",link:"https://w3c.github.io/html/textlevel-semantics.html#the-wbr-element",specs:["5","5.1","5.2"]},{element:"xmp",link:"http://www.w3.org/TR/REC-html32#xmp",specs:["2.0","3.2"]}];
},{}],"fRxd":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("uuid"),t=r(require("./elements.json"));function r(e){return e&&e.__esModule?e:{default:e}}function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){c(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var i={};t.default.map(function(t){i[t.element]=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1?arguments[1]:void 0,c=Object.assign(document.createElement(t.element),u({},r)),i=document.createDocumentFragment();if(c.mId=(0,e.v4)(),Array.isArray(o))o.flatMap(function(e){return i.appendChild(e)});else if("string"==typeof o){var l=document.createTextNode(o);i.appendChild(l)}else"object"===n(o)&&i.appendChild(o);return c.appendChild(i),c}});var l=i;exports.default=l;
},{"uuid":"qQO4","./elements.json":"FAj7"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"DOM",{enumerable:!0,get:function(){return e.default}});var e=r(require("./dom"));function r(e){return e&&e.__esModule?e:{default:e}}
},{"./dom":"fRxd"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map