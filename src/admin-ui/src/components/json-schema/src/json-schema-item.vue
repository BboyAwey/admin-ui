<style lang="scss" scoped>
  .au-json-schema-item {}
  .au-json-schema-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0;
    & > * {
      // flex:
    }
    & > *:not(:last-child) {
      margin-right: 10px;
    }
    .au-json-schema-key {
      flex-grow: 1;
    }
    .au-json-schema-init > * {
      width: 100%;
      input {
        cursor: pointer;
      }
    }
    .au-json-schema-init,
    .au-json-schema-type {
      width: 94px;
      flex-shrink: 0;
    }
  }
  .au-json-schema-icons {
    width: 34px;
    font-size: 14px;
    & > * {
      cursor: pointer;
    }
    & > *:not(:last-child) {
      margin-right: 8px;
    }
  }
  .au-json-schema-collapse-icon {
    width: 10px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
</style>

<template>
  <div class="au-json-schema-item">
      <div class="au-json-schema-collapse-icon">
        <au-icon
          class="
            au-theme-color--base-3
            au-theme-hover-color--primary
          "
          :type="showChildren ? 'caret-down' : 'caret-right'"
          v-show="isReferenceType"
          @click="showChildren = !showChildren"/>
      </div>
      <div class="au-json-schema-key">
        <au-input
          :disabled="isRoot || isItem"
          :placeholder="isRoot ? 'root' : this.localSchema.key"
          full-width
          :size="formItemSize"
          v-model="localSchema.key"/>
      </div>
      <div class="au-json-schema-init"
        v-if="init"
        @click="setInit">
        <au-input
          placeholder="初始值"
          :disabled="isReferenceType"
          :readonly="!isReferenceType"
          :value="localSchema.init"
          full-width
          :size="formItemSize"/>
        <!-- <au-button :disabled="isReferenceType" full-width :size="formItemSize">初始值</au-button> -->
      </div>
      <au-select
        :options="isRoot ? rootTypes.map(t => ({text: t, value: t})) : types.map(t => ({text: t, value: t}))"
        class="au-json-schema-type"
        :size="formItemSize"
        v-model="localSchema.type"/>
      <div class="au-json-schema-icons">
        <au-icon type="times" v-show="!isRoot" class="au-json-schema-icon au-theme-color--danger"/>
        <au-icon type="plus" v-show="isReferenceType" class="au-json-schema-icon au-theme-color--success"/>
      </div>
    </div>
</template>

<script>
import AuInput from '../../input'
import AuSelect from '../../select'
import deepClone from '../../../helpers/utils/deep-clone.js'

export default {
  name: 'au-json-schema-item',
  components: { AuInput, AuSelect },
  model: {
    prop: 'schema',
    event: 'change'
  },
  props: {
    schema: {
      type: Object,
      default () {
        return {
          key: '',
          init: '',
          type: ''
        }
      }
    },
    isItem: Boolean,
    isRoot: Boolean,
    init: Boolean,
    formItemSize: String,
    types: Array,
    rootTypes: Array
  },
  data () {
    return {
      showChildren: false,
      localSchema: deepClone(this.schema)
    }
  },
  computed: {
    isReferenceType () {
      return this.localSchema.type === 'object' ||
        this.localSchema.type === 'array'
    }
  },
  watch: {
    showChildren (v) {
      this.$emit('show-children', v)
    },
    localSchema: {
      deep: true,
      handler (v, o) {
        if (JSON.stringify(v) !== JSON.stringify(o)) {
          this.$emit('change', v)
        }
      }
    }
  },
  methods: {
    setInit () {
      this.$emit('set-init', this.localSchema)
    }
  }
}
</script>
