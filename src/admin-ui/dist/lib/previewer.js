(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("admin-ui", [], factory);
	else if(typeof exports === 'object')
		exports["admin-ui"] = factory();
	else
		root["admin-ui"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = "0AN5");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0AN5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_previewer_vue__ = __webpack_require__("8ean");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__src_previewer_vue__["a"]; });


/***/ }),

/***/ "8ean":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_previewer_vue__ = __webpack_require__("tjUJ");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_18c9da96_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_previewer_vue__ = __webpack_require__("pbpN");
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("Lu3+")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_previewer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_18c9da96_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_previewer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin-ui/src/components/previewer/src/previewer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18c9da96", Component.options)
  } else {
    hotAPI.reload("data-v-18c9da96", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "Dk1r":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", {
    staticClass: "au-icon",
    class: _vm.custom || "fa fa-" + _vm.type,
    style: {
      fontSize: _vm.size,
      color: _vm.color
    },
    attrs: { "aria-hidden": "true" },
    on: {
      click: function($event) {
        _vm.$emit("click")
      }
    }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a8e77880", esExports)
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

/***/ "I+QW":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.au-icon {\n  text-align: center;\n}\n", "", {"version":3,"sources":["/Users/awey/Documents/projects/admin-ui/src/admin-ui/src/components/icon/src/icon.vue"],"names":[],"mappings":";AACA;EACE,mBAAmB;CACpB","file":"icon.vue","sourcesContent":["\n.au-icon {\n  text-align: center;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "Lu3+":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("vRSK");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("8ea086f8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-18c9da96\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./previewer.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-18c9da96\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./previewer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "RB7c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_icon_vue__ = __webpack_require__("tzU+");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a8e77880_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_icon_vue__ = __webpack_require__("Dk1r");
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("u8Bm")
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_icon_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a8e77880_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_icon_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/admin-ui/src/components/icon/src/icon.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8e77880", Component.options)
  } else {
    hotAPI.reload("data-v-a8e77880", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


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

/***/ "dJt8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_icon_vue__ = __webpack_require__("RB7c");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_icon_vue__["a"]; });


/***/ }),

/***/ "pbpN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.localDisplay,
          expression: "localDisplay"
        }
      ],
      ref: "previewer",
      staticClass: "au-previewer au-theme-before-background-color--base-0"
    },
    [
      _c(
        "div",
        {
          ref: "header",
          staticClass:
            "au-previewer-header au-theme-color--base-12 au-theme-background-color--base-0"
        },
        [
          _c("span", { staticClass: "au-previewer-name" }, [
            _vm._v(_vm._s(_vm.currentImgAlt))
          ]),
          _vm._v(" "),
          _c("icon", {
            staticClass: "au-previewer-close-icon",
            attrs: { type: "times" },
            nativeOn: {
              click: function($event) {
                return _vm.close($event)
              }
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "content",
          staticClass: "au-previewer-content",
          on: {
            click: function($event) {
              $event.stopPropagation()
              return _vm.close($event)
            }
          }
        },
        [
          _c("span", {
            staticClass:
              "au-previewer-prev au-theme-before-background-color--base-0 au-theme-after-border-color--base-12",
            class: { "au-previewer-disabled au-theme-": !_vm.allow("prev") },
            style: {
              cursor: _vm.allow("prev") ? "pointer" : "not-allowed"
            },
            on: {
              click: function($event) {
                $event.stopPropagation()
                return _vm.prev($event)
              }
            }
          }),
          _vm._v(" "),
          _c("i", { staticClass: "au-previewer-va-helper" }),
          _vm._v(" "),
          _vm._l(_vm.images, function(img, i) {
            return _c("img", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: i == _vm.localCurrent,
                  expression: "i == localCurrent"
                }
              ],
              key: i,
              attrs: { src: img.src, alt: img.alt }
            })
          }),
          _vm._v(" "),
          _c("span", {
            staticClass:
              "au-previewer-next au-theme-before-background-color--base-0 au-theme-after-border-color--base-12",
            class: { "au-previewer-disabled au-theme-": !_vm.allow("next") },
            style: {
              cursor: _vm.allow("next") ? "pointer" : "not-allowed"
            },
            on: {
              click: function($event) {
                $event.stopPropagation()
                return _vm.next($event)
              }
            }
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-18c9da96", esExports)
  }
}

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

/***/ "tjUJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icon__ = __webpack_require__("dJt8");
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
  name: 'au-previewer',
  components: { Icon: __WEBPACK_IMPORTED_MODULE_0__icon__["a" /* default */] },
  mounted: function mounted() {
    // window.document.body.appendChild(this.$refs.previewer)
  },
  data: function data() {
    return {
      localDisplay: this.visible,
      localCurrent: this.isCurrentIllegal(this.current) ? this.current : 0
    };
  },

  props: {
    images: {
      type: Array,
      required: true
    },
    visible: {
      required: true
    },
    current: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    currentImgAlt: function currentImgAlt() {
      if (this.images && this.images.length) {
        return this.images[this.localCurrent].alt;
      } else {
        return '';
      }
    }
  },
  watch: {
    visible: function visible(v) {
      this.localDisplay = v;
    },
    localDisplay: function localDisplay(v) {
      if (v) {
        document.body.appendChild(this.$refs.previewer);
        this.$emit('show', this.images[this.localCurrent]);
        window.addEventListener('keyup', this.escHandler);
      } else {
        this.$emit('hide', this.images[this.localCurrent]);
        window.removeEventListener('keyup', this.escHandler);
      }
    },
    current: function current(v) {
      this.localCurrent = v;
    },
    localCurrent: function localCurrent(v) {
      this.$emit('toggle', this.images[this.localCurrent]);
    }
  },
  methods: {
    close: function close() {
      this.localDisplay = false;
    },
    prev: function prev() {
      if (this.localCurrent > 0) --this.localCurrent;
    },
    next: function next() {
      if (this.localCurrent < this.images.length - 1) ++this.localCurrent;
    },
    isCurrentIllegal: function isCurrentIllegal(c) {
      if (!(this.images && this.images.length)) return true;
      c = Number(c);
      return c >= 0 && c <= this.images.length - 1;
    },
    allow: function allow(direc) {
      if (direc === 'prev') return this.images && this.images.length && this.localCurrent > 0;else return this.images && this.images.length && this.localCurrent < this.images.length - 1;
    },
    escHandler: function escHandler(e) {
      if (e.keyCode !== 27) return;
      this.close();
    }
  }
});

/***/ }),

/***/ "tzU+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_font_awesome_style_css__ = __webpack_require__("wzUM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_font_awesome_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_font_awesome_style_css__);
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
  name: 'au-icon',
  mounted: function mounted() {
    if (this.unifySize) this.setUnifiedWidth();
  },

  props: {
    type: String,
    custom: String,
    size: String,
    color: String,
    unifySize: Boolean
  },
  watch: {
    size: function size(v) {
      if (this.unifySize) this.$nextTick(this.setUnifiedWidth);
    },
    unifySize: function unifySize(v) {
      if (v) this.$nextTick(this.setUnifiedWidth);
    }
  },
  methods: {
    setUnifiedWidth: function setUnifiedWidth() {
      this.$el.style.width = parseInt(window.getComputedStyle(this.$el).fontSize) + 4 + 'px';
    }
  }
});

/***/ }),

/***/ "u8Bm":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("I+QW");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("rjj0").default
var update = add("1f488866", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a8e77880\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a8e77880\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "vRSK":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(true);
// imports


// module
exports.push([module.i, "\n.au-previewer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 99999;\n  width: 100%;\n  height: 100%;\n  padding-top: 56px;\n  text-align: center;\n}\n.au-previewer .au-previewer-header {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 56px;\n    padding: 0 24px;\n    line-height: 56px;\n    text-align: left;\n    font-size: 16px;\n}\n.au-previewer .au-previewer-close-icon {\n    float: right;\n    font-size: 18px;\n    height: 56px;\n    line-height: 56px;\n    cursor: pointer;\n}\n.au-previewer .au-previewer-content {\n    position: relative;\n    height: 100%;\n    width: 100%;\n    padding: 2% 0;\n    vertical-align: middle;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.au-previewer .au-previewer-va-helper {\n    height: 100%;\n    display: inline-block;\n    vertical-align: middle;\n}\n.au-previewer .au-previewer-content > img {\n    vertical-align: middle;\n    max-width: 90%;\n    max-height: 90%;\n}\n.au-previewer .au-previewer-next,\n  .au-previewer .au-previewer-prev {\n    display: inline-block;\n    position: absolute;\n    left: 0;\n    top: 50%;\n    width: 72px;\n    height: 96px;\n    overflow: hidden;\n    margin-top: -48px;\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px;\n    vertical-align: middle;\n    text-align: center;\n    cursor: pointer;\n}\n.au-previewer .au-previewer-next:before,\n  .au-previewer .au-previewer-prev:before {\n    content: '';\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n}\n.au-previewer .au-previewer-next:hover:before,\n  .au-previewer .au-previewer-prev:hover:before {\n    opacity: .3;\n}\n.au-previewer .au-previewer-next:after,\n  .au-previewer .au-previewer-prev:after {\n    content: \"\";\n    display: inline-block;\n    position: relative;\n    top: 50%;\n    left: 6px;\n    margin-top: -14px;\n    width: 28px;\n    height: 28px;\n    border-left-width: 1px;\n    border-left-style: solid;\n    border-top-width: 1px;\n    border-top-style: solid;\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg);\n}\n.au-previewer .au-previewer-next {\n    left: auto;\n    right: 0;\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n}\n.au-previewer .au-previewer-disabled:hover {\n    cursor: not-allowed;\n}\n.au-previewer .au-previewer-disabled:hover:before,\n  .au-previewer .au-previewer-disabled:hover:before {\n    opacity: .1;\n}\n.au-previewer .au-previewer-disabled:after,\n  .au-previewer .au-previewer-disabled:after {\n    opacity: .2;\n}\n.au-previewer:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: .75;\n}\n", "", {"version":3,"sources":["/Users/awey/Documents/projects/admin-ui/src/admin-ui/src/components/previewer/src/previewer.vue"],"names":[],"mappings":";AACA;EACE,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,eAAe;EACf,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,mBAAmB;CACpB;AACD;IACI,gBAAgB;IAChB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,aAAa;IACb,gBAAgB;IAChB,kBAAkB;IAClB,iBAAiB;IACjB,gBAAgB;CACnB;AACD;IACI,aAAa;IACb,gBAAgB;IAChB,aAAa;IACb,kBAAkB;IAClB,gBAAgB;CACnB;AACD;IACI,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,cAAc;IACd,uBAAuB;IACvB,0BAA0B;OACvB,uBAAuB;QACtB,sBAAsB;YAClB,kBAAkB;CAC7B;AACD;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;CAC1B;AACD;IACI,uBAAuB;IACvB,eAAe;IACf,gBAAgB;CACnB;AACD;;IAEI,sBAAsB;IACtB,mBAAmB;IACnB,QAAQ;IACR,SAAS;IACT,YAAY;IACZ,aAAa;IACb,iBAAiB;IACjB,kBAAkB;IAClB,6BAA6B;IAC7B,gCAAgC;IAChC,uBAAuB;IACvB,mBAAmB;IACnB,gBAAgB;CACnB;AACD;;IAEI,YAAY;IACZ,eAAe;IACf,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,aAAa;IACb,WAAW;CACd;AACD;;IAEI,YAAY;CACf;AACD;;IAEI,YAAY;IACZ,sBAAsB;IACtB,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,yBAAyB;IACzB,sBAAsB;IACtB,wBAAwB;IACxB,kCAAkC;YAC1B,0BAA0B;CACrC;AACD;IACI,WAAW;IACX,SAAS;IACT,kCAAkC;YAC1B,0BAA0B;CACrC;AACD;IACI,oBAAoB;CACvB;AACD;;IAEI,YAAY;CACf;AACD;;IAEI,YAAY;CACf;AACD;EACE,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,OAAO;EACP,QAAQ;EACR,YAAY;EACZ,aAAa;EACb,aAAa;CACd","file":"previewer.vue","sourcesContent":["\n.au-previewer {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 99999;\n  width: 100%;\n  height: 100%;\n  padding-top: 56px;\n  text-align: center;\n}\n.au-previewer .au-previewer-header {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 56px;\n    padding: 0 24px;\n    line-height: 56px;\n    text-align: left;\n    font-size: 16px;\n}\n.au-previewer .au-previewer-close-icon {\n    float: right;\n    font-size: 18px;\n    height: 56px;\n    line-height: 56px;\n    cursor: pointer;\n}\n.au-previewer .au-previewer-content {\n    position: relative;\n    height: 100%;\n    width: 100%;\n    padding: 2% 0;\n    vertical-align: middle;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.au-previewer .au-previewer-va-helper {\n    height: 100%;\n    display: inline-block;\n    vertical-align: middle;\n}\n.au-previewer .au-previewer-content > img {\n    vertical-align: middle;\n    max-width: 90%;\n    max-height: 90%;\n}\n.au-previewer .au-previewer-next,\n  .au-previewer .au-previewer-prev {\n    display: inline-block;\n    position: absolute;\n    left: 0;\n    top: 50%;\n    width: 72px;\n    height: 96px;\n    overflow: hidden;\n    margin-top: -48px;\n    border-top-right-radius: 4px;\n    border-bottom-right-radius: 4px;\n    vertical-align: middle;\n    text-align: center;\n    cursor: pointer;\n}\n.au-previewer .au-previewer-next:before,\n  .au-previewer .au-previewer-prev:before {\n    content: '';\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n}\n.au-previewer .au-previewer-next:hover:before,\n  .au-previewer .au-previewer-prev:hover:before {\n    opacity: .3;\n}\n.au-previewer .au-previewer-next:after,\n  .au-previewer .au-previewer-prev:after {\n    content: \"\";\n    display: inline-block;\n    position: relative;\n    top: 50%;\n    left: 6px;\n    margin-top: -14px;\n    width: 28px;\n    height: 28px;\n    border-left-width: 1px;\n    border-left-style: solid;\n    border-top-width: 1px;\n    border-top-style: solid;\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg);\n}\n.au-previewer .au-previewer-next {\n    left: auto;\n    right: 0;\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n}\n.au-previewer .au-previewer-disabled:hover {\n    cursor: not-allowed;\n}\n.au-previewer .au-previewer-disabled:hover:before,\n  .au-previewer .au-previewer-disabled:hover:before {\n    opacity: .1;\n}\n.au-previewer .au-previewer-disabled:after,\n  .au-previewer .au-previewer-disabled:after {\n    opacity: .2;\n}\n.au-previewer:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: .75;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "wzUM":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
});