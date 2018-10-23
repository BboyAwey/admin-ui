(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("admin-ui-breadcrumb-button-cascading-checkbox-collapse-datepicker-frame-grid-icon-input-json-schema-loading-menu-message-message-box-modal-paginator-panel-popover-previewer-radio-rangepicker-scroller-select-switch-table", [], factory);
	else if(typeof exports === 'object')
		exports["admin-ui-breadcrumb-button-cascading-checkbox-collapse-datepicker-frame-grid-icon-input-json-schema-loading-menu-message-message-box-modal-paginator-panel-popover-previewer-radio-rangepicker-scroller-select-switch-table"] = factory();
	else
		root["admin-ui-breadcrumb-button-cascading-checkbox-collapse-datepicker-frame-grid-icon-input-json-schema-loading-menu-message-message-box-modal-paginator-panel-popover-previewer-radio-rangepicker-scroller-select-switch-table"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "Fw+Z");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00yw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (str) {
  return str === '' || /^\s+$/g.test(str);
});

/***/ }),

/***/ "8dr3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__ = __webpack_require__("ytPn");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f85d6f0_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__ = __webpack_require__("DLjd");
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("L4eA")
}
var normalizeComponent = __webpack_require__("VU/8")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_table_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f85d6f0_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_table_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin-ui/src/components/table/src/table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f85d6f0", Component.options)
  } else {
    hotAPI.reload("data-v-7f85d6f0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "9tGM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeClass;
/* unused harmony export hasClass */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_is_empty_string__ = __webpack_require__("00yw");


function getOriginClasses(el) {
  var originClasses = [];
  el.className.split(' ').forEach(function (cl) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils_is_empty_string__["a" /* default */])(cl)) originClasses.push(cl);
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

/***/ }),

/***/ "DLjd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "table",
    {
      ref: "table",
      staticClass:
        "\n  au-table au-theme-border-color--base-9\n  au-theme-background-color--base-12",
      class: { "au-bordered": _vm.bordered }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7f85d6f0", esExports)
  }
}

/***/ }),

/***/ "FZ+f":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "Fw+Z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_table_vue__ = __webpack_require__("8dr3");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__src_table_vue__["a"]; });


/***/ }),

/***/ "L4eA":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ccbF");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("272bc3c0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f85d6f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f85d6f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "VU/8":
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

/***/ "ccbF":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.au-table {\n  width: 100%;\n}\n.au-table > tr:not(:last-child),\n  .au-table tbody > tr,\n  .au-table tfoot > tr:not(:last-child),\n  .au-table thead > tr {\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n}\n.au-table th, .au-table td {\n    padding: 12px;\n    text-align: left;\n}\n.au-table th {\n    font-size: 14px;\n}\n.au-table td {\n    font-size: 14px;\n}\n.au-table tfoot td:only-child {\n    font-size: 12px;\n    text-align: right;\n}\n.au-bordered {\n  border-width: 1px;\n  border-style: solid;\n}\n.au-bordered th:not(:last-child), .au-bordered td:not(:last-child) {\n    border-right-width: 1px;\n    border-right-style: solid;\n}\n.au-bordered thead > tr:last-child, .au-bordered tbody > tr:last-child {\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n}\n", "", {"version":3,"sources":["/Users/awey/Documents/projects/admin-ui/src/admin-ui/src/components/table/src/table.vue"],"names":[],"mappings":";AACA;EACE,YAAY;CACb;AACD;;;;IAII,yBAAyB;IACzB,2BAA2B;CAC9B;AACD;IACI,cAAc;IACd,iBAAiB;CACpB;AACD;IACI,gBAAgB;CACnB;AACD;IACI,gBAAgB;CACnB;AACD;IACI,gBAAgB;IAChB,kBAAkB;CACrB;AACD;EACE,kBAAkB;EAClB,oBAAoB;CACrB;AACD;IACI,wBAAwB;IACxB,0BAA0B;CAC7B;AACD;IACI,yBAAyB;IACzB,2BAA2B;CAC9B","file":"table.vue","sourcesContent":["\n.au-table {\n  width: 100%;\n}\n.au-table > tr:not(:last-child),\n  .au-table tbody > tr,\n  .au-table tfoot > tr:not(:last-child),\n  .au-table thead > tr {\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n}\n.au-table th, .au-table td {\n    padding: 12px;\n    text-align: left;\n}\n.au-table th {\n    font-size: 14px;\n}\n.au-table td {\n    font-size: 14px;\n}\n.au-table tfoot td:only-child {\n    font-size: 12px;\n    text-align: right;\n}\n.au-bordered {\n  border-width: 1px;\n  border-style: solid;\n}\n.au-bordered th:not(:last-child), .au-bordered td:not(:last-child) {\n    border-right-width: 1px;\n    border-right-style: solid;\n}\n.au-bordered thead > tr:last-child, .au-bordered tbody > tr:last-child {\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "rjj0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__("tTVk");
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "tTVk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "ytPn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__ = __webpack_require__("9tGM");
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
  name: 'au-table',
  props: {
    striped: Boolean,
    bordered: Boolean
  },
  mounted: function mounted() {
    this.handleAllStyle();
    this.handleStripe();
  },
  updated: function updated() {
    this.handleAllStyle();
  },

  watch: {
    striped: function striped() {
      this.handleStripe();
    }
  },
  methods: {
    handleAllStyle: function handleAllStyle() {
      var table = this.$refs.table;

      var thead = table.querySelectorAll('thead');
      var tbody = table.querySelectorAll('tbody');
      var tfoot = table.querySelectorAll('tfoot');

      // console.log(thead)
      var allTr = table.querySelectorAll('tr');
      var allTd = table.querySelectorAll('td');
      var allTh = table.querySelectorAll('th');
      // let allTd = table.querySelectorAll('td')

      // let theadTr = thead.querySelectorAll('tr')
      // let tbodyTr = tbody.querySelectorAll('tr')
      // let tfootTr = tfoot.querySelectorAll('tr')
      for (var i = 0; i < allTr.length; i++) {
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(allTr[i], 'au-theme-border-color--base-9');
      }
      for (var _i = 0; _i < allTh.length; _i++) {
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(allTh[_i], 'au-theme-color--base-3');
      }
      for (var _i2 = 0; _i2 < allTd.length; _i2++) {
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(allTd[_i2], 'au-theme-color--base-3 au-theme-border-color--base-9');
      }

      for (var _i3 = 0; _i3 < tfoot.length; _i3++) {
        var tds = tfoot[_i3].querySelectorAll('td');
        for (var _i4 = 0; _i4 < tds.length; _i4++) {
          Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(tds[_i4], 'au-theme-color--base-7');
        }
      }

      for (var _i5 = 0; _i5 < thead.length; _i5++) {
        var ths = thead[_i5].querySelectorAll('th');
        for (var _i6 = 0; _i6 < ths.length; _i6++) {
          Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(ths[_i6], 'au-theme-color--base-7 au-theme-border-color--base-9');
        }
      }

      if (tbody.length) {
        for (var _i7 = 0; _i7 < tbody.length; _i7++) {
          var trs = table.querySelectorAll('tbody > tr');
          for (var _i8 = 0; _i8 < trs.length; _i8++) {
            Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(trs[_i8], 'au-theme-hover-background-color--primary-bottom');
          }
          if (this.striped) {
            for (var _i9 = 0; _i9 < trs.length; _i9++) {
              if (_i9 % 2 === 0) Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(trs[_i9], 'au-theme-background-color--base-11');
            }
          }
        }
      } else {
        for (var _i10 = 0; _i10 < allTr.length; _i10++) {
          if (allTr[_i10].parentNode === table) Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(allTr[_i10], 'au-theme-hover-background-color--primary-bottom');
        }
        if (this.striped) {
          for (var _i11 = 0; _i11 < allTr.length; _i11++) {
            if (_i11 % 2 === 0) Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(allTr[_i11], 'au-theme-background-color--base-11');
          }
        }
      }

      if (thead.length) {
        for (var _i12 = 0; _i12 < thead.length; _i12++) {
          Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(thead[_i12].querySelector('tr:last-child'), 'au-theme-border-color--base-9-important');
        }
      }
      if (tbody.length && tfoot.length) {
        for (var _i13 = 0; _i13 < tbody.length; _i13++) {
          Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(tbody[_i13].querySelector('tr:last-child'), 'au-theme-border-color--base-9-important');
        }
      }
    },
    handleStripe: function handleStripe() {
      var table = this.$refs.table;
      var tbody = table.querySelectorAll('tbody');
      if (tbody.length) {
        for (var i = 0; i < tbody.length; i++) {
          var trs = table.querySelectorAll('tbody > tr');
          // clean classes
          for (var _i14 = 0; _i14 < trs.length; _i14++) {
            Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["b" /* removeClass */])(trs[_i14], 'au-theme-background-color--base-11');
          }
          if (this.striped) {
            for (var _i15 = 0; _i15 < trs.length; _i15++) {
              if (_i15 % 2 === 0) Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(trs[_i15], 'au-theme-background-color--base-11');
            }
          } else {
            for (var _i16 = 0; _i16 < trs.length; _i16++) {
              if (_i16 % 2 === 0) Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["b" /* removeClass */])(trs[_i16], 'au-theme-background-color--base-11');
            }
          }
        }
      } else {
        var allTr = table.querySelectorAll('tr');
        for (var _i17 = 0; _i17 < allTr.length; _i17++) {
          if (allTr[_i17].parentNode === table) {
            Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["b" /* removeClass */])(allTr[_i17], 'au-theme-background-color--base-11');
            if (this.striped) {
              if (_i17 % 2 === 0) Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["a" /* addClass */])(allTr[_i17], 'au-theme-background-color--base-11');
            } else {
              if (_i17 % 2 === 0) Object(__WEBPACK_IMPORTED_MODULE_0__helpers_dom_class_js__["b" /* removeClass */])(allTr[_i17], 'au-theme-background-color--base-11');
            }
          }
        }
      }
    }
  }
});

/***/ })

/******/ });
});