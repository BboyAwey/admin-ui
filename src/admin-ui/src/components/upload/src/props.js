export default {
  props: {
    // ui props
    label: String,
    inline: Boolean,
    tips: Array,
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
      type: Boolean,
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
      type: Boolean,
      default: true
    },
    beforeRemove: Function,
    canDownload: {
      type: Boolean,
      default: true
    },
    beforeDownload: Function,
    canDescribe: {
      type: Boolean,
      default: true
    },
    beforeDescribe: Function,
    descriptionPlaceholder: String,
    canPreview: {
      type: Boolean,
      default: true
    },
    beforePreview: Function,
    autoUpload: {
      type: Boolean,
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
      type: Boolean,
      default: true
    },
    accept: String,
    // upload xhr api
    action: String,
    urlPath: {
      type: String,
      default: 'url'
    },
    baseUrl: {
      type: String,
      default: ''
    },
    method: String,
    data: Object,
    withCredentials: {
      type: Boolean,
      default: false
    },
    headers: Object,
    onProgress: Function,
    onError: Function,
    onSuccess: Function
  }
}
