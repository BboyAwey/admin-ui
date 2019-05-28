define("Breadcrumb", [], function() { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 314);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (obj) {
  if (!(obj instanceof Array || obj instanceof Object)) {
    console.warn('Admin UI@deep-clone@ can only deepCopy array or plain object');
    return {};
  } else return JSON.parse(JSON.stringify(obj));
});

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin-ui/src/components/breadcrumb/src/breadcrumb.vue?vue&type=template&id=6c0abcc0&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "au-breadcrumb au-theme-color--base-3" },
    _vm._l(_vm.localCrumbs, function(crumb, index) {
      return _c("li", { key: index, staticClass: "au-breadcrumb-item" }, [
        index
          ? _c(
              "span",
              {
                staticClass: "au-breadcrumb-separator au-theme-color--base-8",
                class: _vm.separatorClass
              },
              [_vm._v(_vm._s(_vm.separator))]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "au-breadcrumb-text",
            class: {
              "au-theme-hover-color--primary":
                index != _vm.localCrumbs.length - 1 && crumb.url,
              "au-theme-color--base-8":
                index == _vm.localCrumbs.length - 1 || !crumb.url
            },
            style: {
              cursor:
                index != _vm.localCrumbs.length - 1 && crumb.url
                  ? "pointer"
                  : "auto"
            },
            on: {
              click: function($event) {
                return _vm.handleCrumbClick(crumb, index)
              }
            }
          },
          [_vm._v("\n      " + _vm._s(crumb.text) + "\n    ")]
        )
      ])
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true


// EXTERNAL MODULE: ./src/admin-ui/src/helpers/utils/deep-clone.js
var deep_clone = __webpack_require__(177);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin-ui/src/components/breadcrumb/src/breadcrumb.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var breadcrumbvue_type_script_lang_js_ = ({
  name: 'au-breadcrumb',
  data: function data() {
    return {};
  },
  props: {
    crumbs: {
      type: Array,
      required: true // default () {
      //   return [
      //     {
      //       text: '',
      //       url: ''
      //     }
      //   ]
      // }

    },
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: String
  },
  computed: {
    localCrumbs: function localCrumbs() {
      return Object(deep_clone["a" /* default */])(this.crumbs);
    }
  },
  methods: {
    handleCrumbClick: function handleCrumbClick(crumb, index) {
      // if (crumb && index < this.localCrumbs.length - 1 && crumb.url) {
      //   this.localCrumbs = this.localCrumbs.splice(index, this.localCrumbs.length - 2 - index)
      //   this.$emit('select', crumb)
      // }
      if (crumb.url && index < this.localCrumbs.length - 1) {
        this.$emit('select', crumb);
      }

      this.$emit('click', crumb);
    }
  }
});
// CONCATENATED MODULE: ./src/admin-ui/src/components/breadcrumb/src/breadcrumb.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_breadcrumbvue_type_script_lang_js_ = (breadcrumbvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/admin-ui/src/components/breadcrumb/src/breadcrumb.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_breadcrumbvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/admin-ui/src/components/breadcrumb/src/breadcrumb.vue"
/* harmony default export */ var breadcrumb = (component.exports);
// CONCATENATED MODULE: ./src/admin-ui/src/components/breadcrumb/index.js
/* concated harmony reexport default */__webpack_require__.d(__webpack_exports__, "default", function() { return breadcrumb; });


/***/ })

/******/ })});;