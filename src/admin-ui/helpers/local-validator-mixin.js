// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

// Modifier:

/*
  the common validationg logic of enhanced form components
*/
export default {
  data () {
    return {
      localValue: this.value,
      localWarnings: {},
      clock: null
    }
  },
  props: {
    validators: Array,
    // [{
    //   validator () { return true},
    //   warning: '',
    //   async: false
    // }]
    warnings: Array,
    trigger: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler: function () {
        if (this.validators && this.validators.length) {
          if (this.throttlling) {
            if (this.clock) {
              clearTimeout(this.clock)
              this.clock = null
            }
            this.clock = setTimeout(this.validate, 500)
          } else {
            this.validate()
          }
        }
      },
      deep: true
    },
    trigger () {
      this.validate()
    }
  },
  computed: {
    hasLocalWarnings () {
      if (!this.localWarnings) return false
      for (let i in this.localWarnings) {
        if (this.localWarnings[i]) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    validate () {
      if (this.warnings && this.warnings.length) return false
      if (!this.validators) return false
      // separate async and sync
      let syncStack = []
      let asyncStack = []
      this.validators.forEach((v) => {
        if (v.async) {
          asyncStack.push(v)
        } else {
          syncStack.push(v)
        }
      })
      // handler warnings
      let handleWarnings = (res, i, warning) => {
        if (!res) {
          this.$set(this.localWarnings, i, warning)
        } else {
          this.$delete(this.localWarnings, i)
        }
      }
      let asyncCount = asyncStack.length // async counter
      // execute sync validation first
      syncStack.forEach((v, i) => {
        handleWarnings(v.validator(this.value), i, v.warning)
      })
      // if sync validation passed, execute async validationg
      if (!this.hasLocalWarnings) {
        if (asyncCount <= 0) { // no async
          this.$emit('done', !this.hasLocalWarnings)
          return false
        }
        asyncStack.forEach((v, i) => { // async exist
          v.validator(this.value).then((res) => {
            handleWarnings(res, i, v.warning)
            asyncCount--
            if (asyncCount <= 0) this.$emit('done', !this.hasLocalWarnings)
          })
        })
      } else { // if sync validation failed
        this.$emit('done', !this.hasLocalWarnings)
      }
    }
  }
}
