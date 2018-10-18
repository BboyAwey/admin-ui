<style lang="scss">
  .au-json-schema {}
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
    .au-json-schema-type {
      width: 94px;
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
  .au-json-schema-children-container {
    padding-left: 20px;
    & > * {
      margin-top: 10px;
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
  <div class="au-json-schema au-theme-color--base-3">
    <!-- json schema:
      form-item-size
      schema
      label
      root-types -->
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
        <au-input :placeholder="_key" :disabled="topLevel" full-width/>
      </div>
      <au-select
        :options="topLevel ? rootTypes.map(t => ({text: t, value: t})) : types.map(t => ({text: t, value: t}))"
        class="au-json-schema-type"
        v-model="localSchema.type"/>
      <div class="au-json-schema-icons">
        <au-icon type="times" v-show="!topLevel" class="au-json-schema-icon au-theme-color--danger"/>
        <au-icon type="plus" v-show="isReferenceType" class="au-json-schema-icon au-theme-color--success"/>
      </div>
    </div>
    <div class="au-json-schema-children-container" v-if="isReferenceType && showChildren">
      <au-json-schema v-for="(value, key) in localSchema.properties" :key="key" :top-level="false" v-model="localSchema.properties[key]" :_key="key"/>
    </div>
    <div class="au-json-schema-children-container" v-if="isReferenceType && showChildren">

    </div>
  </div>
</template>

<script>
import AuInput from '../../input'
import AuSelect from '../../select'
import AuIcon from '../../icon'
import deepClone from '../../../helpers/utils/deep-clone.js'

let types = ['boolean', 'integer', 'number', 'string', 'object', 'array']

export default {
  name: 'au-json-schema',
  components: { AuInput, AuSelect, AuIcon },
  props: {
    _key: {
      type: String,
      default: 'root'
    },
    schema: {
      type: Object,
      default: _ => ({
        type: 'object',
        properties: {
          'a': {
            type: 'string'
          },
          'b': {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }})
    },
    label: {
      type: String,
      default: 'JSON Schema'
    },
    topLevel: {
      type: Boolean,
      default: true
    },
    types: {
      type: Array,
      default: _ => types
    },
    rootTypes: {
      type: Array,
      default: _ => types
    }
  },
  model: {
    prop: 'schema',
    event: 'change'
  },
  data () {
    return {
      localSchema: deepClone(this.schema),
      showChildren: true
    }
  },
  computed: {
    isReferenceType () {
      return this.localSchema.type === 'object' ||
        this.localSchema.type === 'array'
    }
  }
}
</script>
