<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  @import '../../../style/warnings';
  .au-checkbox {
    display: inline-block;
    font-size: $normal;
    .au-checkbox-container {
      display: inline;
    }
    .au-checkbox-container-multiple:not(:last-child) {
      margin-right: 24px;
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
    }
    .au-checkbox-icon {
      position: absolute;
      top: 2px;
      left: 0;
      font-size: $small;
    }
    .au-checkbox-icon-minus {
      top: 3px;
      left: 0;
    }
    .au-checkbox-icon-disabled {
      top: 1px;
      left: -1px;
    }
    .au-checkbox-text {
      margin-left: 4px;
      vertical-align: middle;
    }
  }
</style>
<template>
  <div class="au-checkbox">
    <div class="au-form-label au-theme-font-color--base-3" v-if="label">{{ label }}</div>
    <div class="au-checkbox-container" v-if="!multiple"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
      :style="{
        cursor: disabled ? 'not-allowed' : 'default'
      }">
      <span class="au-checkbox-core au-theme-radius" tabindex="0"
      :class="{
        'au-theme-border-color--base-8': (!hasWarnings && !hover && !localValue && !localIndeterminate) || disabled,
        'au-theme-border-color--primary-3': !hasWarnings && hover && !localValue && !disabled,
        'au-theme-border-color--danger-3': hasWarnings && !localValue &&!disabled,
        'au-theme-background-color--primary-3': !hasWarnings && (localValue || localIndeterminate) && !disabled,
        'au-theme-background-color--danger-3': hasWarnings && (localValue || localIndeterminate) && !disabled,
        'au-theme-background-color--base-9': disabled
      }"
      :style="{
        border: (localValue && !disabled) || localIndeterminate ? 'none' : ''
      }">
        <au-icon v-show="localValue && !localIndeterminate" type="check" class="au-checkbox-icon"
        :class="{
          'au-checkbox-icon-disabled': disabled,
          'au-theme-font-color--base-12': !disabled,
          'au-theme-font-color--base-6': disabled
        }"></au-icon>
        <au-icon v-show="localIndeterminate" type="minus" class="au-checkbox-icon au-checkbox-icon-minus"
        :class="{
          'au-checkbox-icon-disabled': disabled,
          'au-theme-font-color--base-12': !disabled,
          'au-theme-font-color--base-6': disabled
        }"></au-icon>
      </span>
      <span class="au-checkbox-text">{{ text }}</span>
    </div>
    <div class="au-checkbox-container au-checkbox-container-multiple" v-for="(checkbox, i) in localCheckboxes" :key="i"
      @mouseenter="handleMouseEnter(i)"
      @mouseleave="handleMouseLeave(i)"
      :style="{
        cursor: disabled ? 'not-allowed' : 'default'
      }"
      @click="handleClick(i)">
      <span class="au-checkbox-core au-theme-radius" tabindex="0"
      :class="{
        'au-theme-border-color--base-8': (!hasWarnings && !checkbox.hover && !checkbox.checked) || disabled,
        'au-theme-border-color--primary-3': !hasWarnings && checkbox.hover && !checkbox.checked,
        'au-theme-border-color--danger-3': hasWarnings && !checkbox.checked && !disabled,
        'au-theme-background-color--primary-3': !hasWarnings && checkbox.checked && !disabled,
        'au-theme-background-color--danger-3': hasWarnings && checkbox.checked && !disabled,
        'au-theme-background-color--base-9': disabled
      }"
      :style="{
        border: checkbox.checked && !disabled ? 'none' : ''
      }">
        <au-icon v-show="checkbox.checked" type="check"
          class="au-checkbox-icon au-theme-font-color--base-12"
          :class="{
            'au-checkbox-icon-disabled': disabled,
            'au-theme-font-color--base-6-important': disabled
          }"></au-icon>
      </span>
      <span class="au-checkbox-text">{{ checkbox.text }}</span>
    </div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(w, i) in localWarnings" :key="i">{{ w }}</div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(w, i) in warnings" :key="i">{{ w }}</div>
  </div>
</template>
<script>
  import ValidatorMixin from '../../../helpers/validator-mixin'
  import FormApiMixin from '../../../helpers/form-api-mixin'

  export default {
    name: 'au-checkbox',
    mixins: [ValidatorMixin, FormApiMixin],
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
        this.localIndeterminate = false
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
