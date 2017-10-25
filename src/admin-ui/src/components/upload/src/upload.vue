<style lang="scss">
  @import '../../../style/vars';
  .au-upload {
    .au-upload-button {
      padding-bottom: 4px;
    }
    .au-upload-button-icon {
      margin-right: 4px;
    }
    .au-upload-button-text {
      position: relative;
      top: -1px;
    }
  }
  .au-upload-inner {
    display: none;
  }
  .au-upload-file-list {
    margin-top: 16px;
    & > li {
      position: relative;
      min-height: 80px;
      padding: 8px;
      border-width: 1px;
      border-style: solid;
    }
    & > li:not(:last-child) {
      margin-bottom: 8px;
    }
    & > li:hover {
      .au-upload-file-operation-icon {
        display: inline-block;
      }
    }
    & > li.au-upload-desc-mode {
      .au-upload-file-desc-icon {
        display: inline-block;
      }
    }
    & > li:after {
      content: '';
      display: block;
      clear: both;
    }
    .au-upload-preview-icon {
      float: left;
      width: 64px;
      height: 64px;
      border-radius: 2px;
      line-height: 64px;
      font-size: 16px;
      text-align: center;
      color: #fff;
    }
    .au-upload-preview-default-icon {
      position: relative;
    }
    .au-upload-preview-default-icon:before {
      content: "";
      display: block;
      position: absolute;
      right: -2px;
      top: -2px;
      width: 16px;
      height: 16px;
      opacity: .4;
    }
    .au-upload-preview-default-icon:after {
      content: "";
      display: block;
      position: absolute;
      right: -12px;
      top: -12px;
      border: 11px solid transparent;
      transform: rotate(-135deg)
    }
    .au-upload-file-info {
      padding-left: 80px;
      margin-bottom: 0;
    }
    .au-upload-no-desc {
      margin: 0;
      height: 64px;
      line-height: 64px;
    }
    .au-upload-file-name {
      line-height: $normal;
    }
    .au-upload-file-description {
      display: inline-block;
      outline: none;
      line-height: $normal * 2;
    }
    .au-upload-file-operation-icon {
      display: none;
      cursor: pointer;
    }
    .au-upload-file-desc-icon {
      margin-left: 10px;
    }
    .au-upload-file-edit-icon-container {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    .au-upload-file-edit-icon {
      float: right;
    }
    .au-upload-file-download {
      position: relative;
    }
    .au-upload-file-delete {
      position: relative;
      margin-left: 10px;
    }
    .au-upload-file-progress {
      margin-top: 2px;
    }
    .au-upload-progress-bar, .au-upload-progress-bar-core {
      display: block;
      height: 4px;
      border-radius: 4px;
      margin-top: 4px;
    }
    .au-upload-progress-bar-core {
      width: 50%;
    }
  }
  .au-upload-file-inline-list {
    & > li {
      float: left;
      width: 320px;
      margin-right: 8px;
    }
    .au-upload-progress-bar {
      margin-top: -10px;
    }
  }
  .au-upload-file-inline-list:after {
    content: "";
    display: block;
    clear: both;
  }
</style>
<template>
  <div class="au-upload">
    <input
      type="file"
      class="au-upload-inner"
      ref="core"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      @change="loadFiles($event)"/>
    <au-button :type="buttonType" :size="buttonSize" :plain="buttonPlain" class="au-upload-button au-plain" v-show="showUploadButton" :disabled="disabled" @click="uploadButtonClickHandler">
      <au-icon class="au-upload-button-icon" type="upload" />
      <span class="au-upload-button-text">{{ buttonText }}</span>
    </au-button>
    <ul class="au-upload-file-list" :class="{'au-upload-file-inline-list': listType === 'inline' }" v-show="showFileList">
      <li
        v-for="(file, index) in localFileList"
        :key='file.timestamp'
        @mouseenter="mouseenter = true"
        @mouseleave="mouseenter = false"
        :class="{'au-upload-desc-mode': editingStatus[index]}"
        class="
          au-theme-border-color--base-8
          au-theme-background-color--base-12
          au-theme-hover-background-color--base-11
          au-theme-radius
        ">
        <div
          class="
            au-upload-preview-icon
          "
          :class="{
            'au-theme-background-color--base-8': !file.url,
            'au-theme-background-color--primary-3': file.url
          }"
          v-show="!(autoUpload ? (file.isImage && file.url) : (file.isImage && file.base64))">
          <div
            :class="{
              'au-theme-after-border-top-color--base-12-important': !mouseenter,
              'au-theme-after-border-top-color--base-11-important': mouseenter
            }"
            class="
              au-upload-preview-default-icon
              au-theme-before-radius
              au-theme-before-background-color--base-12
          ">{{ file.extension.toUpperCase().substring(0, 4) }}</div>
        </div>
        <img class="au-upload-preview-icon"
          :style="{ cursor: canPreview ? 'pointer' : 'default' }"
          :src="autoUpload ? (file.base64 || file.url) : file.base64"
          @click="preview(index)"
          v-show="autoUpload ? (file.isImage && file.url) : (file.isImage && file.base64)">
        <p class="au-upload-file-info au-theme-font-color--base-3" :class="{'au-upload-no-desc': !canDescribe}">
          <span class="au-upload-file-name au-theme-font-color--primary-3">{{ file.name }}</span><br>
          <span
            class="au-upload-file-description au-upload-description-placeholder"
            v-show="canDescribe && !editingStatus[index] && !((value[index] ? value[index].description : '') || file.description)">
            {{ descriptionPlaceholder || '填写文件描述' }}
          </span>
          <span class="au-upload-file-description"
            :contenteditable="editingStatus[index]"
            v-show="canDescribe"
            ref="desc">
            {{ (value[index] ? value[index].description : '') || file.description }}
          </span>
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-desc-icon au-theme-background-color--base-12 au-theme-font-color--base-6 au-theme-hover-font-color--base-3"
            type="pencil"
            v-show="canDescribe && !editingStatus[index]"
            @click.native="intoDescEditingMode(index)"/>
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-desc-icon au-theme-background-color--base-12 au-theme-font-color--base-6 au-theme-hover-font-color--base-3"
            type="check"
            v-show="canDescribe && editingStatus[index]"
            @click.native="checkDescEditingMode(index)"/>
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-desc-icon  au-theme-background-color--base-12 au-theme-font-color--base-6 au-theme-hover-font-color--base-3"
            type="times"
            v-show="canDescribe && editingStatus[index]"
            @click.native="cancelDescEditingMode(index)"/>
          <span
            class="au-upload-progress-bar"
            :class="{
              'au-theme-background-color--danger-5': file.isError,
              'au-theme-background-color--primary-5': !file.isError
            }"
            v-show="file.isError ? true : (file.percent !== 100 && file.percent !== undefined)">
            <span
              class="au-upload-progress-bar-core"
              :class="{
                'au-theme-background-color--danger-3': file.isError,
                'au-theme-background-color--primary-3': !file.isError
              }"
              :style="{width: file.percent + '%'}"></span>
          </span>
        </p>
        <span class="au-upload-file-edit-icon-container">
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-edit-icon au-upload-file-delete au-theme-font-color--base-6 au-theme-hover-font-color--base-3"
            type="close"
            v-show="canRemove"
            @click.native="remove(index)"/>
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-edit-icon au-upload-file-download au-theme-font-color--base-6 au-theme-hover-font-color--base-3"
            type="cloud-download"
            v-show="canDownload && file.url"
            @click.native="download(file, index)"/>
        </span>
      </li>
    </ul>
    <au-previewer
      :images="images"
      :display="previewerShow"
      :current="currentPreview"
      @hide="() => { this.previewerShow = false }"/>
  </div>
</template>
<script>
  import auIcon from '../../icon'
  import auPreviewer from '../../previewer'
  import methods from './methods'
  import props from './props'

  export default {
    name: 'au-upload',
    components: { auIcon, auPreviewer },
    mixins: [methods, props],
    data () {
      return {
        desc: 'this is a file desc. this is a file desc. this is a file desc. this is a file desc. this is a file desc.',
        files: [],
        localFileList: this.getValuePreviewInfo(this.value),
        editingStatus: [],
        lastDescription: '',
        fileReader: new window.FileReader(),
        images: [],
        previewerShow: false,
        currentPreview: 0,
        mouseenter: false
      }
    },
    watch: {
      files: {
        deep: true,
        handler (v) {
          this.getFilesPreviewInfo(v).then(files => {
            if (this.multiple) {
              this.localFileList = this.localFileList.concat(files)
            } else {
              this.localFileList = files
            }
            if (this.autoUpload) this.uploadFiles()
          })
        }
      },
      value: {
        deep: true,
        handler (v) {
          this.localFileList = this.getValuePreviewInfo(v)
        }
      },
      localFileList: {
        deep: true,
        handler (v) {
          if (!this.autoUpload) {
            this.$emit('input', v)
            this.$emit('change', v)
          }
        }
      },
      autoUpload (v) {
        if (v) this.uploadFiles()
      }
    }
  }
</script>
