// enhanced form components common api
export default {
  data () {
    return {
      localValue: this.value
    }
  },
  props: {
    label: {
      type: String
    },
    size: {
      type: String,
      default: 'normal'
    },
    value: {
      // type: String,
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  watch: {
    value: {
      deep: true,
      handler (v) {
        if (this.localValue !== v) this.localValue = v
      }
    }
  },
  methods: {
    input (e) {
      this.$emit('input', this.localValue, e)
    },
    change (e) {
      this.$emit('change', this.localValue, e)
    },
    focus (e) {
      this.$emit('focus', this.localValue, e)
    },
    blur (e) {
      if (this.validateOnBlur) this.validate()
      this.$emit('blur', this.localValue, e)
    },
    reset () {
      this.localValue = ''
      this.localWarnings = this.warnings || {}
    }
  }
}
