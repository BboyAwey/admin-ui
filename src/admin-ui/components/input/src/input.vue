<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/size';
  @import '../../../style/sizegap';
  @import '../../../style/label';
  @import '../../../style/warnings';
  .au-input {
    display: inline-block;
    width: 198px;
    .au-input-container {
      position: relative;
      width: 100%;
      display: inline-block;
    }
    .au-input-icon {
      position: absolute;
      display: inline-block;
      top: 50%;
      height: 30px;
      margin-top: -15px;
      line-height: 30px;
      font-size: 16px;
    }
    .au-input-core {
      width: 198px;
      width: 100%;
      border-width: 1px;
      border-style: solid;
      padding: 0 12px;
      font-family: $fontFamily;
      font-size: $normal;
      outline: none;
    }
    .au-input-core:disabled {
      cursor: not-allowed;
    }
    textarea.au-input-core {
      line-height: $normal * 1.5;
      height: auto;
    }
  }
  .au-input-associations-scroller {
    position: absolute;
    z-index: 9990;
    // top: 36px;
    min-width: 84px;
    width: 100%;
    max-height: 237px;
    padding: 4px 0;
    border-width: 1px;
    border-style: solid;
    outline: none;
  }
  .au-input-associations {
    outline: none;
    & > li {
      height: 32px;
      padding: 0 8px;
      line-height: 32px;
      font-size: $normal;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      user-select: none;
      cursor: pointer;
    }
  }
</style>
<template>
  <div class="au-input">
    <div
      class="au-form-label"
      v-if="label"
      :class="{
        'au-theme-font-color--base-3': !hasWarnings,
        'au-theme-font-color--danger-3': hasWarnings
      }"
      @click.stop="labelClick()">{{ label }}</div>
    <textarea
      v-if="type==='textarea'"
      class="au-input-core"
      :class="{
        'au-theme-radius au-theme-placeholder-color--base-7': true,
        'au-theme-border-color--base-8': !active && !hasWarnings,
        'au-theme-border-color--primary-3': active && !hasWarnings,
        'au-theme-border-color--danger-3': hasWarnings,
        'au-theme-focus-shadow--primary': !hasWarnings,
        'au-theme-focus-shadow--danger': hasWarnings,
        'au-theme-font-color--base-3': !hasWarnings,
        'au-theme-font-color--danger-3': hasWarnings,
        'au-theme-disabled-background-color--base-8': disabled
      }"
      :style="{ minWidth, maxWidth, minHeight, maxHeight }"
      v-model="localValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="input($event)"
      @change="change($event)"
      @focus="coreFocus($event)"
      @blur="coreBlur($event)"
      @keyup="keyup($event)"
      @keypress="keypress($event)"
      @keydown="keydown($event)"
      ref="core"></textarea>
    <span class="au-input-container" v-else>
      <au-icon
        v-if="icon"
        class="au-input-icon"
        :type="icon"
        :class="{
          'au-theme-font-color--base-3': !active,
          'au-theme-font-color--primary-3': active && !hasWarnings,
          'au-theme-font-color--danger-3': hasWarnings,
        }"
        :style="{
          'left': !iconPosition || iconPosition === 'left' ? '8px' : 'auto',
          'right': iconPosition === 'right' ? '8px' : 'auto'
        }"
        @click="iconClick"></au-icon>
      <input
        class="au-input-core"
        :class="{
          [`au-size-${size}`]: true,
          'au-theme-radius au-theme-placeholder-color--base-7': true,
          'au-theme-border-color--base-8': !active && !hasWarnings,
          'au-theme-border-color--primary-3': active && !hasWarnings,
          'au-theme-border-color--danger-3': hasWarnings,
          'au-theme-focus-shadow--primary': !hasWarnings,
          'au-theme-focus-shadow--danger': hasWarnings,
          'au-theme-font-color--base-3': !hasWarnings,
          'au-theme-font-color--danger-3': hasWarnings,
          'au-theme-disabled-background-color--base-9': disabled
        }"
        :style="{
          'padding-left': icon && (!iconPosition || iconPosition ==='left') ? '30px' : '12px',
          'padding-right': icon && iconPosition ==='right' ? '30px' : '12px'
        }"
        type="text"
        v-if="type === 'text'"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="coreFocus($event)"
        @blur="coreBlur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <input
        class="au-input-core"
        type="number"
        v-if="type === 'number'"
        :class="{
          [`au-size-${size}`]: true,
          'au-theme-radius au-theme-placeholder-color--base-7': true,
          'au-theme-border-color--base-8': !active && !hasWarnings,
          'au-theme-border-color--primary-3': active && !hasWarnings,
          'au-theme-border-color--danger-3': hasWarnings,
          'au-theme-focus-shadow--primary': !hasWarnings,
          'au-theme-focus-shadow--danger': hasWarnings,
          'au-theme-font-color--base-3': !hasWarnings,
          'au-theme-font-color--danger-3': hasWarnings,
          'au-theme-disabled-background-color--base-9': disabled
        }"
        :style="{
          'padding-left': icon && (!iconPosition || iconPosition ==='left') ? '30px' : '12px',
          'padding-right': icon && iconPosition ==='right' ? '30px' : '12px'
        }"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="coreFocus($event)"
        @blur="coreBlur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <input
        class="au-input-core"
        type="password"
        v-if="type === 'password'"
        :class="{
          [`au-size-${size}`]: true,
          'au-theme-radius au-theme-placeholder-color--base-7': true,
          'au-theme-border-color--base-8': !active && !hasWarnings,
          'au-theme-border-color--primary-3': active && !hasWarnings,
          'au-theme-border-color--danger-3': hasWarnings,
          'au-theme-focus-shadow--primary': !hasWarnings,
          'au-theme-focus-shadow--danger': hasWarnings,
          'au-theme-font-color--base-3': !hasWarnings,
          'au-theme-font-color--danger-3': hasWarnings,
          'au-theme-disabled-background-color--base-9': disabled
        }"
        :style="{
          'padding-left': icon && (!iconPosition || iconPosition ==='left') ? '30px' : '12px',
          'padding-right': icon && iconPosition ==='right' ? '30px' : '12px'
        }"
        v-model="localValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @click.stop="click($event)"
        @input="input($event)"
        @change="change($event)"
        @focus="coreFocus($event)"
        @blur="coreBlur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      <au-scroller class="au-input-associations-scroller"
        v-show="type !== 'textarea' && associationsShow"
        :class="`
          au-theme-border-color--base-8
          au-theme-shadow--level-3
          au-theme-background-color--base-12
          au-theme-radius
          au-sizegap-${size}
        `">
        <ul class="au-input-associations"
          ref="associations"
          tabindex="0"
          @blur="associationsBlur">
          <li
            v-for="(association, index) in associations"
            @click="selectAssociation(association)"
            :class="{
              'au-theme-font-color--base-3': true,
              'au-theme-background-color--primary-5': association === localValue,
              'au-theme-hover-background-color--base-10': association !== localValue
            }"
            :key="index">{{ association }}</li>
        </ul>
      </au-scroller>
    </span>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(warning, index) in warnings" :key="index">{{ warning }}</div>
    <div class="au-form-warning au-theme-font-color--danger-3" v-for="(warning, index) in localWarnings" :key="index">{{ warning }}</div>
  </div>

</template>
<script>
  import ValidatorMixin from '../../../helpers/validator-mixin'
  import FormApiMixin from '../../../helpers/form-api-mixin'
  import AuIcon from '../../icon'
  import AuScroller from '../../scroller'

  export default {
    name: 'au-input',
    mixins: [ValidatorMixin, FormApiMixin],
    components: { AuIcon, AuScroller },
    data () {
      return {
        // is the throttlling on
        throttlling: true,
        associationsShow: false,
        active: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      associations: Array,
      icon: String,
      iconPosition: String,
      minWidth: String,
      maxWidth: String,
      minHeight: String,
      maxHeight: String
    },
    watch: {
      associations (v) {
        // this.associationsShow = true
      }
    },
    methods: {
      keyup (e) { this.$emit('keyup', e.target.value, e) },
      keypress (e) { this.$emit('keypress', e.target.value, e) },
      keydown (e) { this.$emit('keydown', e.target.value, e) },
      click (e) {
        this.$emit('click', e.target.value, e)
      },
      labelClick () {
        this.$refs.core.focus()
      },
      selectAssociation (v) {
        this.localValue = v
        this.input()
        // this.$refs.core.focus()
        this.associationsShow = false
      },
      coreFocus (e) {
        this.focus(e)
        this.active = true
        if (this.associations && this.associations instanceof Array) {
          this.associationsShow = true
        }
      },
      coreBlur (e) {
        this.blur(e)
        this.active = false
        if (e.relatedTarget !== this.$refs.associations) this.associationsShow = false
      },
      associationsBlur (e) {
        if (e.relatedTarget !== this.$refs.core) this.associationsShow = false
      },
      iconClick () {
        this.$refs.core.focus()
      }
    }
  }
</script>
