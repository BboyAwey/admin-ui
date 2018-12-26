// the common validation logic of enhanced form components
export default {
  data () {
    return {
      localValue: this.value,
      localWarnings: {},
      clock: null,
      clearing: false // vm is exec clearing at this moment if it is true
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
    warning: Boolean,
    validateOnBlur: Boolean
  },
  watch: {
    value: {
      handler: function () {
        if (this.validateOnBlur || this.clearing) return
        if (this.validators && this.validators.length) {
          if (this.throttling) {
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
    },
    hasWarnings () {
      // return this.hasLocalWarnings || this.warnings instanceof Array
      return this.hasLocalWarnings || (this.warnings && this.warnings.length) || this.warning
    },
    throttling () { // if there has async validator we should enable throttling
      return !!this.validators.filter(v => v.async).length
    }
  },
  methods: {
    validate () {
      let vm = this
      if (vm.warnings && vm.warnings.length) return Promise.resolve(true)
      if (!vm.validators) return Promise.resolve(true)

      // separate async and sync
      let syncStack = []
      let asyncStack = []
      vm.validators.forEach((v) => {
        if (v.async) {
          asyncStack.push(v)
        } else {
          syncStack.push(v)
        }
      })

      // handler warnings
      let handleWarnings = (res, i, warning) => {
        if (!res) {
          vm.$set(vm.localWarnings, i, warning)
        } else {
          vm.$delete(vm.localWarnings, i)
        }
      }

      return new Promise((resolve) => {
        let asyncCount = asyncStack.length
        // execute sync validation first
        syncStack.forEach((v, i) => {
          handleWarnings(v.validator(vm.value), i, v.warning)
        })
        // if sync validation passed, execute async validationg
        if (!vm.hasLocalWarnings) {
          if (asyncCount <= 0) { // no async
            resolve(!vm.hasLocalWarnings)
          } else {
            Promise.all(asyncStack.map((av, i) => {
              return av.validator(vm.value).then(res => {
                handleWarnings(res, i, av.warning)
              })
            })).then(results => {
              if (results.includes(false)) resolve(!vm.hasLocalWarnings)
              else resolve(!vm.hasLocalWarnings)
            })
          }
        } else { // if sync validation failed
          resolve(!vm.hasLocalWarnings)
        }
      }).catch(e => {
        console.warn(`Admin UI@${this.$options._componentTag}@validate: ${e}`)
        return false
      })
    }
  }
}
