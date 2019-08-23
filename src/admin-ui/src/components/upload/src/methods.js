import { upload } from 'helpers/dom'

function joinPath (...pathes) {
  return pathes.reduce((prev, curr, i) => {
    curr = curr.trim()
    if (!curr || /^\s+$/g.test(curr)) return prev
    if (!i) return prev + curr
    if (curr[0] === '/' && prev[prev.length - 1] === '/') {
      return prev + curr.substring(1)
    } else if (curr[0] !== '/' && prev[prev.length - 1] !== '/') {
      return prev + '/' + curr
    } else return prev + curr
  }, '')
}

function getValueFromObj (path = '', target = {}) {
  path = path.split('.')
  let res = path.reduce((l, c) => {
    if (typeof l === 'object') {
      return l[c]
    } else {
      return null
    }
  }, target)
  return res
}

export default {
  methods: {
    chooseFiles () {
      this.$refs.core.click()
    },
    intoDescEditingMode (i) {
      this.$set(this.editingStatus, i, true)
      this.lastDescriptions[i] = this.localFileList[i].description
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
      this.modifyLocalFileList(i, 'description', this.$refs.desc[i].localValue)
      this.lastDescriptions[i] = ''
      this.$set(this.editingStatus, i, false)
    },
    fallbackDescription (i) {
      this.$refs.desc[i].localValue = this.lastDescriptions[i]
      this.lastDescriptions[i] = ''
      this.$set(this.editingStatus, i, false)
    },
    loadFiles (evt) {
      const nativeFiles = evt.target.files
      this.$emit('native-change', nativeFiles)
      if (nativeFiles && nativeFiles.length) {
        this.getFilesPreviewInfo(Array.prototype.map.call(nativeFiles, f => f)).then(files => {
          if (!this.multiple) this.localFileList = files
          else this.localFileList = this.localFileList.concat(files)
          if (this.autoUpload) this.uploadFiles()
        })
        this.$refs.core.value = ''
      }
    },
    async getFilesPreviewInfo (files) {
      let res = []
      for (let file of files) {
        let { type, name, url } = file
        let temp = { type, name, url }

        temp.extension = this.getExtension(name)
        let mediaType = this.getMediaType(temp.extension)
        if (mediaType === 'image') {
          let readRes = await this.readUrlPromise(file)
          temp.base64 = readRes
          temp.isImage = true
        } else if (mediaType === 'video') {
          temp.isVideo = true
        } else if (mediaType === 'audio') {
          temp.isAudio = true
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
    getMediaType (extension) {
      const videos = ['ogg', 'mp4', 'webm']
      const audios = ['wav', 'mp3', 'bmp']
      const images = ['jpg', 'jpeg', 'png', 'gif']
      if (videos.includes(extension)) return 'video'
      if (audios.includes(extension)) return 'audio'
      if (images.includes(extension)) return 'image'
      return 'other'
    },
    getValuePreviewInfo (value) {
      let vm = this
      return value.map(e => {
        let temp = Object.assign({}, e)
        // extract name from url if not provide name
        if (!temp.name && !temp.url) {
          // console.warn(`Admin UI@upload: the value of Upload component should be an Array and at least contains url or name property.`)
          return []
        }
        if (!temp.name && temp.url) {
          temp.name = this.getNameFromUrl(temp.url)
        }
        temp.extension = vm.getExtension(temp.name)
        if (this.baseUrl && temp.url && temp.url.indexOf(this.baseUrl) !== 0) {
          temp.url = joinPath(this.baseUrl, temp.url || '')
        }
        let mediaType = vm.getMediaType(temp.extension)
        switch (mediaType) {
          case 'image':
            temp.isImage = true
            break
          case 'audio':
            temp.isAudio = true
            break
          case 'video':
            temp.isVideo = true
            break
        }
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
      for (let index = 0; index < vm.localFileList.length; index++) {
        let file = vm.localFileList[index]
        if (file.url || !file.file) continue
        let uploadConfig = {
          action: vm.action,
          method: vm.method,
          withCredentials: vm.withCredentials,
          headers: vm.headers,
          file: file.file,
          filename: vm.name || file.file.name,
          data: vm.data,
          index,
          onError (e) {
            vm.modifyLocalFileList(index, 'isError', true)
            if (typeof vm.onError === 'function') vm.onError(e)
          },
          onProgress (e) {
            vm.modifyLocalFileList(index, 'percent', e.percent)
            if (typeof vm.onProgress === 'function') vm.onProgress(e)
          },
          onSuccess (body) {
            const url = getValueFromObj(vm.urlPath || 'url', body)
            vm.modifyLocalFileList(
              index, 'url',
              url && url.indexOf(vm.baseUrl) !== 0
                ? joinPath(vm.baseUrl, url || '')
                : url
            )
            if (body.description !== undefined || body.description !== null) {
              vm.modifyLocalFileList(index, 'description', body.description)
            }
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
        let name = url.slice(url.lastIndexOf('/') + 1)
        if (name.indexOf('.') === -1) name = url
        a.download = name
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
      function showPreviewer () {
        this.media = this.getMedia(index)
        this.currentPreview = index
        this.previewerVisible = true
      }
      if (this.canPreview) {
        if (typeof this.beforePreview === 'function') {
          this.exceEventHandler(this.beforePreview, [this.localFileList[index], index], (data) => {
            showPreviewer.call(this)
          }, (err) => {
            if (err) console.warn(`Admin UI@upload@preview: ${err}`)
          })
        } else {
          showPreviewer.call(this)
        }
      }
    },
    getMedia (index) {
      let res = []
      this.localFileList.forEach((file, i) => {
        if (file.isImage || file.isAudio || file.isVideo) {
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
      if (this.localFileList[index]) {
        this.$set(this.localFileList[index], key, value)
      } else {
        this.$emit('change', this.localFileList)
      }
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
