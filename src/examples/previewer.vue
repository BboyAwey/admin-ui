<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个全屏图片预览组件。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="success" @click="display = true">看看风景</au-button>
        <au-previewer :display="display" :images="images" @hide="display = false"></au-previewer>
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
            <td>images</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              Array<br>
              -Object
            </td>
            <td><au-icon type="times"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">src: 图片地址</li>
                <li class="au-theme-border-color--base-8">alt: 图片描述</li>
              </ol>
            </td>
            <td>
              图片地址和描述
            </td>
          </tr>
          <tr>
            <td>display</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
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
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>0</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>当前显示的图片<span class="code au-theme-radius au-theme-background-color--warning-5">index</span> <br>从0开始</td>
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
              参数currentImage是一个表示当前正在显示的图片的对象
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
              参数currentImage是一个表示当前正在显示的图片的对象
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
              用户切换图片的时候触发<br>
              参数currentImage是一个表示当前正在显示的图片的对象
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
              显示上一张图片
            </td>
          </tr>
          <tr>
            <td>next()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              显示下一张图片
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-button type="success" @click="display = true">看看风景</au-button>
        <au-previewer :display="display" :images="images" @hide="display = false"></au-previewer>
      '></code-h>
      <code-h lang="js">
        export default {
          name: 'preview-examples',
          data () {
            return {
              display: false,
              images: [
                {
                  src: '/static/images/1.jpg',
                  alt: 'Nice Scence 1'
                },
                {
                  src: '/static/images/2.jpg',
                  alt: 'Nice Scence 2'
                },
                {
                  src: '/static/images/3.jpg',
                  alt: 'Nice Scence 3'
                },
                {
                  src: '/static/images/4.jpg',
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
        display: false,
        images: [
          {
            src: '/static/images/1.jpg',
            alt: 'Nice Scence 1'
          },
          {
            src: '/static/images/2.jpg',
            alt: 'Nice Scence 2'
          },
          {
            src: '/static/images/3.jpg',
            alt: 'Nice Scence 3'
          },
          {
            src: '/static/images/4.jpg',
            alt: 'Nice Scence 4'
          }
        ]
      }
    }
  }
</script>
