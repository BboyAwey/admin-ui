<style lang="scss">
  .code-h {
    font-family: 'Consolas';
  }
  .code-h .number {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    min-width: 25px;
    display: inline-block;
    text-align: right;
    color: #555555;
    font-size: 14px;
    margin-right: 12px;
    line-height: 24px;
  }
  .number .hljs-number {
    font-size: 12px;
    color: #555555;
  }
</style>
<template>
  <pre class="code-h">
    <code :class="lang" class="au-theme-radius" ref="codeBlock">
      <slot></slot>
    </code>
  </pre>
</template>
<script>
  import hljs from 'highlightjs'
  import 'highlightjs/styles/atom-one-dark.css'

  export default {
    name: 'code-h',
    data () {
      return {}
    },
    mounted () {
      this.highlight()
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
      content () {
        this.highlight()
      }
    },
    methods: {
      addLineNumbers () {
        let codeBlock = this.$refs.codeBlock
        let lines = codeBlock.innerHTML.toString().split('\n')
        var temp = []
        var minimumSpace = null
        lines.forEach((line, i) => { // 去空行
          if (line !== '' && !/^\s+$/g.test(line)) {
            // console.log(line)
            let spaceCount = line.match(/^\s+/)[0].length
            if (minimumSpace) minimumSpace = spaceCount > minimumSpace ? minimumSpace : spaceCount // 其余计算最小缩进
            else minimumSpace = spaceCount // 首行直接存入
            temp.push(line)
          }
        })
        temp = temp.map((line, i) => { // 添加数字
          let reg = new RegExp('^[\\s]{' + minimumSpace + '}', 'g') // 去除行首不必要的缩进
          return '<span class="number">' + (i + 1) + '</span>' + line.replace(reg, '') + '\n'
        })
        temp.unshift('\n') // 首行空
        temp.push('\n') // 尾行空
        codeBlock.innerHTML = temp.join('')
      },
      escapeHtml () {
        if (this.lang === 'html' && this.content) {
          let codeBlock = this.$refs.codeBlock
          let content = this.content.replace(/</g, '&lt;')
          content = content.replace(/>/g, '&gt;')
          codeBlock.innerHTML = content
        }
      },
      highlight () {
        this.escapeHtml()
        hljs.highlightBlock(this.$refs.codeBlock, this.lang)
        this.addLineNumbers()
      }
    }

  }
</script>
