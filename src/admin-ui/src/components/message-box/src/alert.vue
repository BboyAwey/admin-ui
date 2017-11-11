<template>
  <div class="au-alert au-theme-font-color--base-3">{{ message }}</div>
</template>
<script>
  export default {
    name: 'au-alert',
    props: {
      message: String
    }
  }
</script>
