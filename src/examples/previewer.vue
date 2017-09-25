
<style lang="scss" scoped>
  .previewer {
    padding: 40px;
  }
</style>
<template>
  <div class="previewer">
    <au-button type="info" @click="() => { preview = true }">priviewer on </au-button>
    <previewer
      :display="preview"
      :images="imgs"
      @toggle="change"
      @hide="() => { preview = false }"/>
  </div>
</template>
<script>
  import Previewer from '../admin-ui/components/previewer'
  export default {
    components: { Previewer },
    data () {
      return {
        preview: false,
        imgs: [
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497347898652&di=5d613aaa6ab7f268d4aa98a0f43ed420&imgtype=0&src=http%3A%2F%2Fic.topit.me%2Fc%2F3c%2Ff6%2F1110230348da8f63cco.jpg',
            alt: 'Amazing View 1'
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497347896684&di=17cfbac0790092e27fe7c8627326611d&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F58%2F87%2F56%2Fpic_lib%2Fwm%2F1.jpg',
            alt: 'Amazing View 2'
          },
          {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497347893275&di=6ae928463253b715393b3ff8f1674b3c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F53293144331e4.jpg',
            alt: 'Amazing View 3'
          }
        ]
      }
    },
    methods: {
      change (v) {
        console.log(v)
      }
    }
  }
</script>
