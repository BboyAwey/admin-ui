define("Message", ["Vue"], function(__WEBPACK_EXTERNAL_MODULE__74__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 299);
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

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin-ui/src/components/icon/src/icon.vue?vue&type=template&id=a8e77880&
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
        return _vm.$emit("click")
      }
    }
  })
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin-ui/src/components/icon/src/icon.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var iconvue_type_script_lang_js_ = ({
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
// CONCATENATED MODULE: ./src/admin-ui/src/components/icon/src/icon.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_iconvue_type_script_lang_js_ = (iconvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/admin-ui/src/components/icon/src/icon.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_iconvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/admin-ui/src/components/icon/src/icon.vue"
/* harmony default export */ var icon = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__(74);
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/admin-ui/src/components/message/src/message.vue?vue&type=template&id=4fd2cb0c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    { attrs: { name: "au-message" }, on: { "after-leave": _vm.afterLeave } },
    [
      _vm.visible
        ? _c(
            "div",
            {
              staticClass: "au-message",
              class:
                _vm.customClass ||
                "\n      au-theme-border-radius--large\n      au-theme-before-radius\n      au-theme-color--base-3\n      au-theme-background-color--base-12\n      au-theme-box-shadow--base\n      au-message-border\n      au-theme-border-color--base-10\n    "
            },
            [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.iconType,
                      expression: "iconType"
                    }
                  ],
                  staticClass: "au-message-icon-container"
                },
                [
                  _c("au-icon", {
                    staticClass: "au-message-icon au-theme-color--base-12",
                    class: "au-theme-background-color--" + (_vm.type || "info"),
                    attrs: { type: _vm.iconType }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "au-message-message",
                  style: {
                    paddingLeft: _vm.iconType ? "32px" : "",
                    paddingRight: _vm.closeable ? "32px" : ""
                  }
                },
                [_vm._v("\n        " + _vm._s(_vm.message) + "\n      ")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.closeable,
                      expression: "closeable"
                    }
                  ],
                  staticClass: "au-message-close-container",
                  on: {
                    click: function($event) {
                      _vm.visible = false
                    }
                  }
                },
                [
                  _c("au-icon", {
                    staticClass:
                      "au-message-close au-theme-color--base-8 au-theme-hover-color--base-3",
                    attrs: { size: "16px", type: "times" }
                  })
                ],
                1
              )
            ]
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// EXTERNAL MODULE: ./src/admin-ui/src/components/icon/src/icon.vue + 3 modules
var icon = __webpack_require__(135);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/admin-ui/src/components/message/src/message.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var messagevue_type_script_lang_js_ = ({
  name: 'au-message',
  components: {
    AuIcon: icon["a" /* default */]
  },
  props: {
    visible: Boolean,
    message: String,
    customClass: String,
    icon: String,
    type: {
      type: String,
      default: 'info' // info, success, warning, danger

    },
    closeable: Boolean
  },
  computed: {
    iconType: function iconType() {
      if (this.icon) return this.icon;

      switch (this.type) {
        case 'info':
        case 'primary':
          return 'info';

        case 'warning':
          return 'exclamation';

        case 'success':
          return 'check';

        case 'danger':
          return 'times';

        default:
          return null;
      }
    }
  },
  methods: {
    afterLeave: function afterLeave() {
      this.$emit('close', this);
    }
  }
});
// CONCATENATED MODULE: ./src/admin-ui/src/components/message/src/message.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_messagevue_type_script_lang_js_ = (messagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/admin-ui/src/components/message/src/message.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_messagevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/admin-ui/src/components/message/src/message.vue"
/* harmony default export */ var message = (component.exports);
// CONCATENATED MODULE: ./src/admin-ui/src/components/message/src/message.js

 // use a pull to saving created message instance to avoid create repeatly

var pool = [];

var message_getMessageInstance = function getMessageInstance() {
  if (pool.length) {
    return pool.shift();
  } else {
    var ins = new (external_Vue_default.a.extend(message))({
      el: document.createElement('div')
    });
    return ins;
  }
}; // the Message function for public


var Message = function Message() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var message = config.message,
      icon = config.icon,
      type = config.type,
      customClass = config.customClass,
      closeable = config.closeable,
      _config$duration = config.duration,
      duration = _config$duration === void 0 ? 3000 : _config$duration;
  var instance = message_getMessageInstance();
  instance.$off();
  instance.message = message;
  instance.icon = icon;
  instance.type = type;
  instance.customClass = customClass;
  instance.closeable = closeable; // instance.center = center

  instance.$mount();
  instance.$on('close', function (ins) {
    pool.push(ins);
  });
  document.body.appendChild(instance.$el);
  instance.visible = true;

  if (duration !== 0) {
    var clock = setTimeout(function () {
      instance.visible = false;
      clearTimeout(clock);
      clock = null;
    }, duration);
  }

  return instance;
};

/* harmony default export */ var src_message = (Message);
// CONCATENATED MODULE: ./src/admin-ui/src/components/message/index.js
/* concated harmony reexport default */__webpack_require__.d(__webpack_exports__, "default", function() { return src_message; });


/***/ }),

/***/ 74:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__74__;

/***/ })

/******/ })});;