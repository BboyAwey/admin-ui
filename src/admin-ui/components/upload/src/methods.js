import { upload } from '../../../helpers/utils'

export default {
  methods: {
    uploadButtonClickHandler () {
      this.$refs.core.click()
    },
    intoDescEditingMode (i) {
      this.$set(this.editingStatus, i, true)
      this.lastDescription = this.$refs.desc[i].innerText
      this.$nextTick(() => {
        this.$refs.desc[i].focus()
      })
    },
    cancelDescEditingMode (i) {
      this.$refs.desc[i].innerText = this.lastDescription
      this.lastDescription = ''
      this.$set(this.editingStatus, i, false)
    },
    checkDescEditingMode (i) {
      if (this.autoUpload) {
        if (typeof this.beforeDescribe === 'function') {
          this.exceEventHandler(this.beforeDescribe, [this.$refs.desc[i].innerText, i], (data) => {
            // modify success
            this.changeDescription(i)
          }, err => {
            // modify fail
            if (err) console.warn(err)
            this.fallbackDescription(i)
          })
        } else {
          // this.fallbackDescription(i)
          this.changeDescription(i)
        }
      } else {
        this.changeDescription(i)
      }
    },
    changeDescription (i) {
      let temp = this.$refs.desc[i].innerText
      this.$refs.desc[i].innerText = ''
      this.modifyLocalFileList(i, 'description', temp)
      this.$refs.desc[i].innerText = temp.trim()
      this.lastDescription = ''
      this.$set(this.editingStatus, i, false)
    },
    fallbackDescription (i) {
      this.$refs.desc[i].innerText = this.lastDescription
      this.lastDescription = ''
      this.$set(this.editingStatus, i, false)
    },
    loadFiles (evt) {
      this.files = evt.target.files
    },
    async getFilesPreviewInfo (files) {
      let res = []
      for (let file of files) {
        let { type, name } = file
        let temp = { type, name }
        temp.extension = this.getExtension(name)
        if (/^image/ig.test(type)) {
          let readRes = await this.readUrlPromise(file)
          temp.base64 = readRes
          temp.isImage = true
        }
        temp.file = file
        temp.description = ''
        temp.timestamp = (new Date()).getTime() + res.length
        res.push(temp)
      }
      return res
    },
    getExtension (filename) {
      if (filename.indexOf('.') === -1 || (filename.match(/\./g).length === 1 && filename.indexOf('.') === 0)) {
        // no extension
        return 'file'
      } else {
        return filename.substring(filename.lastIndexOf('.') + 1) || filename
      }
    },
    isImage (extension) {
      let imageExts = {
        bmp: true,
        jpg: true,
        jpeg: true,
        png: true,
        gif: true
      }
      return !!imageExts[extension]
    },
    getValuePreviewInfo (value) {
      let vm = this
      return value.map(e => {
        let temp = Object.assign({}, e)
        temp.extension = vm.getExtension(temp.name)
        temp.isImage = vm.isImage(temp.extension)
        return temp
      })
    },
    readUrlPromise (file) {
      let reader = this.fileReader
      return new Promise((resolve, reject) => {
        reader.readAsDataURL(file)
        reader.onload = e => {
          resolve(reader.result)
        }
        reader.onError = err => {
          reject(err)
        }
      })
    },
    uploadFiles () {
      let vm = this
      for (let index = 0; index < vm.files.length; index++) {
        let relIndex = vm.localFileList.length - (vm.files.length - index)
        let uploadConfig = {
          action: vm.action,
          method: vm.method,
          withCredentials: vm.withCredentials,
          headers: vm.headers,
          file: vm.files[index],
          filename: vm.name || vm.files[index].name,
          data: vm.data,
          index,
          relIndex,
          onError (e) {
            vm.modifyLocalFileList(relIndex, 'isError', true)
            if (typeof vm.onError === 'function') vm.onError(e)
          },
          onProgress (e) {
            vm.modifyLocalFileList(relIndex, 'percent', e.percent)
            if (typeof vm.onProgress === 'function') vm.onProgress(e)
          },
          onSuccess (body) {
            console.log(body.url)
            vm.modifyLocalFileList(relIndex, 'url', body.url)
            vm.$emit('input', vm.localFileList)
            vm.$emit('change', vm.localFileList)
            if (typeof vm.onSuccess === 'function') vm.onSuccess(body)
          }
        }
        if (typeof vm.beforeUpload === 'function') {
          vm.exceEventHandler(vm.beforeUpload, [vm.localFileList, index], (data) => {
            upload(uploadConfig)
          }, (err) => {
            if (err) console.warn(err)
          })
        } else {
          upload(uploadConfig)
        }
      }
    },
    download (file, index) {
      if (typeof this.beforeDownload === 'function') {
        this.exceEventHandler(this.beforeDownload, [file, index], (data) => {
          this.triggleDownload(file.url)
        }, (err) => {
          if (err) console.warn(err)
        })
      } else {
        this.triggleDownload(file.url)
      }
    },
    triggleDownload (url) {
      if (url) {
        let a = window.document.createElement('a')
        a.href = url
        a.download = url
        a.click()
        a = null
      }
    },
    remove (index) {
      if (!this.autoUpload) {
        this.localFileList.splice(index, 1)
      } else {
        if (typeof this.beforeRemove === 'function') {
          this.exceEventHandler(this.beforeRemove, [this.localFileList[index], index], (data) => {
            this.localFileList.splice(index, 1)
          }, (err) => {
            if (err) console.warn(err)
          })
        } else {
          this.localFileList.splice(index, 1)
        }
      }
    },
    preview (index) {
      function showPreviewer (current) {
        this.images = this.getImgs(index)
        this.currentPreview = this.images.current
        this.previewerShow = true
      }
      if (this.canPreview) {
        if (typeof this.beforePreview === 'function') {
          this.exceEventHandler(this.beforePreview, [this.localFileList[index], index], (data) => {
            showPreviewer.call(this, index)
          }, (err) => {
            if (err) console.warn(err)
          })
        } else {
          showPreviewer.call(this, index)
        }
      }
    },
    getImgs (index) {
      let res = []
      this.localFileList.forEach((file, i) => {
        if (file.isImage) {
          res.push({
            src: file.base64 || file.url,
            alt: file.name
          })
          if (index === i) res.current = res.length - 1
        }
      })
      return res
    },
    modifyLocalFileList (index, key, value) {
      let temp = [].concat(this.localFileList)
      temp[index][key] = value
      this.localFileList = temp
    },
    exceEventHandler (handler, args, resolve, reject) {
      let p = handler(...args)
      if (p && p.then) {
        p.then((data) => {
          resolve(data)
        }, (err) => {
          reject(err)
        })
      } else {
        if (p === undefined || p) {
          resolve()
        } else {
          reject()
        }
      }
    }
  }
}
