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
      line-height: 64px;
      font-size: 16px;
      text-align: center;
      color: #fff;
    }
    .au-upload-preview-default-icon {
      position: relative;
      line-height: inherit;
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
      max-width: 75%;
      outline: none;
      line-height: $normal * 2;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: $normal;
    }
    .au-upload-file-operation-icon {
      display: none;
      cursor: pointer;
    }
    .au-upload-file-desc-icon {
      position: relative;
      top: -8px;
      margin-left: 10px;
    }
    .au-upload-desc-icon-editing {
      top: 0;
    }
    .au-upload-file-edit-icon-container {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    .au-upload-desc-core {
      // width: 75%;
      margin-top: 5px;
      margin-bottom: 6px;
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
      margin-top: 4px;
    }
    .au-upload-file-description {
      max-width: 170px;
    }
    .au-upload-desc-core {
      width: 142px;
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
    <form-item
      :label="label"
      :inline="inline"
      :tips="tips"
      :size="buttonSize"
      :middle="inline">
      <au-button
        class="au-upload-button au-plain"
        :type="buttonType"
        :size="buttonSize"
        :plain="buttonPlain"
        v-show="showUploadButton"
        :disabled="disabled"
        @click="uploadButtonClickHandler">
        <au-icon class="au-upload-button-icon" type="upload" />
        <span class="au-upload-button-text">{{ buttonText }}</span>
      </au-button>
    </form-item>
    <ul class="au-upload-file-list" :class="{'au-upload-file-inline-list': listType === 'inline' }" v-show="showFileList">
      <li
        v-for="(file, index) in localFileList"
        :key='file.timestamp'
        @mouseenter="mouseenter = true"
        @mouseleave="mouseenter = false"
        :class="{'au-upload-desc-mode': editingStatus[index]}"
        class="
          au-theme-border-color--base-10
          au-theme-background-color--base-12
          au-theme-hover-background-color--base-11
          au-theme-border-radius--small
        ">
        <div
          class="
            au-upload-preview-icon
            au-theme-border-radius--small
          "
          :class="{
            'au-theme-background-color--base-9': !file.url,
            'au-theme-background-color--primary': file.url
          }"
          v-show="!(autoUpload ? (file.isImage && file.url) : (file.isImage && file.base64))">
          <div
            :class="{
              'au-theme-after-border-top-color--base-12-important': !mouseenter,
              'au-theme-after-border-top-color--base-11-important': mouseenter
            }"
            class="
              au-upload-preview-default-icon
              au-theme-before-border-radius--small
              au-theme-before-background-color--base-12
          ">{{ file.extension.toUpperCase().substring(0, 4) }}</div>
        </div>
        <img class="au-upload-preview-icon"
          :style="{ cursor: canPreview ? 'pointer' : 'default' }"
          :src="autoUpload ? (file.base64 || file.url) : file.base64"
          @click="preview(index)"
          v-if="autoUpload ? (file.isImage && file.url) : (file.isImage && file.base64)">
        <p class="au-upload-file-info au-theme-color--base-3" :class="{'au-upload-no-desc': !canDescribe}">
          <span class="au-upload-file-name au-theme-color--primary">{{ file.name }}</span><br>
          <span class="au-upload-file-description"
            :class="{
              'au-theme-color--base-8': !value[index] && !file.description || (value[index] && !value[index].description),
              'au-upload-inline-desc': listType === 'inline'
            }"
            v-show="canDescribe && !editingStatus[index]">
            {{ (value[index] ? value[index].description : file.description) || '填写文件描述' }}
          </span>
          <au-input
            class="au-upload-desc-core"
            size="small"
            v-show="canDescribe && editingStatus[index]"
            ref="desc"
            v-model="file.description"></au-input>
          <au-icon
            class="
              au-upload-file-operation-icon
              au-upload-file-desc-icon
              au-theme-color--base-8
              au-theme-hover-color--base-3"
            type="pencil"
            v-show="canDescribe && !editingStatus[index]"
            @click.native="intoDescEditingMode(index)"/>
          <au-icon
            class="
              au-upload-file-operation-icon
              au-upload-file-desc-icon
              au-upload-desc-icon-editing
              au-theme-color--base-8
              au-theme-hover-color--base-3"
            type="check"
            v-show="canDescribe && editingStatus[index]"
            @click.native="checkDescEditingMode(index)"/>
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-desc-icon au-upload-desc-icon-editing  au-theme-color--base-8 au-theme-hover-color--base-3"
            type="times"
            v-show="canDescribe && editingStatus[index]"
            @click.native="cancelDescEditingMode(index)"/>
          <span
            class="au-upload-progress-bar"
            :class="{
              'au-theme-background-color--danger-bottom': file.isError,
              'au-theme-background-color--primary-bottom': !file.isError
            }"
            v-show="file.isError ? true : (file.percent !== 100 && file.percent !== undefined)">
            <span
              class="au-upload-progress-bar-core"
              :class="{
                'au-theme-background-color--danger': file.isError,
                'au-theme-background-color--primary': !file.isError
              }"
              :style="{width: file.percent + '%'}"></span>
          </span>
        </p>
        <span class="au-upload-file-edit-icon-container">
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-edit-icon au-upload-file-delete au-theme-color--base-11 au-theme-hover-color--base-3"
            type="close"
            v-show="canRemove"
            @click.native="remove(index)"/>
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-edit-icon au-upload-file-download au-theme-color--base-11 au-theme-hover-color--base-3"
            type="cloud-download"
            v-show="canDownload && file.url"
            @click.native="download(file, index)"/>
        </span>
      </li>
    </ul>
    <au-previewer
      :images="images"
      :visible="previewerVisible"
      :current="currentPreview"
      @hide="() => { this.previewerVisible = false }"/>
  </div>
</template>
<script>
import AuIcon from '../../icon'
import AuPreviewer from '../../previewer'
import methods from './methods'
import props from './props'
import FormItem from '../../../helpers/form-item.vue'

export default {
  name: 'au-upload',
  components: { AuIcon, AuPreviewer, FormItem },
  mixins: [methods, props],
  data () {
    return {
      desc: 'this is a file desc. this is a file desc. this is a file desc. this is a file desc. this is a file desc.',
      files: [],
      localFileList: this.getValuePreviewInfo(this.value),
      editingStatus: [],
      descriptions: [],
      lastDescriptions: [],
      fileReader: new window.FileReader(),
      images: [],
      previewerVisible: false,
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
        if (v.length !== this.localFileList.length) this.localFileList = this.getValuePreviewInfo(v)
      }
    },
    localFileList: {
      deep: true,
      handler (v) {
        if (!this.autoUpload) {
          let isSame = true
          for (let i = 0; i < v.length; i++) {
            if (!this.value || !this.value[i] || v[i].file !== this.value[i].file) {
              isSame = false
              break
            }
          }
          if (!!v.length || !isSame) {
            this.$emit('input', v)
            this.$emit('change', v)
          }
        }
      }
    },
    autoUpload (v) {
      if (v) this.uploadFiles()
    }
  }
}
</script>
