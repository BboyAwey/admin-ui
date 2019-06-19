import { upload } from 'helpers/dom'

export default {
  methods: {
    chooseFiles () {
      this.$refs.core.click()
    },
    intoDescEditingMode (i) {
      this.$set(this.editingStatus, i, true)
      this.lastDescriptions[i] = this.$refs.desc[i].localValue
      this.$set(this.tempDescriptions, i, this.lastDescriptions[i])
      this.$nextTick(() => {
        this.$refs.desc[i].$refs.core.focus()
      })
    },
    cancelDescEditingMode (i) {
      this.$refs.desc[i].localValue = this.lastDescriptions[i]
      this.lastDescriptions[i] = ''
      this.$set(this.editingStatus, i, false)
    },
    checkDescEditingMode (i) {
      if (this.autoUpload) {
        if (typeof this.beforeDescribe === 'function') {
          this.exceEventHandler(this.beforeDescribe, [this.tempDescriptions[i], i], (data) => {
            // modify success
            this.changeDescription(i)
          }, err => {
            // modify fail
            if (err) console.warn(`Admin UI@upload@checkDescEditingMode: ${err}`)
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
      // let temp = this.$refs.desc[i].localValue
      // this.$refs.desc[i].innerText = ''
      this.modifyLocalFileList(i, 'description', this.$refs.desc[i].localValue)
      // this.$refs.desc[i].innerText = temp.trim()
      this.lastDescriptions[i] = ''
      this.$set(this.editingStatus, i, false)
    },
    fallbackDescription (i) {
      this.$refs.desc[i].localValue = this.lastDescriptions[i]
      this.lastDescriptions[i] = ''
      this.$set(this.editingStatus, i, false)
    },
    loadFiles (evt) {
      this.$emit('native-change', evt.target.files)
      if (evt.target.files && evt.target.files.length) {
        if (!this.files.length || !this.multiple) {
          this.files = Array.prototype.map.call(evt.target.files, (f) => {
            return f
          })
        } else {
          Array.prototype.forEach.call(evt.target.files, f => {
            let exists = false
            for (let fi of this.files) {
              if (
                fi.lastModified === f.lastModified &&
                fi.name === f.name &&
                fi.size === f.size &&
                fi.type === f.type
              ) {
                exists = true
                break
              }
            }
            if (!exists) this.files.push(f)
          })
        }
      }
    },
    async getFilesPreviewInfo (files) {
      let res = []
      for (let file of files) {
        let { type, name, url } = file
        let temp = { type, name, url }
        // extract name from url if not provide name
        if (!temp.name && !temp.url) {
          console.warn(`Admin UI@upload: the value of Upload component should be an Array and at least contains url or name property.`)
          return []
        }
        if (!temp.name && temp.url) {
          temp.name = this.getNameFromUrl(temp.url)
        }
        temp.extension = this.getExtension(name)
        if (/^image/ig.test(type)) {
          let readRes = await this.readUrlPromise(file)
          temp.base64 = readRes
          temp.isMedia = true
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
    getNameFromUrl (url) {
      return url.substring(url.lastIndexOf('/') + 1)
    },
    isMedia (extension) {
      const extensions = [
        'ogg', 'mp4', 'webm',
        'wav', 'mp3', 'bmp',
        'jpg', 'jpeg', 'png', 'gif'
      ]
      return extensions.includes(extension)
    },
    getValuePreviewInfo (value) {
      let vm = this
      return value.map(e => {
        let temp = Object.assign({}, e)
        // extract name from url if not provide name
        if (!temp.name && !temp.url) {
          console.warn(`Admin UI@upload: the value of Upload component should be an Array and at least contains url or name property.`)
          return []
        }
        if (!temp.name && temp.url) {
          temp.name = this.getNameFromUrl(temp.url)
        }
        temp.extension = vm.getExtension(temp.name)
        temp.isMedia = vm.isMedia(temp.extension)
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
      }).catch(e => {
        console.warn(`Admin UI@${this.$options._componentTag}@readUrlPromise: ${e}`)
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
            // console.log(body.url)
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
            if (err) console.warn(`Admin UI@upload@uploadFiles: ${err}`)
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
          if (err) console.warn(`Admin UI@upload@download: ${err}`)
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
        this.files.splice(index, 1)
      } else {
        if (typeof this.beforeRemove === 'function') {
          this.exceEventHandler(this.beforeRemove, [this.localFileList[index], index], (data) => {
            this.localFileList.splice(index, 1)
            this.files.splice(index, 1)
          }, (err) => {
            if (err) console.warn(`Admin UI@upload@remove: ${err}`)
          })
        } else {
          this.localFileList.splice(index, 1)
          this.files.splice(index, 1)
        }
      }
    },
    preview (index) {
      function showPreviewer (current) {
        this.media = this.getMedia(index)
        this.currentPreview = this.media.current
        this.previewerShow = true
      }
      if (this.canPreview) {
        if (typeof this.beforePreview === 'function') {
          this.exceEventHandler(this.beforePreview, [this.localFileList[index], index], (data) => {
            showPreviewer.call(this, index)
          }, (err) => {
            if (err) console.warn(`Admin UI@upload@preview: ${err}`)
          })
        } else {
          showPreviewer.call(this, index)
        }
      }
    },
    getMedia (index) {
      let res = []
      this.localFileList.forEach((file, i) => {
        if (file.isMedia) {
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
      this.$set(this.localFileList[index], key, value)
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
    },
    sameFiles (a, b) {
      if (!a || !b) return false
      let same = true
      if (a.length !== b.length) {
        same = false
      } else {
        for (let i = 0; i < a.length; i++) {
          if (!a[i] || !b[i]) {
            same = false
            break
          } else {
            if (Object.keys(a[i]).length !== Object.keys(b[i]).length) {
              same = false
              break
            } else {
              for (let key in a[i]) {
                if (a[i][key] !== b[i][key]) {
                  same = false
                  break
                }
              }
            }
          }
        }
      }
      return same
    }
  }
}
