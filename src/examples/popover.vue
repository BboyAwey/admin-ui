<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        气泡提示
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-popover ref="myPopover">
          <au-button slot="target" type="primary">A:(top center, hover)</au-button>
          <div slot="content">
            <p style="font-size: 14px; padding: 10px;">
              Hi Popover! Hi Popover!
            </p>
          </div>
        </au-popover>
        <au-popover placement="right middle" trigger="click" :plain="true">
          <au-button slot="target" type="primary">B:(right top, click)</au-button>
          <div slot="content">
            <p style="font-size: 14px; padding: 10px;">
              Hi Popover! Hi Popover!
            </p>
          </div>
        </au-popover>
        <au-button @click="show" type="success">click show the prev popover</au-button>
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
            <td>trigger</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>hover</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">hover</li>
                <li class="au-theme-border-color--base-8">click</li>
              </ol>
            </td>
            <td>
              触发方式
            </td>
          </tr>
          <tr>
            <td>triangle</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Boolean</td>
            <td>true</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>
              是否显示三角形
            </td>
          </tr>
          <tr>
            <td>plain</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>是否为空心样式</td>
          </tr>
          <tr>
            <td>placement</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>top center</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">top left</li>
                <li class="au-theme-border-color--base-8">top center</li>
                <li class="au-theme-border-color--base-8">top right</li>
                <li class="au-theme-border-color--base-8">right top</li>
                <li class="au-theme-border-color--base-8">right middle</li>
                <li class="au-theme-border-color--base-8">right bottom</li>
                <li class="au-theme-border-color--base-8">bottom left</li>
                <li class="au-theme-border-color--base-8">bottom center</li>
                <li class="au-theme-border-color--base-8">bottom right</li>
                <li class="au-theme-border-color--base-8">left top</li>
                <li class="au-theme-border-color--base-8">left middle</li>
                <li class="au-theme-border-color--base-8">left bottom</li>
              </ol>
            </td>
            <td>提示框与触发元素的对齐方式</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>禁用</td>
          </tr>
          <tr>
            <td>fix</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="minus"></au-icon>
            </td>
            <td>String</td>
            <td>false</td>
            <td>
              合法的css长度值
            </td>
            <td>
              有时可能出现提示框定位不准的情况<br>
              当消息框与目标元素垂直排列时，fix为水平方向的位置调整<br>
              当消息框与目标元素水平排列时，fix为垂直方向的位置调整<br>
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="Slots">
      <au-table>
        <thead>
          <tr>
            <th>名称</th
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>target</td>
            <td>
              触发提示框的目标元素
            </td>
          </tr>
          <tr>
            <td>content</td>
            <td>
              提示框内的内容
              <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
                提示框的内容最外层的元素不能设置margin-bottom，否则会把三角形顶出来
              </cite>
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Events">
      <au-icon type="minus"></au-icon>
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
            <td>show()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              显示提示框
            </td>
          </tr>
          <tr>
            <td>hide()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              隐藏提示框
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-popover ref="myPopover">
          <au-button slot="target" type="primary">A:(top center, hover)</au-button>
          <div slot="content">
            <p style="font-size: 14px; padding: 10px;">
              Hi Popover! Hi Popover!
            </p>
          </div>
        </au-popover>
      '></code-h>
      <h4 class="title-1">方法调用</h4>
      <code-h lang="html" content='
        <au-popover ref="myPopover">
          <au-button slot="target" type="primary">A:(top center, hover)</au-button>
          <div slot="content">
            <p style="font-size: 14px; padding: 10px;">
              Hi Popover! Hi Popover!
            </p>
          </div>
        </au-popover>
        <au-button @click="show" type="success">click show the prev popover</au-button>
      '></code-h>
      <code-h lang="js">
        export default {
          methods: {
            show () {
              this.$refs.myPopover.show()
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'button-examples',
    methods: {
      show () {
        this.$refs.myPopover.show()
      }
    }
  }
</script>
