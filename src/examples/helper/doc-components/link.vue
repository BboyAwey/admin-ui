<template>
  <span>
    <a class="link au-theme-color--info" :href="href" target="_blank">
      <slot></slot>
    </a>
  </span>
</template>

<script>
export default {
  name: 'doc-link',
  props: {
    href: String
  }
}
</script>
