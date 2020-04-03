<style>

</style>

<template>
  <doc-section title="组件描述">
    <doc-p>{{ description }}</doc-p>
    <doc-example>
      <slot></slot>
    </doc-example>
  </doc-section>
</template>

<script>
import DocSection from './section'
import DocP from './paragraph'
import DocExample from './example'

export default {
  name: 'doc-description',
  components: { DocSection, DocP, DocExample },
  props: {
    description: String
  }
}
</script>
