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
    warnings: Array
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

      return new Promise((resolve, reject) => {
        let asyncCount = asyncStack.length
        // execute sync validation first
        syncStack.forEach((v, i) => {
          handleWarnings(v.validator(this.value), i, v.warning)
        })
        // if sync validation passed, execute async validationg
        if (!this.hasLocalWarnings) {
          if (asyncCount <= 0) { // no async
            resolve('done', !this.hasLocalWarnings)
          } else {
            asyncStack.forEach((v, i) => { // async exist
              v.validator(this.value).then((res) => {
                handleWarnings(res, i, v.warning)
                asyncCount--
                if (asyncCount <= 0) this.$emit('done', !this.hasLocalWarnings)
              })
            })
            Promise.all(asyncStack.map((av, i) => {
              return av.validator(this.value).then(res => {
                handleWarnings(res, i, av.warning)
              })
            })).then(results => {
              if (results.includes(false)) reject(!this.hasLocalWarnings)
              else resolve(!this.hasLocalWarnings)
            })
          }
        } else { // if sync validation failed
          reject(!this.hasLocalWarnings)
        }
      })
    }
  }
}
