export default {
  props: {
    // ui props
    buttonText: {
      default: '上传文件'
    },
    // button props
    buttonSize: String,
    buttonType: {
      default: 'primary'
    },
    buttonPlain: Boolean,
    disabled: Boolean,

    showUploadButton: {
      default: true
    },
    showFileList: {
      default: true,
      type: Boolean
    },
    listType: {
      type: String,
      default: 'block'
    },
    canRemove: {
      default: true
    },
    beforeRemove: Function,
    canDownload: {
      default: true
    },
    beforeDownload: Function,
    canDescribe: {
      default: true
    },
    beforeDescribe: Function,
    descriptionPlaceholder: String,
    canPreview: {
      default: true
    },
    beforePreview: Function,
    autoUpload: {
      default: true
    },
    value: {
      type: Array,
      required: true
    },
    beforeUpload: Function,
    // file input props
    name: String,
    multiple: {
      default: true
    },
    accept: String,
    // upload xhr api
    action: String,
    method: String,
    data: Object,
    withCredentials: {
      default: false
    },
    headers: Object,
    onProgress: Function,
    onError: Function,
    onSuccess: Function
  }
}
