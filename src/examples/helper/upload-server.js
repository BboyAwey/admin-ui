var express = require('express')
var router = express.Router()
var multiparty = require('multiparty')
var fs = require('fs')

router.get('/upload', (req, res) => {
  console.log(res.writeHead)
  res.end('Can not use GET to upload files')
})
router.post('/upload', (req, res) => {
  var form = new multiparty.Form({
    uploadDir: '../../../static/files/'
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log('parse error: ' + err)
    } else {
      var inputFile = null
      for (let name in files) {
        inputFile = files[name][0]
      }
      var uploadedPath = inputFile.path
      var dstPsth = '../../../static/files/' + inputFile.originalFilename
      fs.rename(uploadedPath, dstPsth, err => {
        if (err) console.log('rename error: ' + err)
        else {
          res.end(JSON.stringify({url: '/static/files/' + inputFile.originalFilename}))
        }
      })
    }
  })
})
var app = express()
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use('/', router)
app.listen(3480, () => {
  console.log('srever run on 3480')
})
