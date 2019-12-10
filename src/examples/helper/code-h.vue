<style lang="scss">
  .line-numbers-rows {
    span {
      line-height: 1.5;
    }
  }
</style>

<template>
  <au-scroller direction="horizontal" :offset="0" :scaleable="false">
    <pre class="code-h line-numbers"><code :class="'language-' + lang" ref="codeBlock"><slot></slot></code></pre>
  </au-scroller>
</template>
<script>
import Prism from 'prismjs'

Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  'break-lines': 8888,
  'remove-initial-line-feed': false
})

export default {
  name: 'code-h',
  data () {
    return {}
  },
  mounted () {
    if (this.content) {
      this.$refs.codeBlock.innerHTML = this.normalizeContent(this.content)
    }
    Prism.highlightAll()
  },
  props: {
    lang: {
      default: '',
      type: String
    },
    content: {
      default: '',
      type: String
    }
  },
  watch: {
    content (v) {
      this.$ref.codeBlock.innerText = this.normalizeContent(v)
      Prism.highlightAll()
    }
  },
  methods: {
    normalizeContent (v) {
      let content = v.split('\n')
        .map(c => {
          c = c.replace(/</g, '&lt;')
          c = c.replace(/>/g, '&gt;')
          c = c.replace(/\\\{/g, '{')
          c = c.replace(/\\\}/g, '}')
          return c
        })
        .join('\n')
      return content
    }
  }
}
</script>
