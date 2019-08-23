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
      height: 82px;
      padding: 8px;
      border-width: 1px;
      border-style: solid;
      overflow: hidden;
    }
    & > li:not(:last-child) {
      margin-bottom: 8px;
    }
    // & > li:hover {
    //   .au-upload-file-operation-icon {
    //     display: inline-block;
    //   }
    // }
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
    .au-upload-white-overlay {
      display: block;
      position: absolute;
      right: -12px;
      top: -12px;
      border-width: 11px;
      border-style: solid;
      transform: rotate(-135deg);
    }
    & > li:hover {
      .au-upload-preview-default-icon:after {
        opacity: 1;
      }
    }
    .au-upload-preview-icon {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 64px;
      height: 64px;
      line-height: 64px;
      font-size: 16px;
      text-align: center;
      background-size: cover;
      background-position: center center;
    }
    .au-upload-preview-icon-video {
      width: 100%;
      height: 100%;
    }
    .au-upload-preview-icon-video-play {
      position: absolute;
      top: 20px;
      left: 22px;
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
      border-width: 11px;
      border-style: solid;
      transform: rotate(-135deg);
      opacity: 0;
    }
    .au-upload-file-info {
      position: relative;
      height: 100%;
      padding-left: 80px;
      margin-bottom: 0;
      & > p {
        position: relative;
        height: 100%;
      }
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
      // max-width: 75%;
      width: 100%;
      outline: none;
      line-height: $normal * 2;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: $normal;
    }
    .au-upload-file-operation-icon {
      // display: none;
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
      width: 100%;
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
    }
    .au-upload-progress-bar {
      position: absolute;
      width: 100%;
      left: 0;
      bottom:5px;
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
      // max-width: 170px;
    }
    // .au-upload-desc-core {
    //   width: 142px;
    // }
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
      v-if="showUploadButton || showFileList"
      :middle="inline">
      <au-button
        class="au-upload-button au-plain"
        :type="buttonType"
        :size="buttonSize"
        :plain="buttonPlain"
        v-if="showUploadButton"
        :disabled="disabled"
        @click="chooseFiles">
        <au-icon class="au-upload-button-icon" type="upload" />
        <span class="au-upload-button-text">{{ buttonText }}</span>
      </au-button>
    </form-item>
    <ul
      class="au-upload-file-list"
      :class="{'au-upload-file-inline-list': listType === 'inline' }"
      v-if="showFileList && localFileList.length"
      :style="{ marginTop: showUploadButton ? '16px' : 0 }">
      <li
        v-for="(file, index) in localFileList"
        :key='file.timestamp'
        :class="{'au-upload-desc-mode': editingStatus[index]}"
        class="
          au-theme-border-color--base-10
          au-theme-background-color--base-12
          au-theme-hover-background-color--base-11
          au-theme-border-radius--small
        ">
        <div class="au-upload-file-info au-theme-color--base-3">
          <p :class="{'au-upload-no-desc': !canDescribe}">
            <span class="au-upload-file-name au-theme-color--primary">{{ file.name }}</span><br>
            <span class="au-upload-file-description"
              :class="{
                'au-theme-color--base-8': !localFileList[index] && !file.description || (localFileList[index] && !localFileList[index].description),
                'au-upload-inline-desc': listType === 'inline'
              }"
              v-show="canDescribe && !editingStatus[index]" @click="intoDescEditingMode(index)">
              {{ (localFileList[index] ? localFileList[index].description : file.description) || '点击填写文件描述' }}
            </span>
            <au-input
              class="au-upload-desc-core" ref="desc"
              size="small" :inline="false" full-width
              v-show="canDescribe && editingStatus[index]"
              @focus="() => intoDescEditingMode(index)"
              @blur="() => checkDescEditingMode(index)"
              v-model="tempDescriptions[index]"></au-input>
            <!-- <au-icon
              class="
                au-upload-file-operation-icon
                au-upload-file-desc-icon
                au-theme-color--base-8
                au-theme-hover-color--base-3"
              type="pencil"
              v-show="canDescribe && !editingStatus[index]"
              @click.native="intoDescEditingMode(index)"/> -->
            <!-- <au-icon
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
              @click.native="cancelDescEditingMode(index)"/> -->
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
        </div>
        <!-- video icon -->
        <div class="au-upload-preview-icon au-theme-background-color--base-3"
          :style="{
            cursor: canPreview ? 'pointer' : 'default',
            fontSize: '24px'
          }"
          @click="preview(index)"
          v-if="autoUpload && file.isVideo && file.url">
          <video class="au-upload-preview-icon-video"
            :src="file.url"></video>
          <au-icon type="play" class="au-upload-preview-icon-video-play au-theme-color--base-12"/>
        </div>
        <!-- audio icon -->
        <div class="au-upload-preview-icon au-theme-background-color--base-3"
          :style="{
             cursor: canPreview ? 'pointer' : 'default',
             fontSize: '24px'
          }"
          @click="preview(index)"
          v-else-if="autoUpload && file.isAudio && file.url">
          <audio class="au-upload-preview-icon-video"
            :src="file.url"></audio>
          <au-icon type="volume-up" class="au-upload-preview-icon-video-play au-theme-color--base-12"/>
        </div>
        <!-- default icon -->
        <div
          class="
            au-upload-preview-icon
            au-theme-border-radius--small
            au-theme-color--base-12
          "
          :class="{
            'au-theme-background-color--base-9': !file.url,
            'au-theme-background-color--primary': file.url
          }"
          :style="{
             cursor: file.isMedia ? 'pointer' : 'default'
          }"
          v-else>
          <div
            class="
              au-upload-preview-default-icon
              au-theme-before-border-radius--small
              au-theme-before-background-color--base-12
              au-theme-after-border-color--base-11-important">
            <span class="au-upload-white-overlay au-theme-after-border-color--base-12-important"></span>
            {{ file.extension && file.extension.toUpperCase().substring(0, 4) }}
          </div>
        </div>
        <!-- image icon -->
        <div class="au-upload-preview-icon"
          :style="{
             cursor: canPreview ? 'pointer' : 'default',
             backgroundImage: `url(${file.base64 || file.url})`
          }"
          @click="preview(index)"></div>
        <!-- v-if="(autoUpload && file.isImage) && (file.base64 || file.url)"></div> -->
        <span class="au-upload-file-edit-icon-container">
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-edit-icon au-upload-file-delete au-theme-color--base-8 au-theme-hover-color--base-3"
            type="close"
            v-show="canRemove"
            @click.native="remove(index)"/>
          <au-icon
            class="au-upload-file-operation-icon au-upload-file-edit-icon au-upload-file-download au-theme-color--base-8 au-theme-hover-color--base-3"
            type="cloud-download"
            v-show="canDownload && file.url"
            @click.native="download(file, index)"/>
        </span>
      </li>
    </ul>
    <au-previewer
      v-if="showFileList"
      :media="media"
      :visible="previewerVisible"
      :current="currentPreview"
      @toggle="(c, i) => this.currentPreview = i"
      @hide="() => { this.previewerVisible = false }"/>
  </div>
</template>
<script>
import AuIcon from 'components/icon'
import AuPreviewer from 'components/previewer'
import methods from './methods'
import props from './props'
import FormItem from 'helpers/form-item.vue'

export default {
  name: 'au-upload',
  components: { AuIcon, AuPreviewer, FormItem },
  mixins: [methods, props],
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      desc: 'this is a file desc. this is a file desc. this is a file desc. this is a file desc. this is a file desc.',
      files: [],
      localFileList: [],
      editingStatus: [],
      descriptions: [],
      lastDescriptions: [],
      tempDescriptions: [],
      fileReader: new window.FileReader(),
      media: [],
      previewerVisible: false,
      currentPreview: 0
    }
  },
  watch: {
    value: {
      deep: true,
      handler (v) {
        if (!this.sameFiles(v, this.localFileList)) this.localFileList = this.getValuePreviewInfo(v)
      }
    },
    localFileList: {
      deep: true,
      handler (v) {
        this.$emit('change', v.map(f => Object.assign({}, f)))
      }
    },
    autoUpload (v) {
      if (v) this.uploadFiles()
    }
  },
  mounted () {
    this.localFileList = this.getValuePreviewInfo(this.value)
  }
}
</script>
