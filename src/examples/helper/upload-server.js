var express = require('express')
var router = express.Router()
var multiparty = require('multiparty')
var fs = require('fs')
var path = require('path')

const uploadDir = path.join(__dirname, './files')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

router.get('/upload', (req, res) => {
  res.end('Can not use GET to upload files')
})
router.post('/upload', (req, res) => {
  var form = new multiparty.Form({
    uploadDir
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log('parse error: ' + err)
    } else {
      let file = Object.values(files)[0][0]
      fs.rename(file.path, path.join(uploadDir, file.fieldName), () => {
        res.end(JSON.stringify({ url: 'http://127.0.0.1:1234/files/' + file.fieldName }))
      })
    }
  })
})
var app = express()
app.all('/upload', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use('/files', express.static(uploadDir))
app.use('/', router)
app.listen(1234, () => {
  console.log('Upload srever run on 1234')
})
