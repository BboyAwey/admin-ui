<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个全屏多媒体预览组件，支持图片、视频和音频的预览。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="success" @click="visible = true">看看风景</au-button>
        <au-previewer :visible="visible" :media="media" @hide="visible = false"></au-previewer>
      </div>
      <!-- 组件示例 -->
    </au-panel>
    <au-panel class="section" title="Props">
      <au-table>
        <thead>
          <tr>
            <th>字段</th>
            <th>必填</th>
            <th>类型</th>
            <th>默认</th>
            <th>可选</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>media</td>
            <td>
              <au-icon type="check" class="au-theme-color--success"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              Array<br>
              -Object
            </td>
            <td><au-icon type="times"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">src: 媒体地址</li>
                <li class="au-theme-border-color--base-8">alt: 媒体描述</li>
                <li class="au-theme-border-color--base-8">extension: 媒体扩展名</li>
              </ol>
            </td>
            <td>
              媒体地址和描述<br>
              如果src中不包含扩展名，请指定extension<br>
              反之则可不指定
            </td>
          </tr>
          <tr>
            <td>visible</td>
            <td>
              <au-icon type="check" class="au-theme-color--success"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>
              显示/隐藏预览器<br>
              请配合@hide事件使用
            </td>
          </tr>
          <tr>
            <td>current</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>0</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>当前显示的媒体index<br>从0开始</td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="Slots">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Events">
      <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>参数</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>@show</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">currentImage</li>
              </ol>
            </td>
            <td>
              预览器打开的时候触发<br>
              参数currentImage是一个表示当前正在显示的媒体的对象
            </td>
          </tr>
          <tr>
            <td>@hide</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">currentImage</li>
              </ol>
            </td>
            <td>
              预览器关闭的时候触发<br>
              参数currentImage是一个表示当前正在显示的媒体的对象
            </td>
          </tr>
          <tr>
            <td>@toggle</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">currentImage</li>
              </ol>
            </td>
            <td>
              用户切换媒体的时候触发<br>
              参数currentImage是一个表示当前正在显示的媒体的对象
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Methods">
      <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>参数</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>prev()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              显示上一媒体
            </td>
          </tr>
          <tr>
            <td>next()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              显示下一媒体
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-button type="success" @click="visible = true">看看风景</au-button>
        <au-previewer :visible="visible" :media="media" @hide="visible = false"></au-previewer>
      '></code-h>
      <code-h lang="js">
        export default {
          name: 'preview-examples',
          data () {
            return {
              visible: false,
              media: [
                {
                  src: '/images/1.jpg',
                  alt: 'Nice Scence 1'
                },
                {
                  src: '/test.mp4',
                  alt: '晚湖泛舟',
                  extension: 'mp4'
                },
                {
                  src: '/yes.wav',
                  alt: '浪叫'
                },
                {
                  src: '/images/3.jpg',
                  alt: 'Nice Scence 3'
                },
                {
                  src: '/images/4.jpg',
                  alt: 'Nice Scence 4'
                }
              ]
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
export default {
  name: 'preview-examples',
  data () {
    return {
      visible: false,
      media: [
        {
          src: '/images/1.jpg',
          alt: 'Nice Scence 1'
        },
        {
          src: '/test.mp4',
          alt: 'Nice Scence 2',
          extension: 'mp4'
        },
        {
          src: '/yes.wav',
          alt: 'Nice Scence 2'
        },
        {
          src: '/images/3.jpg',
          alt: 'Nice Scence 3'
        },
        {
          src: '/images/4.jpg',
          alt: 'Nice Scence 4'
        }
      ]
    }
  }
}
</script>
