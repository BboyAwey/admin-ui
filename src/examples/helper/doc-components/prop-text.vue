<style lang="scss" scoped>
  .props {
    display: inline;
  }
</style>

<template>
  <div class="props">
    <span v-if="typeof text === 'string' && text !== '-'">
      {{ text || '\'\'' }}
    </span>
    <span v-else-if="text === undefined">
      undefined
    </span>
    <span v-else-if="text === null">
      null
    </span>
    <au-icon v-if="text === '-'" type="minus"/>
    <au-icon v-if="typeof text === 'boolean' && text" type="check" class="au-theme-color--success"></au-icon>
    <au-icon v-if="typeof text === 'boolean' && !text" type="times"></au-icon>
    <template v-if="text instanceof Array && text.length">
      <template v-for="item of text">
        <span v-if="typeof item === 'string'" :key="item">
          {{ item }}
        </span>
        <doc-link v-if="typeof item === 'object'" :href="item.link" :key="item.text + item.link">
          {{ item.text }}
        </doc-link>
      </template>
    </template>
  </div>
</template>

<script>
import DocLink from './link'

export default {
  name: 'doc-prop-text',
  components: { DocLink },
  props: {
    text: {
      default: ''
    }
  }
}
</script>
