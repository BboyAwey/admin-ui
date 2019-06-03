module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['prismjs', {
      languages: ['javascript', 'css', 'markup', 'json', 'bash', 'sass'],
      plugins: ['line-numbers', 'file-highlight', 'highlight-keywords', 'normalize-whitespace'],
      theme: 'okaidia',
      css: true
    }]
  ]
}
