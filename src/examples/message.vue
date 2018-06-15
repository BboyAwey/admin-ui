<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        消息组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="warning" @click="message">弹出消息</au-button>
      </div>
      <!-- 组件示例 -->
    </au-panel>
    <au-panel class="section" title="Props">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Slots">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="events">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Methods">
      <p class="paragraph">
        Message组件本身就是一个方法，用于显示一些简单的提示信息。如果是按需引入，则直接调用<span class="code au-theme-radius au-theme-background-color--warning-5">Message()</span>方法即可。如果是全局引入的Admin UI，则其会在Vue实例上注册<span class="code au-theme-radius au-theme-background-color--warning-5">$message()</span>方法（它是前者的别名）。方法接受一个表示选项的参数<span class="code au-theme-radius au-theme-background-color--warning-5">config</span>，其字段如下：
      </p>
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
            <td>message</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>消息内容</td>
          </tr>
          <tr>
            <td>duration</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">String</li>
                <li class="au-theme-border-color--base-8">Number</li>
              </ol>
            </td>
            <td>
              2000
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              消息显示持续时间<br>
              当为0时，不会自动关闭
            </td>
          </tr>
          <tr>
            <td>type</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              info
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">info</li>
                <li class="au-theme-border-color--base-8">primary</li>
                <li class="au-theme-border-color--base-8">success</li>
                <li class="au-theme-border-color--base-8">warning</li>
                <li class="au-theme-border-color--base-8">danger</li>
              </ol>
            </td>
            <td>
              消息类型
            </td>
          </tr>
          <tr>
            <td>icon</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              参考<router-link class="au-theme-font-color--info-3" :to="{path: '/icon'}" target="_blank">图标组件</router-link>
            </td>
            <td>
              消息图标<br>
              默认图标会随messageType的不同而不同
            </td>
          </tr>
          <tr>
            <td>closeable</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Boolean</td>
            <td>
              false
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>是否显示关闭按钮</td>
          </tr>
          <tr>
            <td>customClass</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>自定义消息样式类</td>
          </tr>
        </tbody>

      </au-table>
      <p class="paragraph">
        <span class="code au-theme-radius au-theme-background-color--warning-5">Message()</span>方法返回一个<span class="code au-theme-radius au-theme-background-color--warning-5">Message</span>实例，它是一个Vue实例，可以让其监听<span class="code au-theme-radius au-theme-background-color--warning-5">close</span>事件。
      </p>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-button type="warning" @click="message">弹出消息</au-button>
      '></code-h>
      <code-h lang="js">
        export default {
          name: 'message-examples',
          methods: {
            message () {
              let messageIns = this.$message({
                message: '一则消息',
                duration: 0,
                type: 'primary',
                icon: '',
                closeable: true,
                customClass: ''
              })
              messageIns.$on('close', () => {
                console.log('Closed!')
              })
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
export default {
  name: 'message-examples',
  methods: {
    message () {
      let messageIns = this.$message({
        message: '一则消息',
        type: 'primary',
        icon: '',
        closeable: true,
        customClass: ''
      })
      messageIns.$on('close', () => {
        console.log('Closed!')
      })
    }
  }
}
</script>
