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
    labelWidth: String,
    tips: {
      type: Array,
      default: () => []
    },
    inline: {
      type: Boolean,
      default () {
        return !!this.label
      }
    },
    size: {
      type: String,
      default: 'normal'
    },
    value: {
      // type: String,
      required: true
    },
    disabled: Boolean,
    readonly: Boolean
  },
  computed: {
    inlineLabel () {
      return this.label && this.inline
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
      if (this.$refs.core && this.$refs.core.focus instanceof Function) {
        this.$refs.core.focus()
      }
      this.$emit('focus', this.localValue, e)
    },
    blur (e) {
      if (this.validateOnBlur) this.validate()
      this.$emit('blur', this.localValue, e)
    },
    clear () {
      this.clearing = true
      if (typeof this.localValue === 'string') {
        this.localValue = ''
      } else if (typeof this.localValue === 'number') {
        this.localValue = ''
      } else if (this.localValue instanceof Array) {
        this.localValue = []
      } else if (this.localValue instanceof Object) {
        this.localValue = {}
      }
      this.localWarnings = this.warnings || {}
      this.$nextTick(() => { // we should set clearing to false after value watch has triggered
        this.clearing = false
      })
    }
  }
}
