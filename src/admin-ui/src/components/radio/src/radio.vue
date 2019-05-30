<style lang="scss">
  @import "../../../style/vars";
  @import "../../../style/label";
  @import "../../../style/warnings";
  .au-radio {
    display: inline-block;
    font-size: $normal;
    .au-radio-container-inline {
      display: inline-block;
    }
    .au-radio-container-block {
      display: block;
    }
    .au-radio-container-inline:not(:last-child) {
      margin-right: 24px;
    }
    .au-radio-container-block:not(:last-child) {
      margin-bottom: 8px;
    }
    .au-radio-core {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      border-width: 1px;
      border-style: solid;
      border-radius: 100%;
      outline: none;
      vertical-align: middle;
    }
    .au-radio-dot {
      display: inline-block;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 10px;
      height: 10px;
      border-radius: 100%;
    }
    .au-radio-text {
      margin-left: 3px;
      vertical-align: middle;
    }
  }
</style>
<template>
  <div class="au-radio">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :warnings="warnings || localWarnings">
      <div
        :class="'au-radio-container' + (listType === 'block' ? '-block' : '-inline')"
        v-for="(radio, i) in radios" :key="i"
        @mouseenter="handleMouseEnter(i)"
        @mouseleave="handleMouseLeave(i)"
        :style="{
          cursor: disabled ? 'not-allowed' : 'default'
        }"
        @click="handleClick(radio.value)">
        <span class="au-radio-core" tabindex="0"
        :class="{
          'au-theme-border-color--base-9': (!hasWarnings && !hovers[i] && radio.value!== localValue) || disabled,
          'au-theme-background-color--base-11': disabled && radio.value!== localValue,
          'au-theme-border-color--primary': ((!hasWarnings && hovers[i]) || radio.value === localValue) && !disabled,
          'au-theme-border-color--danger': hasWarnings && !disabled
        }">
          <span v-show="radio.value === localValue"
            class="au-radio-dot"
            :class="{
              'au-radio-dot-disabled': disabled,
              'au-theme-background-color--primary': !disabled && !hasWarnings,
              'au-theme-background-color--danger': !disabled && hasWarnings,
              'au-theme-background-color--base-11': disabled
            }"></span>
        </span>
        <span class="au-radio-text">{{ radio.text }}</span>
      </div>
    </form-item>
  </div>
</template>
<script>
import FormApiMixin from 'helpers/form-api-mixin'
import ValidatorMixin from 'helpers/validator-mixin'
import FormItem from 'helpers/form-item.vue'

export default {
  name: 'au-radio',
  mixins: [FormApiMixin, ValidatorMixin],
  components: { FormItem },
  props: {
    radios: Array,
    listType: {
      type: String,
      default: 'inline'
    }
  },
  data () {
    return {
      hovers: []
    }
  },
  watch: {
    localValue (v) {
      this.input()
      this.change()
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
      this.$set(this.hovers, index, status)
    },
    handleClick (v) {
      if (this.disabled) return
      this.localValue = v
    }
  }
}
</script>
