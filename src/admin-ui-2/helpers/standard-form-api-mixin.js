// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

// Modifier:

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
    small: {
      type: Boolean
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
  computed: {
    classes () {
      let classes = ''
      if (this.hasLocalWarnings || this.warnings) classes += 'admin-form-warning '
      if (this.small) classes += 'admin-form-small '
      if (this.iconClass) classes += this.iconPosition === 'right' ? 'admin-form-icon-right ' : 'admin-form-icon '
      if (this.disabled) classes += 'admin-form-disabled'
      return classes
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
      this.$emit('blur', this.localValue, e)
    }
  }
}
