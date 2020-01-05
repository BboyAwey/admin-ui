<template>
  <div class="prop">
    <span v-if="typeof text === 'string' && text !== '-'">
      {{ text || '\'\'' }}
    </span>
    <span v-if="text === undefined">
      undefined
    </span>
    <span v-if="text === null">
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
export default {
  name: 'doc-prop-text',
  props: {
    text: {
      default: ''
    }
  }
}
</script>
