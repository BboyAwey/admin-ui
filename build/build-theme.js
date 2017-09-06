// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914

var sass = require('node-sass')
var chalk = require('chalk')
var fs = require('fs')

var themes = ['light', 'dark']

themes.forEach(theme => {
  sass.render({
    file: `./src/admin-ui-2/themes/default/${theme}.scss`,
    outputStyle: 'expanded'
  }, function (err, res) {
    if (err) throw err
    // No errors during the compilation, write this result on the disk 
    fs.writeFile(`./src/admin-ui-2/themes/default/${theme}.css`, res.css, function(err){
      if(err) throw err
      console.log(chalk.cyan(`  ${theme} theme build complete.\n`))
    })
  })
})
