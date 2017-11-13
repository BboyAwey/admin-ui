<template>
  <div class="au-confirm au-theme-font-color--base-3">{{ message }}</div>
</template>
<script>
  export default {
    name: 'au-confirm',
    props: {
      message: String
    }
  }
</script>
