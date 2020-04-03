<style lang="scss" scoped>
  .type-list {
    & > p {
      padding-left: 8px;
    }
    & > p:before {
      content: '-'
    }
  }
</style>

<template>
  <p class="type-list">
    <doc-code>{{ current }}</doc-code>
    <type-list v-if="restTypes && restTypes.length" :types="restTypes" />
  </p>
</template>

<script>
import DocCode from './code'

export default {
  name: 'type-list',
  components: { DocCode },
  props: {
    types: {
      type: Array,
      required: true
    }
  },
  computed: {
    restTypes () {
      const all = [...this.types]
      all.shift()
      return all
    },
    current () {
      return this.types[0]
    }
  }
}
</script>
