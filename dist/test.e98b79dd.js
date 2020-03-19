// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/pubsub.js/pubsub.js":[function(require,module,exports) {
var global = arguments[3];
var define;
(function (scope) {
  'use strict';

  var pubsubInstance = null;
  var pubsubConfig = null;

  if (typeof pubsub === 'object') {
    pubsubConfig = pubsub; //node.js config from global
  } else if (typeof global === 'object' && typeof global.pubsubConfig === 'object') {
    pubsubConfig = global.pubsubConfig;
  }

  function Pubsub(config) {
    var _eventObject = {};
    var options = {
      separator: config && config.separator ? config.separator : '/',
      recurrent: config && typeof config.recurrent === 'boolean' ? config.recurrent : false,
      depth: config && typeof config.depth === 'number' ? config.depth : null,
      async: config && typeof config.async === 'boolean' ? config.async : false,
      context: config && config.context ? config.context : null,
      log: config && config.log ? config.log : false
    };

    function forEach(dataArray, callback) {
      var i = 0,
          arrayLength = dataArray.length;

      for (i = 0; i < arrayLength; i++) {
        callback(i, dataArray[i]);
      }
    }

    function isArray(obj) {
      return Array.isArray ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
    }

    function executeCallback(subscriptions, args, async) {
      async = typeof async === 'boolean' ? async : options.async;

      if (!subscriptions.length) {
        return;
      } // clone array - callbacks can unsubscribe other subscriptions
      // reduces a lot performance but is safe


      var executedSubscriptions = subscriptions.slice();
      forEach(executedSubscriptions, function (subscriptionId, subscription) {
        if (typeof subscription === 'object' && executedSubscriptions.hasOwnProperty(subscriptionId)) {
          if (async) {
            setTimeout(function () {
              subscription.callback.apply(subscription.context, args);
            }, 4);
          } else {
            subscription.callback.apply(subscription.context, args);
          }
        }
      });
    }

    function executePublishWildcard(nsObject, args) {
      var nsElement;

      for (nsElement in nsObject) {
        if (nsElement[0] !== '_' && nsObject.hasOwnProperty(nsElement)) {
          executeCallback(nsObject[nsElement]._events, args);
        }
      }
    }

    function publish(nsObject, args, parts, params) {
      // work on copy - not on reference
      parts = parts.slice();
      var iPart = parts.shift();
      var depth = params.depth;
      var async = params.async;
      var partsLength = params.partsLength;
      var recurrent = params.recurrent;
      var partNumber = partsLength - parts.length; // parts is empty

      if (!iPart) {
        executeCallback(nsObject._events, args, async);
        return;
      } // handle subscribe wildcard


      if (typeof nsObject['*'] !== 'undefined') {
        publish(nsObject['*'], args, parts, params);
      } // handle publish wildcard


      if (iPart === '*') {
        executePublishWildcard(nsObject, args, async);
      } // no namespace = leave publish


      if (typeof nsObject[iPart] === "undefined") {
        if (params.log) {
          console.warn('There is no ' + params.nsString + ' subscription');
        }

        return;
      }

      nsObject = nsObject[iPart];

      if (recurrent === true && typeof depth !== 'number') {
        //depth is not defined
        executeCallback(nsObject._events, args, async);

        if (parts.length === 0) {
          return;
        }
      } else if (recurrent === true && typeof depth === 'number' && partNumber >= partsLength - depth) {
        //if depth is defined
        executeCallback(nsObject._events, args, async);
      }

      publish(nsObject, args, parts, params);
    }

    function executeSubscribeWildcard(nsObject, args, params) {
      var parts = params.parts;
      var async = params.async;
      var nextPart = null;

      if (parts.length === 0) {
        executeCallback(nsObject._events, args, async);
      } else {
        nextPart = parts.shift();

        if (nsObject[nextPart]) {
          executeSubscribeWildcard(nsObject[nextPart], args, {
            parts: parts,
            async: async,
            nsString: params.nsString
          });
        }
      }
    }

    function subscribe(nsString, callback, params) {
      var parts = nsString.split(options.separator),
          nsObject,
          //Namespace object to which we attach event
      context = params && typeof params.context !== 'undefined' ? params.context : options.context,
          eventObject = null,
          i = 0;

      if (!context) {
        context = callback;
      } //Iterating through _eventObject to find proper nsObject


      nsObject = _eventObject;

      for (i = 0; i < parts.length; i += 1) {
        if (typeof nsObject[parts[i]] === "undefined") {
          nsObject[parts[i]] = {};
          nsObject[parts[i]]._events = [];
        }

        nsObject = nsObject[parts[i]];
      }

      eventObject = {
        callback: callback,
        context: context // "this" parameter in executed function

      };

      nsObject._events.push(eventObject);

      return {
        namespace: parts.join(options.separator),
        event: eventObject
      };
    }

    function unsubscribe(subscribeObject) {
      if (subscribeObject === null || typeof subscribeObject === 'undefined') {
        return null;
      }

      var nsString = subscribeObject.namespace,
          eventObject = subscribeObject.event,
          parts = nsString.split(options.separator),
          nsObject,
          i = 0; //Iterating through _eventObject to find proper nsObject

      nsObject = _eventObject;

      for (i = 0; i < parts.length; i += 1) {
        if (typeof nsObject[parts[i]] === "undefined") {
          if (options.log) {
            console.error('There is no ' + nsString + ' subscription');
          }

          return null;
        }

        nsObject = nsObject[parts[i]];
      }

      forEach(nsObject._events, function (eventId) {
        if (nsObject._events[eventId] === eventObject) {
          nsObject._events.splice(eventId, 1);
        }
      });
    }

    return {
      /**
       * Publish event
       * @param nsString string namespace string splited by dots
       * @param args array of arguments given to callbacks
       * @param params paramaters possible:
       *        @param recurrent bool should execution be bubbled throught namespace
       *        @param depth integer how many namespaces separated by dots will be executed
       */
      publish: function (nsString, args, params) {
        var parts = nsString.split(options.separator),
            recurrent = typeof params === 'object' && params.recurrent ? params.recurrent : options.recurrent,
            // bubbles event throught namespace if true
        depth = typeof params === 'object' && params.depth ? params.depth : options.depth,
            async = typeof params === 'object' && params.async ? params.async : options.async,
            partsLength = parts.length;

        if (!parts.length) {
          if (options.log) {
            console.error('Wrong namespace provided ' + nsString);
          }

          return;
        }

        publish(_eventObject, args, parts, {
          recurrent: recurrent,
          depth: depth,
          async: async,
          parts: parts,
          nsString: nsString,
          partsLength: partsLength
        });
      },

      /**
       * Subscribe event
       * @param nsString string namespace string splited by dots
       * @param callback function function executed after publishing event
       * @param params given params
       *		@param context object/nothing Optional object which will be used as "this" in callback
       */
      subscribe: function (nsString, callback, params) {
        var self = this,
            subscriptions = []; // array of callbacks - multiple subscription

        if (isArray(callback)) {
          forEach(callback, function (number) {
            var oneCallback = callback[number];
            subscriptions = subscriptions.concat(self.subscribe(nsString, oneCallback, params));
          }); // array of namespaces - multiple subscription
        } else if (isArray(nsString)) {
          forEach(nsString, function (number) {
            var namespace = nsString[number];
            subscriptions = subscriptions.concat(self.subscribe(namespace, callback, params));
          });
        } else {
          return subscribe.apply(self, arguments);
        }

        return subscriptions;
      },

      /**
       * subscribeOnce event - subscribe once to some event, then unsubscribe immadiately
       * @param nsString string namespace string splited by dots
       * @param callback function function executed after publishing event
       * @param params given params
       *		@param context object/nothing Optional object which will be used as "this" in callback
       */
      subscribeOnce: function (nsString, callback, params) {
        var self = this,
            subscription = null;

        function subscriptionCallback() {
          var context = this;
          callback.apply(context, arguments);
          self.unsubscribe(subscription);
        }

        subscription = self.subscribe(nsString, subscriptionCallback, params);
        return subscription;
      },

      /**
       * Unsubscribe from given subscription
       * @param subscribeObject subscription object given on subscribe (returned from subscription)
       */
      unsubscribe: function (subscribeObject) {
        var self = this; //if we have array of callbacks - multiple subscription

        if (isArray(subscribeObject)) {
          forEach(subscribeObject, function (number) {
            var oneSubscribtion = subscribeObject[number];
            unsubscribe.apply(self, [oneSubscribtion]);
          });
        } else {
          unsubscribe.apply(self, arguments);
        }
      },

      /**
       * newInstance - makes new instance of pubsub object with its own config
       * @param params instance configuration
       *        @param separator separator (default is "/")
       *        @param recurrent should publish events be bubbled through namespace
       *        @param async should publish events be asynchronous - not blocking function execution
       *        @param log console.warn/error every problem
       */
      newInstance: function (params) {
        return new Pubsub(params);
      }
    }; //return block
  }

  pubsubInstance = new Pubsub(pubsubConfig); //if sbd's using requirejs library to load pubsub.js

  if (typeof define === 'function') {
    define(pubsubInstance);
  } //node.js


  if (typeof module === 'object' && module.exports) {
    module.exports = pubsubInstance;
  }

  if (typeof window === 'object') {
    window.pubsub = pubsubInstance;

    if (window !== scope) {
      scope.pubsub = pubsubInstance;
    }
  }
})(this);
},{}],"../node_modules/uuid/lib/rng-browser.js":[function(require,module,exports) {
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

},{}],"../node_modules/uuid/lib/bytesToUuid.js":[function(require,module,exports) {
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;

},{}],"../node_modules/uuid/v1.js":[function(require,module,exports) {
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

},{"./lib/rng":"../node_modules/uuid/lib/rng-browser.js","./lib/bytesToUuid":"../node_modules/uuid/lib/bytesToUuid.js"}],"../node_modules/uuid/v4.js":[function(require,module,exports) {
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/rng":"../node_modules/uuid/lib/rng-browser.js","./lib/bytesToUuid":"../node_modules/uuid/lib/bytesToUuid.js"}],"../node_modules/uuid/index.js":[function(require,module,exports) {
var v1 = require('./v1');
var v4 = require('./v4');

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

},{"./v1":"../node_modules/uuid/v1.js","./v4":"../node_modules/uuid/v4.js"}],"../src/elements.json":[function(require,module,exports) {
module.exports = [{
  "element": "a",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-a-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "abbr",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-abbr-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "acronym",
  "link": "http://www.w3.org/TR/html401/struct/text.html#edef-ACRONYM",
  "specs": ["4.01", "X1.0", "X1.1"]
}, {
  "element": "address",
  "link": "https://w3c.github.io/html/sections.html#the-address-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "applet",
  "link": "http://www.w3.org/TR/html401/struct/objects.html#edef-APPLET",
  "specs": ["3.2", "4.01", "X1.0"]
}, {
  "element": "area",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-area-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "article",
  "link": "https://w3c.github.io/html/sections.html#the-article-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "aside",
  "link": "https://w3c.github.io/html/sections.html#the-aside-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "audio",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-audio-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "b",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-b-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "base",
  "link": "https://w3c.github.io/html/document-metadata.html#the-base-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "basefont",
  "link": "http://www.w3.org/TR/html401/present/graphics.html#edef-BASEFONT",
  "specs": ["3.2", "4.01", "X1.0"]
}, {
  "element": "bdi",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-bdi-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "bdo",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-bdo-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "big",
  "link": "http://www.w3.org/TR/html401/present/graphics.html#edef-BIG",
  "specs": ["3.2", "4.01", "X1.0", "X1.1"]
}, {
  "element": "blockquote",
  "link": "https://w3c.github.io/html/grouping-content.html#the-blockquote-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "body",
  "link": "https://w3c.github.io/html/sections.html#the-body-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "br",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-br-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "button",
  "link": "https://w3c.github.io/html/sec-forms.html#the-button-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "canvas",
  "link": "https://w3c.github.io/html/the-canvas-element.html#the-canvas-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "caption",
  "link": "https://w3c.github.io/html/tabular-data.html#the-caption-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "center",
  "link": "http://www.w3.org/TR/html401/present/graphics.html#edef-CENTER",
  "specs": ["3.2", "4.01", "X1.0"]
}, {
  "element": "cite",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-cite-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "code",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-code-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "col",
  "link": "https://w3c.github.io/html/tabular-data.html#the-col-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "colgroup",
  "link": "https://w3c.github.io/html/tabular-data.html#the-colgroup-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "data",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-data-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "datalist",
  "link": "https://w3c.github.io/html/sec-forms.html#the-datalist-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "dd",
  "link": "https://w3c.github.io/html/grouping-content.html#the-dd-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "del",
  "link": "https://w3c.github.io/html/edits.html#the-del-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "details",
  "link": "https://w3c.github.io/html/interactive-elements.html#the-details-element",
  "specs": ["5.1", "5.2"]
}, {
  "element": "dfn",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-dfn-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "dialog",
  "link": "https://w3c.github.io/html/interactive-elements.html#the-dialog-element",
  "specs": ["5.2"]
}, {
  "element": "dir",
  "link": "http://www.w3.org/TR/html401/struct/lists.html#edef-DIR",
  "specs": ["2.0", "3.2", "4.01", "X1.0"]
}, {
  "element": "div",
  "link": "https://w3c.github.io/html/grouping-content.html#the-div-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "dl",
  "link": "https://w3c.github.io/html/grouping-content.html#the-dl-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "dt",
  "link": "https://w3c.github.io/html/grouping-content.html#the-dt-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "em",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-em-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "embed",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-embed-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "fieldset",
  "link": "https://w3c.github.io/html/sec-forms.html#the-fieldset-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "figcaption",
  "link": "https://w3c.github.io/html/grouping-content.html#the-figcaption-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "figure",
  "link": "https://w3c.github.io/html/grouping-content.html#the-figure-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "font",
  "link": "http://www.w3.org/TR/html401/present/graphics.html#edef-FONT",
  "specs": ["3.2", "4.01", "X1.0"]
}, {
  "element": "footer",
  "link": "https://w3c.github.io/html/sections.html#the-footer-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "form",
  "link": "https://w3c.github.io/html/forms.html#the-form-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "frame",
  "link": "http://www.w3.org/TR/html401/present/frames.html#edef-FRAME",
  "specs": ["4.01"]
}, {
  "element": "frameset",
  "link": "http://www.w3.org/TR/html401/present/frames.html#edef-FRAMESET",
  "specs": ["4.01"]
}, {
  "element": "h1",
  "link": "https://w3c.github.io/html/sections.html#the-h1-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "h2",
  "link": "https://w3c.github.io/html/sections.html#the-h2-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "h3",
  "link": "https://w3c.github.io/html/sections.html#the-h3-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "h4",
  "link": "https://w3c.github.io/html/sections.html#the-h4-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "h5",
  "link": "https://w3c.github.io/html/sections.html#the-h5-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "h6",
  "link": "https://w3c.github.io/html/sections.html#the-h6-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "head",
  "link": "https://w3c.github.io/html/document-metadata.html#the-head-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "header",
  "link": "https://w3c.github.io/html/sections.html#the-header-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "hgroup",
  "link": "https://w3c.github.io/html/obsolete.html#hgroup",
  "specs": []
}, {
  "element": "hr",
  "link": "https://w3c.github.io/html/grouping-content.html#the-hr-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "html",
  "link": "https://w3c.github.io/html/semantics.html#the-html-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "i",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-i-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "iframe",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-iframe-element",
  "specs": ["4.01", "X1.0", "5", "5.1", "5.2"]
}, {
  "element": "img",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-img-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input",
  "link": "https://w3c.github.io/html/sec-forms.html#the-input-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"hidden\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#hidden-state-typehidden",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"text\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#text-typetext-state-and-search-state-typesearch",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"search\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#text-typetext-state-and-search-state-typesearch",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"tel\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#telephone-state-typetel",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"url\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#url-state-typeurl",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"password\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#password-state-typepassword",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"date\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#date-state-typedate",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"datetime\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#date-and-time-state-typedatetime",
  "specs": ["5.1", "5.2"]
}, {
  "element": "input[type=\"datetime-local\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#local-date-and-time-state-typedatetimelocal",
  "specs": ["5.1", "5.2"]
}, {
  "element": "input[type=\"month\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#month-state-typemonth",
  "specs": ["5.1", "5.2"]
}, {
  "element": "input[type=\"week\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#week-state-typeweek",
  "specs": ["5.1", "5.2"]
}, {
  "element": "input[type=\"time\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#time-state-typetime",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"number\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#number-state-typenumber",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"range\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#range-state-typerange",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"color\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#color-state-typecolor",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "input[type=\"checkbox\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#checkbox-state-typecheckbox",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"radio\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#radio-button-state-typeradio",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"file\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#file-upload-state-typefile",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"submit\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#submit-button-state-typesubmit",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"image\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#image-button-state-typeimage",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"reset\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#reset-button-state-typereset",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "input[type=\"button\"]",
  "link": "https://w3c.github.io/html/sec-forms.html#button-state-typebutton",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "ins",
  "link": "https://w3c.github.io/html/edits.html#the-ins-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "isindex",
  "link": "http://www.w3.org/TR/html401/interact/forms.html#edef-ISINDEX",
  "specs": ["2.0", "3.2", "4.01", "X1.0"]
}, {
  "element": "kbd",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-kbd-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "keygen",
  "link": "https://w3c.github.io/html/sec-forms.html#the-keygen-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "label",
  "link": "https://w3c.github.io/html/sec-forms.html#the-label-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "legend",
  "link": "https://w3c.github.io/html/sec-forms.html#the-legend-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "li",
  "link": "https://w3c.github.io/html/grouping-content.html#the-li-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "link",
  "link": "https://w3c.github.io/html/document-metadata.html#the-link-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "main",
  "link": "https://w3c.github.io/html/grouping-content.html#the-main-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "map",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-map-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "mark",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-mark-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "menu",
  "link": "https://w3c.github.io/html/interactive-elements.html#the-menu-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "5.1", "5.2"]
}, {
  "element": "menuitem",
  "link": "https://w3c.github.io/html/interactive-elements.html#the-menuitem-element",
  "specs": ["5.1", "5.2"]
}, {
  "element": "meta",
  "link": "https://w3c.github.io/html/document-metadata.html#the-meta-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "meter",
  "link": "https://w3c.github.io/html/sec-forms.html#the-meter-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "nav",
  "link": "https://w3c.github.io/html/sections.html#the-nav-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "nextid",
  "link": "http://www.w3.org/MarkUp/html-spec/html-spec_5.html#SEC5.2.6",
  "specs": ["2.0"]
}, {
  "element": "noframes",
  "link": "http://www.w3.org/TR/html401/present/frames.html#edef-NOFRAMES",
  "specs": ["4.01", "X1.0"]
}, {
  "element": "noscript",
  "link": "https://w3c.github.io/html/semantics-scripting.html#the-noscript-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "object",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-object-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "ol",
  "link": "https://w3c.github.io/html/grouping-content.html#the-ol-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "optgroup",
  "link": "https://w3c.github.io/html/sec-forms.html#the-optgroup-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "option",
  "link": "https://w3c.github.io/html/sec-forms.html#the-option-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "output",
  "link": "https://w3c.github.io/html/sec-forms.html#the-output-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "p",
  "link": "https://w3c.github.io/html/grouping-content.html#the-p-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "param",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-param-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "picture",
  "link": "https://w3c.github.io/html/embedded-content.html#the-picture-element",
  "specs": ["5.1", "5.2"]
}, {
  "element": "plaintext",
  "link": "http://www.w3.org/TR/REC-html32#plaintext",
  "specs": ["2.0", "3.2"]
}, {
  "element": "pre",
  "link": "https://w3c.github.io/html/grouping-content.html#the-pre-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "progress",
  "link": "https://w3c.github.io/html/sec-forms.html#the-progress-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "q",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-q-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "rb",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-rb-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "rbc",
  "link": "http://www.w3.org/TR/ruby/#rbc",
  "specs": []
}, {
  "element": "rp",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-rp-element",
  "specs": ["X1.1", "5", "5.1", "5.2"]
}, {
  "element": "rt",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-rt-element",
  "specs": ["X1.1", "5", "5.1", "5.2"]
}, {
  "element": "rtc",
  "link": "http://www.w3.org/TR/ruby/#rtc",
  "specs": []
}, {
  "element": "ruby",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-ruby-element",
  "specs": ["X1.1", "5", "5.1", "5.2"]
}, {
  "element": "s",
  "link": "http://www.w3.org/TR/html401/present/graphics.html#edef-S",
  "specs": ["4.01", "X1.0", "5", "5.1", "5.2"]
}, {
  "element": "samp",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-samp-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "script",
  "link": "https://w3c.github.io/html/semantics-scripting.html#the-script-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "section",
  "link": "https://w3c.github.io/html/sections.html#the-section-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "select",
  "link": "https://w3c.github.io/html/sec-forms.html#the-select-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "small",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-small-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "source",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-source-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "span",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-span-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "strike",
  "link": "http://www.w3.org/TR/html401/present/graphics.html#edef-STRIKE",
  "specs": ["3.2", "4.01", "X1.0"]
}, {
  "element": "strong",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-strong-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "style",
  "link": "https://w3c.github.io/html/document-metadata.html#the-style-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "sub",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-sub-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "summary",
  "link": "https://w3c.github.io/html/interactive-elements.html#the-summary-element",
  "specs": ["5.1", "5.2"]
}, {
  "element": "sup",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-sup-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "table",
  "link": "https://w3c.github.io/html/tabular-data.html#the-table-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "tbody",
  "link": "https://w3c.github.io/html/tabular-data.html#the-tbody-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "td",
  "link": "https://w3c.github.io/html/tabular-data.html#the-td-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "template",
  "link": "https://w3c.github.io/html/semantics-scripting.html#the-template-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "textarea",
  "link": "https://w3c.github.io/html/sec-forms.html#the-textarea-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "tfoot",
  "link": "https://w3c.github.io/html/tabular-data.html#the-tfoot-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "th",
  "link": "https://w3c.github.io/html/tabular-data.html#the-th-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "thead",
  "link": "https://w3c.github.io/html/tabular-data.html#the-thead-element",
  "specs": ["4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "time",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-time-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "title",
  "link": "https://w3c.github.io/html/document-metadata.html#the-title-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "tr",
  "link": "https://w3c.github.io/html/tabular-data.html#the-tr-element",
  "specs": ["3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "track",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-track-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "tt",
  "link": "http://www.w3.org/TR/html401/present/graphics.html#edef-TT",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1"]
}, {
  "element": "u",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-u-element",
  "specs": ["3.2", "4.01", "X1.0", "5", "5.1", "5.2"]
}, {
  "element": "ul",
  "link": "https://w3c.github.io/html/grouping-content.html#the-ul-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "var",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-var-element",
  "specs": ["2.0", "3.2", "4.01", "X1.0", "X1.1", "5", "5.1", "5.2"]
}, {
  "element": "video",
  "link": "https://w3c.github.io/html/semantics-embedded-content.html#the-video-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "wbr",
  "link": "https://w3c.github.io/html/textlevel-semantics.html#the-wbr-element",
  "specs": ["5", "5.1", "5.2"]
}, {
  "element": "xmp",
  "link": "http://www.w3.org/TR/REC-html32#xmp",
  "specs": ["2.0", "3.2"]
}];
},{}],"../src/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _elements = _interopRequireDefault(require("./elements.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DOM = {};

_elements.default.map(function (type) {
  DOM[type.element] = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var children = arguments.length > 1 ? arguments[1] : undefined;
    var el = Object.assign(document.createElement(type.element), _objectSpread({}, props));
    el.mId = (0, _uuid.v4)();

    if (Array.isArray(children)) {
      children.flatMap(function (c) {
        return el.appendChild(c);
      });
    } else if (typeof children === "string") {
      var textNode = document.createTextNode(children);
      el.appendChild(textNode);
    } else if (_typeof(children) === "object") {
      el.appendChild(children);
    }

    return el;
  };
});

var _default = DOM;
exports.default = _default;
},{"uuid":"../node_modules/uuid/index.js","./elements.json":"../src/elements.json"}],"../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function () {
    return _pubsub.subscribe;
  }
});
Object.defineProperty(exports, "publish", {
  enumerable: true,
  get: function () {
    return _pubsub.publish;
  }
});
Object.defineProperty(exports, "DOM", {
  enumerable: true,
  get: function () {
    return _dom.default;
  }
});
exports.map = void 0;

var _pubsub = require("pubsub.js");

var _dom = _interopRequireDefault(require("./dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var map = function map(element, data) {
  if (Array.isArray(data)) {
    return data.map(element);
  } else if (_typeof(data) === "object") {
    return Object.keys(data).map(element);
  } else {
    console.error("Must supply an object or array to map data");
  }
};

exports.map = map;

function Component(data, cb) {
  var el = null;
  var render = cb;

  var update = function update(prevEl, newData) {
    var nextEl = render(newData);
    console.log(nextEl);

    if (nextEl.isEqualNode(prevEl)) {
      console.warn("no change to render");
    } else {
      prevEl.parentElement.replaceChild(nextEl, prevEl);
    }

    return nextEl;
  };

  var state = new Proxy(data, {
    set: function set(target, prop, value) {
      target[prop] = value;
      console.log(target, prop, value);
      el = update(el, target);
    }
  });
  el = render(state);
  return el;
}
},{"pubsub.js":"../node_modules/pubsub.js/pubsub.js","./dom":"../src/dom.js"}],"test.js":[function(require,module,exports) {
"use strict";

var _src = require("../src");

var main = _src.DOM.main,
    div = _src.DOM.div,
    ul = _src.DOM.ul,
    li = _src.DOM.li;
var data = {
  people: [{
    name: "Josh"
  }, {
    name: "Annie"
  }]
};

var personView = function personView(person) {
  return li({}, person.name);
};

var peopleList = function peopleList(people) {
  return ul({}, (0, _src.map)(personView, people));
};

var myMain = function myMain(data) {
  return main({
    onclick: function onclick() {
      return data.people.push({
        name: "bob"
      });
    }
  }, [div({
    className: "inner-div"
  }, peopleList(data.people))]);
};

document.body.appendChild((0, _src.Component)(data, myMain));
},{"../src":"../src/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59436" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","test.js"], null)
//# sourceMappingURL=/test.e98b79dd.js.map