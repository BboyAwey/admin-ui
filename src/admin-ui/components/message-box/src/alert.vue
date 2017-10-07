<template>
  <div class="au-alert">{{ message }}</div>
</template>
<script>
  export default {
    name: 'au-alert',
    props: {
      message: String
    }
  }
</script>
