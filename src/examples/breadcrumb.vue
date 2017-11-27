<template>
  <div class="breadcrumb">
    <au-breadcrumb :crumbs="crumbs" @select="select"/>
  </div>
</template>
<script>
  export default {
    name: 'breadcrumb-examples',
    data () {
      return {
        crumbs: [
          {
            text: 'Admin UI',
            url: '/'
          },
          {
            text: '组件',
            url: ''
          },
          {
            text: '面包屑',
            url: '/breadcrumb'
          }
        ]
      }
    },
    methods: {
      select (crumb) {
        console.log(crumb.text, crumb.url)
        // this.$router.push(crumb.url)
      }
    }
  }
</script>

