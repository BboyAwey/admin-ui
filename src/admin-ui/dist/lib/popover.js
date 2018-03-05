(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("admin-ui", [], factory);
	else if(typeof exports === 'object')
		exports["admin-ui"] = factory();
	else
		root["admin-ui"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "LV4O");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+2NB":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("gCWN");
__webpack_require__("tz60");
__webpack_require__("+3lO");
__webpack_require__("YMM6");
__webpack_require__("8knk");
__webpack_require__("Gcf6");
__webpack_require__("JmWi");
module.exports = __webpack_require__("iANj").Set;


/***/ }),

/***/ "+3lO":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("abPz");
var global = __webpack_require__("YjQv");
var hide = __webpack_require__("aLzV");
var Iterators = __webpack_require__("yYxz");
var TO_STRING_TAG = __webpack_require__("hgbu")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "+MZ2":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "+SdG":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("a/OS")('keys');
var uid = __webpack_require__("GmwO");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "+VX5":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("W6Rd");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "+iDZ":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("YjQv").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "+zJ9":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("GmwO")('meta');
var isObject = __webpack_require__("8ANE");
var has = __webpack_require__("x//u");
var setDesc = __webpack_require__("GCs6").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("zyKz")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "0Lvz":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("W6Rd");
var defined = __webpack_require__("+MZ2");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "1RnF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("aLzV");


/***/ }),

/***/ "1jZ2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("YjQv");
var $export = __webpack_require__("Wdy1");
var meta = __webpack_require__("+zJ9");
var fails = __webpack_require__("zyKz");
var hide = __webpack_require__("aLzV");
var redefineAll = __webpack_require__("nJ75");
var forOf = __webpack_require__("dudK");
var anInstance = __webpack_require__("4S0F");
var isObject = __webpack_require__("8ANE");
var setToStringTag = __webpack_require__("LhDF");
var dP = __webpack_require__("GCs6").f;
var each = __webpack_require__("eAa1")(0);
var DESCRIPTORS = __webpack_require__("qs+f");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "1yV6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("FHqv");
var ITERATOR = __webpack_require__("hgbu")('iterator');
var Iterators = __webpack_require__("yYxz");
module.exports = __webpack_require__("iANj").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "30vf":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("Wdy1");
var core = __webpack_require__("iANj");
var fails = __webpack_require__("zyKz");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "3fMt":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("SWGL");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "4S0F":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "4dmN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("c8Kh");
var $export = __webpack_require__("Wdy1");
var redefine = __webpack_require__("1RnF");
var hide = __webpack_require__("aLzV");
var has = __webpack_require__("x//u");
var Iterators = __webpack_require__("yYxz");
var $iterCreate = __webpack_require__("I7B8");
var setToStringTag = __webpack_require__("LhDF");
var getPrototypeOf = __webpack_require__("VD8v");
var ITERATOR = __webpack_require__("hgbu")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "8ANE":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8CCO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getElementSize;
/* harmony export (immutable) */ __webpack_exports__["b"] = getElementPagePos;
/* unused harmony export getWindowSize */
/* unused harmony export isFirefox */
/* unused harmony export mousewheel */
/* unused harmony export addClass */
/* unused harmony export removeClass */
/* unused harmony export hasClass */
/* harmony export (immutable) */ __webpack_exports__["c"] = isAncestor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__("AP3u");


function getSize(el) {
  // let computed = window.getComputedStyle(el)
  // let rect = el.getBoundingClientRect()
  // return {
  //   width: el.offsetWidth || rect.width || parseInt(computed.width) || 0,
  //   height: el.offsetHeight || rect.height || parseInt(computed.height) || 0
  // }
  return {
    width: el.offsetWidth || 0,
    height: el.offsetHeight || 0
  };
}

function getElementSize(el, isFragment) {
  var temp = getSize(el);
  if (temp.width || temp.height) return temp;

  // clone the el
  var copy = el.cloneNode(true);
  // ste some style to minimize the influence to the document
  // if (isFragment) copy.setAttribute('style', 'visibility:hidden !important; display:block !important;')
  // else copy.setAttribute('style', 'visibility:hidden !important;')
  copy.style.visibility = 'hidden';
  copy.style.display = 'block';
  copy.style.position = 'absolute';
  copy.style.top = '-9999999px';
  copy.style.left = '-9999999px';

  var res = null;
  // insert it to document
  // if (isFragment) document.body.appendChild(copy)
  // else el.parentNode.insertBefore(copy, el)
  document.body.appendChild(copy);
  res = getSize(copy);

  // remove it
  // if (isFragment) document.body.removeChild(copy)
  // else el.parentNode.removeChild(copy)
  document.body.removeChild(copy);
  return res;
}

function getElementPagePos(el) {
  function getLeft(el) {
    var actualLeft = el.offsetLeft;
    var current = el.offsetParent;

    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return actualLeft;
  }

  function getTop(el) {
    var actualTop = el.offsetTop;
    var current = el.offsetParent;

    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }

    return actualTop;
  }

  return {
    left: getLeft(el),
    top: getTop(el)
  };
}

function getWindowSize() {
  // 获取窗口宽度
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  } else if (document.body.clientWidth) {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  }
}

var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
function mousewheel(action, element, handler) {
  if (element && element[action + 'EventListener']) {
    element[action + 'EventListener'](isFirefox ? 'DOMMouseScroll' : 'mousewheel', handler, { passive: true });
  }
}

function getOriginClasses(el) {
  var originClasses = [];
  el.className.split(' ').forEach(function (cl) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* isEmptyString */])(cl)) originClasses.push(cl);
  });
  return originClasses;
}
function addClass(el, className) {
  if (el.className.indexOf(className) === -1) {
    var originClasses = getOriginClasses(el);
    originClasses.push(className);
    el.className = originClasses.join(' ');
  }
}

function removeClass(el, className) {
  if (el.className.indexOf(className) !== -1) {
    var originClasses = getOriginClasses(el);
    var temp = [];
    originClasses.forEach(function (cl) {
      if (cl !== className) temp.push(cl);
    });
    el.className = temp.join(' ');
  }
}

function hasClass(el, className) {
  return getOriginClasses(el).indexOf(className.trim()) !== -1;
}

function isAncestor(el, ancestor) {
  var parent = el;
  if (parent === ancestor) return true;else if (el.parentNode) return isAncestor(el.parentNode, ancestor);else return false;
}

/***/ }),

/***/ "8MO0":
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__("dudK");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ "8knk":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__("Wdy1");

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__("9h1I")('Set') });


/***/ }),

/***/ "9MbE":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("8ANE");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "9h1I":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__("FHqv");
var from = __webpack_require__("8MO0");
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),

/***/ "A1Hb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__("Wdy1");
var aFunction = __webpack_require__("SWGL");
var ctx = __webpack_require__("3fMt");
var forOf = __webpack_require__("dudK");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),

/***/ "AP3u":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export deepClone */
/* harmony export (immutable) */ __webpack_exports__["b"] = isEmptyString;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return namespace; });
/* unused harmony export upload */
/* unused harmony export getDataType */
/* unused harmony export rgbToHex */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__("fZjL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__("mvHQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);



function deepClone(obj) {
  if (!(obj instanceof Array || obj instanceof Object)) throw new Error('can only deepCopy Array or Object');
  return JSON.parse(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(obj));
}

function isEmptyString(str) {
  return str === '' || /^\s+$/g.test(str);
}

if (!window.adminUiNameSpace) window.adminUiNameSpace = {};
var namespace = {
  set: function set(key, value) {
    window.adminUiNameSpace[key] = value;
    return window.adminUiNameSpace[key];
  },
  get: function get(key) {
    return window.adminUiNameSpace[key];
  },
  remove: function remove(key) {
    return delete window.adminUiNameSpace[key];
  }
};

function getError(action, option, xhr) {
  var msg = void 0;
  if (xhr.response) {
    msg = xhr.status + ' ' + (xhr.response.error || xhr.response);
  } else if (xhr.responseText) {
    msg = xhr.status + ' ' + xhr.responseText;
  } else {
    msg = 'fail to post ' + action + ' ' + xhr.status;
  }

  var err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  var text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function upload(option) {
  // copy from element
  // ### option
  // * option.action // submit url
  // * option.data // submit data
  // * option.withCredentials // indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies or authorization headers
  // * option.headers // change or set headers

  // ### file
  // * option.file
  // * option.filename

  // ### events
  // * option.onProgress(e)
  // * option.onError(e)
  // * option.onSuccess()

  if (typeof window.XMLHttpRequest === 'undefined') {
    return;
  }

  var xhr = new window.XMLHttpRequest();
  var action = option.action;

  if (xhr.upload) {
    if (option.onProgress) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        option.onProgress(e, option.index);
      };
    }
  }

  var formData = new window.FormData();

  if (option.data) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(option.data).map(function (key) {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    if (option.onError) option.onError(e, option.index);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError ? option.onError(getError(action, option, xhr), option.index) : false;
    }
    if (option.onSuccess) option.onSuccess(getBody(xhr), option.index);
  };

  xhr.open(option.method || 'post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  var headers = option.headers || {};

  for (var item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
function getDataType(o) {
  // Author: yuhaijun
  // email: yuhaijun@rongcapital.cn
  // get data type
  var regStr = /[^, ]+/g;
  var type = {};
  'Boolean Number String Function Array Date RegExp Object Error'.replace(regStr, function (name) {
    type['[object ' + name + ']'] = name.toLowerCase();
  });
  return type[Object.prototype.toString.call(o)];
}

function rgbToHex(color) {
  var rgb = color.split(',');
  var r = parseInt(rgb[0].split('(')[1]);
  var g = parseInt(rgb[1]);
  var b = parseInt(rgb[2].split(')')[0]);
  var hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}

/***/ }),

/***/ "Aq0r":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "B5V0":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "DP5d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_popover_vue__ = __webpack_require__("c+qZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_7b08a948_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_popover_vue__ = __webpack_require__("Md8W");
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("fLzL")
}
var normalizeComponent = __webpack_require__("XAIM")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_popover_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_7b08a948_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_popover_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\admin-ui\\src\\components\\popover\\src\\popover.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b08a948", Component.options)
  } else {
    hotAPI.reload("data-v-7b08a948", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "DvwR":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("x//u");
var toIObject = __webpack_require__("ksFB");
var arrayIndexOf = __webpack_require__("PbQV")(false);
var IE_PROTO = __webpack_require__("+SdG")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "EFoD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("YjQv");
var core = __webpack_require__("iANj");
var dP = __webpack_require__("GCs6");
var DESCRIPTORS = __webpack_require__("qs+f");
var SPECIES = __webpack_require__("hgbu")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "FHqv":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("NZra");
var TAG = __webpack_require__("hgbu")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "FKWp":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("8ANE");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "GCs6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("FKWp");
var IE8_DOM_DEFINE = __webpack_require__("LocR");
var toPrimitive = __webpack_require__("9MbE");
var dP = Object.defineProperty;

exports.f = __webpack_require__("qs+f") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "Gcf6":
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__("c5AH")('Set');


/***/ }),

/***/ "GhAV":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("W6Rd");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "GmwO":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "I7B8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("NZ8V");
var descriptor = __webpack_require__("YTz9");
var setToStringTag = __webpack_require__("LhDF");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("aLzV")(IteratorPrototype, __webpack_require__("hgbu")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "JmWi":
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__("A1Hb")('Set');


/***/ }),

/***/ "LV4O":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_popover_vue__ = __webpack_require__("DP5d");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__src_popover_vue__["a"]; });


/***/ }),

/***/ "LhDF":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("GCs6").f;
var has = __webpack_require__("x//u");
var TAG = __webpack_require__("hgbu")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "LocR":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("qs+f") && !__webpack_require__("zyKz")(function () {
  return Object.defineProperty(__webpack_require__("PY1i")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "Md8W":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "pop",
      staticClass:
        "au-popover au-theme-border-radius--normal au-theme-box-shadow--level-2",
      class: { "au-popover-plain au-theme-border-color--base-8": _vm.plain },
      attrs: { tabindex: _vm._uid }
    },
    [
      _vm._t("target"),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "content",
          class: {
            "au-popover-content": true,
            "au-theme-border-radius--normal": true,
            "au-theme-background-color--base-2": !_vm.plain,
            "au-theme-font-color--base-12": !_vm.plain,
            "au-theme-background-color--base-12": _vm.plain,
            "au-theme-border-color--base-8": _vm.plain,
            "au-theme-font-color--base-3": _vm.plain
          }
        },
        [_vm._t("content")],
        2
      ),
      _vm._v(" "),
      _c("span", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.triangle,
            expression: "triangle"
          }
        ],
        class: ((_obj = {
          "au-popover-triangle": true,
          "au-theme-background-color--base-2": !_vm.plain,
          "au-theme-background-color--base-12": _vm.plain,
          "au-popover-plain-triangle au-theme-border-color--base-8": _vm.plain
        }),
        (_obj[_vm.localPlacement.split(/\s+/).join("-")] = true),
        _obj)
      })
    ],
    2
  )
  var _obj
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-7b08a948", esExports)
  }
}

/***/ }),

/***/ "NU0k":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("NZra");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "NZ8V":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("FKWp");
var dPs = __webpack_require__("r3+g");
var enumBugKeys = __webpack_require__("B5V0");
var IE_PROTO = __webpack_require__("+SdG")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("PY1i")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("+iDZ").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "NZra":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "PY1i":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("8ANE");
var document = __webpack_require__("YjQv").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "PbQV":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("ksFB");
var toLength = __webpack_require__("GhAV");
var toAbsoluteIndex = __webpack_require__("+VX5");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "SWGL":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "VD8v":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("x//u");
var toObject = __webpack_require__("wXdB");
var IE_PROTO = __webpack_require__("+SdG")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "W6Rd":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "Wdy1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("YjQv");
var core = __webpack_require__("iANj");
var ctx = __webpack_require__("3fMt");
var hide = __webpack_require__("aLzV");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "XAIM":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "YMM6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("eaCm");
var validate = __webpack_require__("fTPD");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__("1jZ2")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "YTz9":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "YjQv":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "Zbun":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("iANj");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "ZhOs":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("rZAI");
module.exports = __webpack_require__("iANj").Object.keys;


/***/ }),

/***/ "a/OS":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("YjQv");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "aLzV":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("GCs6");
var createDesc = __webpack_require__("YTz9");
module.exports = __webpack_require__("qs+f") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "abPz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("Aq0r");
var step = __webpack_require__("beh1");
var Iterators = __webpack_require__("yYxz");
var toIObject = __webpack_require__("ksFB");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("4dmN")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "beh1":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "c+qZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set__ = __webpack_require__("lHA8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_dom__ = __webpack_require__("8CCO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers_utils__ = __webpack_require__("AP3u");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'au-popover',
  props: {
    trigger: String,
    triangle: {
      type: Boolean,
      default: true
    },
    plain: Boolean,
    placement: {
      type: String,
      default: 'top center'
    },
    disabled: Boolean,
    x: [String, Number],
    y: [String, Number],
    xFix: {
      type: [String, Number],
      default: '0px'
    },
    yFix: {
      type: [String, Number],
      default: '0px'
    },
    hideOnBlur: Boolean
  },
  data: function data() {
    return {
      display: false,
      originPopSize: {},
      localPlacement: '',
      rootIndex: 0
    };
  },
  mounted: function mounted() {
    this.reconstruct();
    this.addEvents();
    // this.calPos()
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('click', this.handleWindowClick, true);
    // let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    // if (MutationObserver) {
    //   this.observer = new MutationObserver((mutations) => {
    //     console.log(mutations)
    //     this.calPos()
    //   })
    //   let config = { attributes: true, childList: true, subtree: true }
    //   this.observer.observe(this.$refs.pop, config)
    // }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('click', this.handleWindowClick, true);
    this.hide();
    // if (this.observe) this.observer.disconnect()
  },

  watch: {
    trigger: function trigger() {
      this.removeEvents();
      this.addEvents();
    },
    display: function display(v) {
      if (v) this.$emit('show');else this.$emit('hide');
    },
    disabled: function disabled(v) {
      // this.reconstruct()
    },
    placement: function placement(v) {
      this.calPos();
    }
  },
  methods: {
    getTarget: function getTarget() {
      var target = this.$slots.target[0].elm;
      var id = target.getAttribute('data-au-popover');
      if (id) {
        // nested popover
        target = __WEBPACK_IMPORTED_MODULE_2__helpers_utils__["a" /* namespace */].get('au-popover-' + id).$slots.target[0].elm;
      }
      return target;
    },
    reconstruct: function reconstruct() {
      // if (this.disabled) return
      var target = this.getTarget();
      var pop = this.$refs.pop;
      var id = 'au-popover-' + this._uid;

      // register popover on root
      pop.setAttribute('data-au-popover', id);
      __WEBPACK_IMPORTED_MODULE_2__helpers_utils__["a" /* namespace */].set('au-popover-' + id, this);

      if (target.parentNode === pop) {
        pop.parentNode.insertBefore(target, pop);
        pop.parentNode.removeChild(pop);
      }
      // if (pop.parentNode !== document.body) document.body.appendChild(pop)
    },
    addEvents: function addEvents() {
      var target = this.getTarget();
      if (this.trigger === 'click') {
        target.addEventListener('click', this.handleClick);
      } else {
        target.addEventListener('mouseenter', this.handleMouseover);
        target.addEventListener('mouseleave', this.handleMouseout);
      }
    },
    removeEvents: function removeEvents() {
      var target = this.getTarget();
      target.removeEventListener('click', this.handleClick);
      target.removeEventListener('mouseenter', this.handleMouseover);
      target.removeEventListener('mouseleave', this.handleMouseout);
    },
    handleClick: function handleClick() {
      if (this.trigger === 'click') {
        this.display ? this.hide() : this.show();
      }
    },

    // handleBlur (e) { // pop blur
    //   if (this.trigger === 'click' && this.display && this.hideOnBlur) this.hide()
    // },
    handleMouseover: function handleMouseover() {
      this.show();
    },
    handleMouseout: function handleMouseout() {
      if (this.trigger !== 'click' && this.display) this.hide();
    },
    show: function show() {
      if (this.disabled) return;
      this.calPos();
      // this.originPopSize = {
      //   width: window.getComputedStyle(this.$refs.pop).width,
      //   height: window.getComputedStyle(this.$refs.pop).height
      // }
      if (!this.$refs.pop.parentNode) document.body.appendChild(this.$refs.pop);
      this.$refs.pop.focus();
      this.display = true;
      if (!this.$root._auPopovers) this.$root._auPopovers = {};
      this.$root._auPopovers[this._uid] = this;
      this.rootIndex = this.$root._auPopovers.length - 1;
      // setInterval(this.calPos.bind(this), 500)
    },
    hide: function hide() {
      try {
        this.$refs.pop.parentNode.removeChild(this.$refs.pop);
      } catch (e) {}
      this.display = false;
      if (this.$root._auPopovers && this.$root._auPopovers[this._uid]) delete this.$root._auPopovers[this._uid];
      // clearInterval(this.calPos.bind(this))
    },
    calPos: function calPos() {
      var pop = this.$refs.pop;
      var target = this.getTarget();
      var content = this.$refs.content;
      if (!target) return;

      // let popElmSize = getElementSize(this.$slots.content[0].elm)
      // this.$refs.pop.style.width = popElmSize.width + 'px'
      // this.$refs.pop.style.height = popElmSize.height + 'px'

      var keys = this.placement.split(/\s+/);
      var xes = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set___default.a(['top', 'bottom', 'left', 'right']);
      var ys = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_set___default.a(['left', 'center', 'right', 'top', 'middle', 'bottom']);
      if (keys.length !== 2 || !xes.has(keys[0]) || !ys.has(keys[1])) {
        keys = ['top', 'center'];
      }
      this.localPlacement = keys.join(' ');

      if (this.x && this.y) {
        pop.style.left = this.x;
        pop.style.top = this.y;
        return;
      }

      var targetSize = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_dom__["a" /* getElementSize */])(target);
      var targetPos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_dom__["b" /* getElementPagePos */])(target);
      var popSize = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_dom__["a" /* getElementSize */])(content);
      var windowSize = {
        width: document.body.clientWidth,
        height: document.body.clientHeight

        // handle screen overflow
      };var targetRect = target.getBoundingClientRect();
      if (targetRect.top < popSize.height && keys[0] === 'top') keys[0] = 'bottom';
      if (windowSize.height - targetRect.bottom < popSize.height && keys[0] === 'bottom') keys[0] = 'top';
      if (targetRect.left < popSize.width && keys[0] === 'left') keys[0] = 'rigth';
      if (windowSize.width - targetRect.right < popSize.width && keys[0] === 'right') keys[0] = 'left';

      if (keys[0] === 'left' || keys[0] === 'right') {
        if (keys[1] !== 'top') {
          if (targetRect.top < popSize.height / (keys[1] === 'middle' ? 2 : 1) - targetSize.height) keys[1] = 'top';
        }
        if (keys[1] !== 'bottom') {
          if (windowSize.height - targetRect.bottom < popSize.height / (keys[1] === 'middle' ? 2 : 1) - targetSize.height) keys[1] = 'bottom';
        }
      }
      if (keys[0] === 'top' || keys[0] === 'bottom') {
        if (keys[1] !== 'left') {
          if (targetRect.left < popSize.width / (keys[1] === 'center' ? 2 : 1) - targetSize.width) keys[1] = 'left';
        }
        if (keys[1] !== 'right') {
          if (windowSize.width - targetRect.right < popSize.widht / (keys[1] === 'middle' ? 2 : 1) - targetSize.width) keys[1] = 'right';
        }
      }

      this.localPlacement = keys.join(' ');

      // fix the size bug witch caused by the wordwrap
      // this.$refs.pop.style.width = popSize.width + 'px'
      // this.$refs.pop.style.height = popSize.height + 'px'

      var offset = 10;
      var vertical = {
        x: {
          left: targetPos.left + parseInt(this.xFix),
          center: targetPos.left + targetSize.width / 2 - popSize.width / 2 + parseInt(this.xFix),
          right: targetPos.left + targetSize.width - popSize.width + parseInt(this.xFix)
        },
        y: {
          top: targetPos.top - popSize.height - offset + parseInt(this.yFix),
          bottom: targetPos.top + targetSize.height + offset + parseInt(this.yFix) // do not kown why should add 10 but it works
        }
      };
      var horizontal = {
        x: {
          left: targetPos.left - offset - popSize.width + parseInt(this.xFix),
          right: targetPos.left + targetSize.width + offset + parseInt(this.xFix)
        },
        y: {
          top: targetPos.top + parseInt(this.yFix),
          middle: targetPos.top + targetSize.height / 2 - popSize.height / 2 + parseInt(this.yFix),
          bottom: targetPos.top + targetSize.height - popSize.height + 11 + parseInt(this.yFix) // do not kown why should add 11 but it works
        }
      };
      var res = {};
      if (keys[0] === 'top' || keys[0] === 'bottom') {
        res = {
          x: vertical.x[keys[1]],
          y: vertical.y[keys[0]]
        };
      } else if (keys[0] === 'left' || keys[0] === 'right') {
        res = {
          x: horizontal.x[keys[0]],
          y: horizontal.y[keys[1]]
        };
      }
      pop.style.left = this.x || res.x + 'px';
      pop.style.top = this.y || res.y + 'px';
    },
    handleWindowClick: function handleWindowClick(e) {
      if (this.trigger === 'click' && this.display && this.hideOnBlur && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_dom__["c" /* isAncestor */])(e.target, this.$el) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__helpers_dom__["c" /* isAncestor */])(e.target, this.getTarget())) this.hide();
    },
    handleWindowResize: function handleWindowResize() {
      if (this.display) this.calPos();
    }
  }
});

/***/ }),

/***/ "c5AH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__("Wdy1");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),

/***/ "c8Kh":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "dudK":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("3fMt");
var call = __webpack_require__("tn1D");
var isArrayIter = __webpack_require__("yuYM");
var anObject = __webpack_require__("FKWp");
var toLength = __webpack_require__("GhAV");
var getIterFn = __webpack_require__("1yV6");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "eAa1":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("3fMt");
var IObject = __webpack_require__("wiaE");
var toObject = __webpack_require__("wXdB");
var toLength = __webpack_require__("GhAV");
var asc = __webpack_require__("s2sY");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "eaCm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__("GCs6").f;
var create = __webpack_require__("NZ8V");
var redefineAll = __webpack_require__("nJ75");
var ctx = __webpack_require__("3fMt");
var anInstance = __webpack_require__("4S0F");
var forOf = __webpack_require__("dudK");
var $iterDefine = __webpack_require__("4dmN");
var step = __webpack_require__("beh1");
var setSpecies = __webpack_require__("EFoD");
var DESCRIPTORS = __webpack_require__("qs+f");
var fastKey = __webpack_require__("+zJ9").fastKey;
var validate = __webpack_require__("fTPD");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "fLzL":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "fTPD":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("8ANE");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "fZjL":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("ZhOs"), __esModule: true };

/***/ }),

/***/ "gCWN":
/***/ (function(module, exports) {



/***/ }),

/***/ "hgbu":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("a/OS")('wks');
var uid = __webpack_require__("GmwO");
var Symbol = __webpack_require__("YjQv").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "iANj":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "jgO3":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("8ANE");
var isArray = __webpack_require__("NU0k");
var SPECIES = __webpack_require__("hgbu")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "ksFB":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("wiaE");
var defined = __webpack_require__("+MZ2");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "lHA8":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("+2NB"), __esModule: true };

/***/ }),

/***/ "mvHQ":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("Zbun"), __esModule: true };

/***/ }),

/***/ "nJ75":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("aLzV");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "pEGt":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("DvwR");
var enumBugKeys = __webpack_require__("B5V0");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "qs+f":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("zyKz")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "r3+g":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("GCs6");
var anObject = __webpack_require__("FKWp");
var getKeys = __webpack_require__("pEGt");

module.exports = __webpack_require__("qs+f") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "rZAI":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("wXdB");
var $keys = __webpack_require__("pEGt");

__webpack_require__("30vf")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "s2sY":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("jgO3");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "tn1D":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("FKWp");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "tz60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("0Lvz")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("4dmN")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "wXdB":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("+MZ2");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "wiaE":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("NZra");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "x//u":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "yYxz":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "yuYM":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("yYxz");
var ITERATOR = __webpack_require__("hgbu")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "zyKz":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ })

/******/ });
});