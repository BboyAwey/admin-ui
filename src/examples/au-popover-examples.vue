<style lang="scss">
  .au-popover-examples {
    padding: 10px 0 0 10px ;
  }
</style>
<template>
  <div class="au-popover-examples">
    <p style="padding: 20px 0;">show() 和 hide() 方法</p>
    <p style="padding: 20px 0;">@show和@hide事件</p>
    <au-popover ref="popover" name="myPop" placement="right top" trigger="click">
      <au-button slot="target">出现吧</au-button>
      <div slot="content" style="width: 300px; height: 100px; overflow: hidden;">
        aaaaaaaaaaaa, ipsum dolor sit amet consectetur adipisicing elit. Corporis placeat vitae eaque? Maiores ab laborum voluptatem iure, vero laudantium ad corporis dolorem repudiandae. Soluta quis, quaerat tempore labore dolore ullam.
      </div>
    </au-popover>
  </div>
</template>
<script>
  export default {
    name: 'au-popover-examples',
    mounted () {
      // console.log('father mounted')
    }
  }
</script>
