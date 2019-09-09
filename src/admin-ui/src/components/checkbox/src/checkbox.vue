<style lang="scss">
  @import '../../../style/vars';
  .au-checkbox {
    display: inline-block;
    font-size: $normal;
    .au-checkbox-container-inline {
      display: inline-block;
    }
    .au-checkbox-container-block {
      display: block;
    }
    .au-checkbox-container-inline:not(:last-child) {
      margin-right: 24px;
    }
    .au-checkbox-container-block:not(:last-child) {
      margin-bottom: 8px;
    }
    .au-checkbox-core {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      border-width: 1px;
      border-style: solid;
      outline: none;
      vertical-align: middle;
      text-align: center;
    }
    .au-checkbox-icon {
      // position: relative;
      // top: -1px;
      // left: 0;
      // height: 100%;
      font-size: $small;
    }
    .au-checkbox-icon-minus {
      top: 3px;
      left: 0;
    }
    .au-checkbox-icon-disabled:not(.au-checkbox-icon-minus) {
      top: 1px;
      left: -1px;
    }
    .au-checkbox-text {
      margin-left: 3px;
      vertical-align: middle;
    }
    .au-checkbox-icon-check {
      position: relative;
      top: -1px;
    }
  }
</style>
<template>
  <div class="au-checkbox">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :warnings="warnings || localWarnings">
      <div class="au-checkbox-container" v-if="!multiple"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @click="handleClick"
        :style="{
          cursor: disabled ? 'not-allowed' : 'default'
        }">
        <span class="au-checkbox-core au-theme-border-radius--small" tabindex="0"
        :class="{
          'au-theme-border-color--base-9': (!hasWarnings && !hover && !localValue && !localIndeterminate) || (disabled && (localValue || localIndeterminate)),
          'au-theme-border-color--primary': !hasWarnings && hover && !localValue && !disabled,
          'au-theme-border-color--danger': hasWarnings && !localValue &&!disabled,
          'au-theme-background-color--primary': !hasWarnings && (localValue || localIndeterminate) && !disabled,
          'au-theme-background-color--danger': hasWarnings && (localValue || localIndeterminate) && !disabled,
          'au-theme-background-color--base-11': disabled
        }"
        :style="{
          border: (localValue && !disabled) || localIndeterminate ? 'none' : ''
        }">
          <au-icon unify-size v-show="localValue && !localIndeterminate" type="check" class="au-checkbox-icon au-checkbox-icon-check"
          :class="{
            'au-checkbox-icon-disabled': disabled,
            'au-theme-color--base-12': true
          }"></au-icon>
          <au-icon unify-size v-show="localIndeterminate" type="minus" class="au-checkbox-icon au-checkbox-icon-minus"
          :class="{
            'au-checkbox-icon-disabled': disabled,
            'au-theme-color--base-12': true
          }"></au-icon>
        </span>
        <span class="au-checkbox-text" v-show="text">{{ text }}</span>
      </div>
      <div
        class="au-checkbox-container"
        :class="'au-checkbox-container' + (listType === 'block' ? '-block' : '-inline')"
        v-for="(checkbox, i) in localCheckboxes" :key="i"
        @mouseenter="handleMouseEnter(i)"
        @mouseleave="handleMouseLeave(i)"
        :style="{
          cursor: disabled ? 'not-allowed' : 'default'
        }"
        @click="handleClick(i)">
        <span class="au-checkbox-core au-theme-border-radius--small" tabindex="0"
        :class="{
          'au-theme-border-color--base-9': (!hasWarnings && !checkbox.hover && !checkbox.checked) || (disabled && localValue),
          'au-theme-border-color--primary': !hasWarnings && checkbox.hover && !checkbox.checked,
          'au-theme-border-color--danger': hasWarnings && !checkbox.checked && !disabled,
          'au-theme-background-color--primary': !hasWarnings && checkbox.checked && !disabled,
          'au-theme-background-color--danger': hasWarnings && checkbox.checked && !disabled,
          'au-theme-background-color--base-11': disabled
        }"
        :style="{
          border: checkbox.checked && !disabled ? 'none' : ''
        }">
          <au-icon unify-size v-show="checkbox.checked" type="check"
            class="au-checkbox-icon au-checkbox-icon-check au-theme-color--base-12"
            :class="{
              'au-checkbox-icon-disabled': disabled,
              'au-theme-color--base-12': disabled
            }"></au-icon>
        </span>
        <span class="au-checkbox-text" v-show="checkbox.text">{{ checkbox.text }}</span>
      </div>
    </form-item>
  </div>
</template>
<script>
import ValidatorMixin from 'helpers/validator-mixin'
import FormApiMixin from 'helpers/form-api-mixin'
import FormItem from 'helpers/form-item.vue'

export default {
  name: 'au-checkbox',
  mixins: [ValidatorMixin, FormApiMixin],
  components: { FormItem },
  props: {
    // label value disabled from mixins
    text: {
      type: String
    },
    value: {
      type: [Boolean, Array],
      required: true
    },
    checkboxes: {
      type: Array,
      default () {
        return []
      }
    },
    listType: {
      type: String,
      default: 'inline'
    },
    indeterminate: Boolean
  },
  data () {
    return {
      hover: false,
      localValue: this.value,
      localCheckboxes: this.getLocalCbsFromCbs(),
      // localValues: this.value,
      localIndeterminate: this.indeterminate
    }
  },
  computed: {
    multiple () {
      return this.checkboxes && this.checkboxes.length
    }
  },
  watch: {
    localValue (v) {
      // this.localIndeterminate = false
      this.input()
      this.change()
    },
    // localValues () {
    //   this.$emit('input', this.localValues)
    //   this.$emit('change', this.localValues)
    // },
    checkboxes: {
      deep: true,
      handler () {
        this.localCheckboxes = this.getLocalCbsFromCbs()
      }
    },
    value: {
      deep: true,
      handler (v) {
        this.localCheckboxes = this.getLocalCbsFromCbs()
      }
    },
    indeterminate (v) {
      this.localIndeterminate = v
    }
  },
  methods: {
    handleMouseEnter (index) {
      this.handleHover(true, index)
    },
    handleMouseLeave (index) {
      this.handleHover(false, index)
    },
    handleHover (status, index) {
      if (this.disabled) return
      if (this.multiple) {
        this.$set(this.localCheckboxes[index], 'hover', status)
      } else {
        this.hover = status
      }
    },
    handleClick (index) {
      if (this.disabled) return
      if (this.multiple) {
        this.$set(this.localCheckboxes[index], 'checked', !this.localCheckboxes[index].checked)
        this.localValue = this.getValuesFromLcbs()
      } else {
        this.localValue = !this.localValue
      }
    },
    getLocalCbsFromCbs () {
      let vm = this
      if (vm.checkboxes instanceof Array) {
        return vm.checkboxes.map(cb => {
          let { text, value } = cb
          return {
            text,
            value,
            hover: false,
            checked: vm.value.includes(value)
          }
        })
      } else {
        return []
      }
    },
    getValuesFromLcbs () {
      let res = []
      this.localCheckboxes.forEach(cb => {
        if (cb.checked) res.push(cb.value)
      })
      return res
    }
  }
}
</script>
