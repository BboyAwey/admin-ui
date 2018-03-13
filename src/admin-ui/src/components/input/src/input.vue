<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/size';
  @import '../../../style/sizegap';
  .au-input {
    display: inline-block;
    .au-core-container {
      position: relative;
      display: inline-block;
    }
    .au-input-icon {
      position: absolute;
      display: inline-block;
      top: 50%;
      height: 30px;
      margin-top: -15px;
      line-height: 30px;
      font-size: $medium;
    }
    .au-input-core {
      border-width: 1px;
      border-style: solid;
      padding: 0 12px;
      font-family: $fontFamily;
      font-size: $normal;
      outline: none;
      vertical-align: middle;
    }
    .au-input-core:disabled {
      cursor: not-allowed;
    }
    textarea.au-input-core {
      line-height: $normal * 1.5;
      padding: 8px 12px;
    }
  }
  .au-input-associations-scroller {
    position: absolute;
    z-index: $z-level-1;
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
  <div class="au-input" :style="{display: fullWidth ? 'block' : ''}">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :size="size"
      :middle="type !== 'textarea'"
      :warnings="warnings || localWarnings">
      <textarea
        v-if="type==='textarea'"
        class="au-input-core"
        :class="{
          'au-theme-border-radius--normal au-theme-placeholder-color--base-7': true,
          'au-theme-border-color--base-8': !active && !hasWarnings,
          'au-theme-border-color--primary-3': active && !hasWarnings,
          'au-theme-border-color--danger-3': hasWarnings,
          'au-theme-focus-box-shadow--primary': active && !hasWarnings,
          'au-theme-focus-box-shadow--danger': active && hasWarnings,
          'au-theme-font-color--base-3': true,
          'au-theme-disabled-background-color--base-8': disabled
        }"
        :style="{
          width: !inline && fullWidth ? '100%' : width,
          height,
          minWidth: !inline && fullWidth ? '100%' : minWidth,
          maxWidth: !inline && fullWidth ? '100%' : maxWidth,
          minHeight,
          maxHeight,
        }"
        v-model="localValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        @input="input($event)"
        @change="change($event)"
        @focus="coreFocus($event)"
        @blur="coreBlur($event)"
        @keyup="keyup($event)"
        @keypress="keypress($event)"
        @keydown="keydown($event)"
        ref="core">
      </textarea>
      <span
        v-else
        class="au-core-container"
        :style="{
          verticalAlign: inline ? 'top' : '',
          width: !inline && fullWidth ? '100%' : width,
        }">
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
            [`au-size-${size}-bordered`]: true,
            'au-theme-border-radius--normal au-theme-placeholder-color--base-7': true,
            'au-theme-border-color--base-8': !active && !hasWarnings,
            'au-theme-border-color--primary-3': active && !hasWarnings,
            'au-theme-border-color--danger-3': hasWarnings,
            'au-theme-focus-box-shadow--primary': !hasWarnings && active,
            'au-theme-focus-box-shadow--danger': hasWarnings && active,
            'au-theme-font-color--base-3': true,
            'au-theme-disabled-background-color--base-9': disabled
          }"
          :style="{
            'padding-left': icon && (!iconPosition || iconPosition ==='left') ? '30px' : '12px',
            'padding-right': icon && iconPosition ==='right' ? '30px' : '12px',
            width: !inline && fullWidth ? '100%' : width,
          }"
          type="text"
          v-if="type === 'text'"
          v-model="localValue"
          :disabled="disabled"
          :readonly="readonly"
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
            [`au-size-${size}-bordered`]: true,
            'au-theme-border-radius--normal au-theme-placeholder-color--base-7': true,
            'au-theme-border-color--base-8': !active && !hasWarnings,
            'au-theme-border-color--primary-3': active && !hasWarnings,
            'au-theme-border-color--danger-3': hasWarnings,
            'au-theme-focus-box-shadow--primary': !hasWarnings && active,
            'au-theme-focus-box-shadow--danger': hasWarnings && active,
            'au-theme-font-color--base-3': true,
            'au-theme-disabled-background-color--base-9': disabled
          }"
          :style="{
            'padding-left': icon && (!iconPosition || iconPosition ==='left') ? '30px' : '12px',
            'padding-right': icon && iconPosition ==='right' ? '30px' : '12px',
            width: !inline && fullWidth ? '100%' : width,
          }"
          v-model="localValue"
          :disabled="disabled"
          :readonly="readonly"
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
            [`au-size-${size}-bordered`]: true,
            'au-theme-border-radius--normal au-theme-placeholder-color--base-7': true,
            'au-theme-border-color--base-8': !active && !hasWarnings,
            'au-theme-border-color--primary-3': active && !hasWarnings,
            'au-theme-border-color--danger-3': hasWarnings,
            'au-theme-focus-box-shadow--primary': !hasWarnings && active,
            'au-theme-focus-box-shadow--danger': hasWarnings && active,
            'au-theme-font-color--base-3': true,
            'au-theme-disabled-background-color--base-9': disabled
          }"
          :style="{
            'padding-left': icon && (!iconPosition || iconPosition ==='left') ? '30px' : '12px',
            'padding-right': icon && iconPosition ==='right' ? '30px' : '12px',
          }"
          v-model="localValue"
          :disabled="disabled"
          :readonly="readonly"
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
            au-theme-box-shadow--level-2
            au-theme-background-color--base-12
            au-theme-border-radius--normal
            au-sizegap-${size}
          `">
          <ul class="au-input-associations"
            ref="associations"
            tabindex="0"
            @blur="associationsBlur">
            <li
              v-for="(association, index) in localAssociations"
              @click="selectAssociation(association)"
              :class="{
                'au-theme-font-color--base-3': true,
                'au-theme-background-color--primary-5': association._text === localValue,
                'au-theme-hover-background-color--base-10': association._text !== localValue
              }"
              :key="index">{{ association._text }}</li>
          </ul>
        </au-scroller>
      </span>
    </form-item>
  </div>
</template>
<script>
import ValidatorMixin from '../../../helpers/validator-mixin'
import FormApiMixin from '../../../helpers/form-api-mixin'
import FormItem from '../../../helpers/form-item.vue'
import AuIcon from '../../icon'
import AuScroller from '../../scroller'

export default {
  name: 'au-input',
  mixins: [ValidatorMixin, FormApiMixin],
  components: { AuIcon, AuScroller, FormItem },
  data () {
    return {
      // is the throttlling on
      // throttlling: true,
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
      default: ''
    },
    associations: Array,
    icon: String,
    iconPosition: String,
    fullWidth: Boolean,
    width: {
      type: String,
      default: '260px'
    },
    height: String,
    minWidth: String,
    maxWidth: String,
    minHeight: String,
    maxHeight: String
  },
  computed: {
    localAssociations () {
      if (this.associations) {
        return this.associations.map(a => {
          if (typeof a === 'object') return a
          else return { _text: a }
        })
      } else {
        return null
      }
    }
  },
  watch: {
    localValue (v) {
      this.input()
      this.change()
    }
  },
  methods: {
    keyup (e) { this.$emit('keyup', e.target.value, e) },
    keypress (e) { this.$emit('keypress', e.target.value, e) },
    keydown (e) { this.$emit('keydown', e.target.value, e) },
    click (e) {
      this.$emit('click', e.target.value, e)
    },
    selectAssociation (v) {
      this.localValue = v._text
      // this.input()
      // this.$refs.core.focus()
      this.associationsShow = false
      this.$emit('association-select', v)
    },
    coreFocus (e) {
      if (this.readonly) return
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
