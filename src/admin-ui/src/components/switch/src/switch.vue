<style lang="scss">
  @import '../../../style/vars';
  @import '../../../style/label';
  @import '../../../style/warnings';
  .au-switch {
    display: inline-block;
  }
  .au-switch-container {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    transition: all .1s ease-in-out;
  }
  .au-switch-core {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    transition: all .1s ease-in-out;
    overflow: hidden;
  }

  .au-switch-mini {
    height: 14px;
    width: 28px;
    border-radius: 14px;
    .au-switch-core {
      width: 10px;
      height: 10px;
    }
  }
  .au-switch-small {
    width: 34px;
    height: 16px;
    border-radius: 16px;
    .au-switch-core {
      width: 12px;
      height: 12px;
    }
  }
  .au-switch-large {
    height: 24px;
    border-radius: 24px;
    .au-switch-core {
      width: 20px;
      height: 20px;
    }
  }

  .au-switch-disabled-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .1s ease-in-out;
  }
</style>
<template>
  <div class="au-switch">
    <form-item
      :label="label"
      :labelWidth="labelWidth"
      :inline="inline"
      :tips="tips"
      :lineHeight="lineHeight"
      :middle="false"
      :warnings="warnings || localWarnings">
      <div
        class="au-switch-container"
        :class="`au-theme-background-color--${bg} au-switch-${size}`"
        :style="{ cursor: readonly ? 'default' : (localDisabled ? 'not-allowed' : 'pointer')}"
        @click="handleClick"
        ref="switch">
        <div
          class="au-switch-disabled-cover au-theme-background-color--base-12"
          :style="{opacity: localDisabled && localValue ? '.8' : '0'}"></div>
        <div
          class="au-switch-core"
          :style="{left}"
          :class="{
            'au-theme-background-color--base-12': !localDisabled,
            'au-theme-background-color--base-11': localDisabled
          }" ref="core"></div>
      </div>
    </form-item>
  </div>
</template>
<script>
import FormApiMixin from 'helpers/form-api-mixin'
import ValidatorMixin from 'helpers/validator-mixin'
import FormItem from 'helpers/form-item.vue'
import { getElementSize } from 'helpers/dom'
import Loading from 'components/loading'

export default {
  name: 'au-switch',
  mixins: [FormApiMixin, ValidatorMixin],
  components: { FormItem },
  mounted () {
    this.getBg()
    this.getLeft()
    this.load()
  },
  data () {
    return {
      bg: 'base-10',
      left: '2px',
      loadingIns: null
    }
  },
  props: {
    color: {
      type: String,
      default: 'success'
    },
    loading: Boolean
  },
  watch: {
    value () {
      this.getBg()
      this.getLeft()
    },
    localValue (v) {
      this.input()
      this.change()
    },
    color () {
      this.getBg()
    },
    loading () {
      this.load()
    }
  },
  computed: {
    localDisabled () {
      return this.disabled || this.loading || this.readonly
    },
    lineHeight () {
      switch (this.size) {
        case 'mini': return '14px'
        case 'small': return '16px'
        case 'normal': return '20px'
        case 'large': return '24px'
      }
      return '20px'
    }
  },
  methods: {
    getBg () {
      this.bg = this.localValue
        ? (this.color === 'default' ? 'base-9' : this.color)
        : 'base-9'
    },
    getLeft () {
      if (this.localValue) {
        let width = getElementSize(this.$refs.switch).width
        let coreWidth = getElementSize(this.$refs.core).width
        this.left = width - 2 - coreWidth + 'px'
      } else this.left = '2px'
    },
    handleClick () {
      if (this.localDisabled) return
      this.localValue = !this.localValue
    },
    load () {
      if (this.loading) {
        this.loadingIns = Loading({
          target: this.$refs.core,
          color: this.color
        })
      } else {
        if (this.loadingIns) this.loadingIns.close()
      }
    }
  }
}
</script>
