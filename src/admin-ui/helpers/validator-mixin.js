// the common validation logic of enhanced form components
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
    validateOnBlur: Boolean
  },
  watch: {
    value: {
      handler: function () {
        if (this.validateOnBlur) return
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
      return this.hasLocalWarnings || this.warnings instanceof Array
    }
  },
  methods: {
    validate () {
      let vm = this
      if (vm.warnings && vm.warnings.length) return false
      if (!vm.validators) return false
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
      })
    }
  }
}
