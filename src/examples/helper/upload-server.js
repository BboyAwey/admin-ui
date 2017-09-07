var express = require('express')
var router = express.Router()
var multiparty = require('multiparty')
var fs = require('fs')
var util = require('util')

router.get('/upload', (req, res) => {
  res.end('Can not use GET to upload files')
})
router.post('/upload', (req, res) => {
  var form = new multiparty.Form({
    uploadDir: './files'
  })
  form.parse(req, (err, fields, files) => {
    var filesTmp = JSON.stringify(files, null, 2)
    if (err) {
      console.log('parse error: ' + err)
    } else {
      console.log('parse file: ' + filesTmp)
      var inputFile = files.inputFile[0]
      var uploadedPath = inputFile.path
      var dstPsth = './files/' + inputFile.originalFilename
      fs.rename(uploadedPath, dstPsth, err => {
        if (err) console.log('rename error: ' + err)
        else console.log('rename OK')
      })
    }
    res.writeHead(200, {
      'Content-Type': 'text/plain;charset=utf-8'
    })
    res.write('received upload: \n\n')
    res.end(util.inspect({
      fields,
      files: filesTmp
    }))
  })
})
var app = express()
app.use('/', router)
app.listen(7000, () => {
  console.log('srever run on 3000')
})
