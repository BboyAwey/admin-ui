<style lang="scss">
  .line-numbers-rows {
    span {
      line-height: 1.5;
    }
  }
</style>

<template>
  <pre class="code-h line-numbers"><code :class="'language-' + lang" ref="codeBlock"><slot></slot></code></pre>
</template>
<script>
import Prism from 'prismjs'

Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  'break-lines': 80,
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
        .filter(c => !/^\n+$/g.test(c) && c)
        .map(c => {
          c = c.replace('<', '&lt;')
          c = c.replace('>', '&gt;')
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
