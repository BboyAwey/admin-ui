<style lang="scss">
  @import "../../../style/vars";
  @import "../../../style/label";
  @import "../../../style/warnings";
  .au-radio {
    display: inline-block;
    font-size: $normal;
    .au-radio-container {
      display: inline-block;
    }
    .au-radio-container-multiple:not(:last-child) {
      margin-right: 24px;
    }
    .au-radio-core {
      position: relative;
      top: 3px;
      display: inline-block;
      width: 16px;
      height: 16px;
      border-width: 1px;
      border-style: solid;
      border-radius: 100%;
      outline: none;
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
      margin-left: 4px;
    }
  }
</style>
<template>
  <div class="au-radio">
    <div class="au-form-label" v-if="label"
      :class="{
        'au-theme-font-color--danger-3': hasWarnings,
        'au-theme-font-color--base-3': !hasWarnings,
      }">{{ label }}</div>
    <div class="au-radio-container au-radio-container-multiple" v-for="(radio, i) in radios" :key="i"
      @mouseenter="handleMouseEnter(i)"
      @mouseleave="handleMouseLeave(i)"
      :style="{
        cursor: disabled ? 'not-allowed' : 'default'
      }"
      @click="handleClick(radio.value)">
      <span class="au-radio-core" tabindex="0"
      :class="{
        'au-theme-border-color--base-8': (!hasWarnings && !hovers[i] && radio.value!== localValue) || disabled,
        'au-theme-background-color--base-9': disabled,
        'au-theme-border-color--primary-3': ((!hasWarnings && hovers[i]) || radio.value === localValue) && !disabled,
        'au-theme-border-color--danger-3': hasWarnings && !disabled
      }">
        <span v-show="radio.value === localValue"
          class="au-radio-dot"
          :class="{
            'au-radio-dot-disabled': disabled,
            'au-theme-background-color--primary-3': !disabled && !hasWarnings,
            'au-theme-background-color--danger-3': !disabled && hasWarnings,
            'au-theme-background-color--base-6': disabled
          }"></span>
      </span>
      <span class="au-radio-text"
      :class="{
        'au-theme-font-color--danger-3': hasWarnings,
        'au-theme-font-color--base-3': !hasWarnings
      }">{{ radio.text }}</span>
    </div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(w, i) in localWarnings" :key="i">{{ w }}</div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(w, i) in warnings" :key="i">{{ w }}</div>
  </div>
</template>
<script>
  import FormApiMixin from '../../../helpers/form-api-mixin'
  import ValidatorMixin from '../../../helpers/validator-mixin'

  export default {
    name: 'au-radio',
    mixins: [FormApiMixin, ValidatorMixin],
    props: {
      radios: Array
    },
    data () {
      return {
        hovers: []
      }
    },
    watch: {
      localValue (v) {
        this.$emit('input', this.localValue)
        this.$emit('change', this.localValue)
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


