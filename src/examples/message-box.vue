<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        消息框组件，基于modal组件进行的封装
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="warning" @click="alert">Alert</au-button>
        <au-button type="success" @click="confirm">Confirm</au-button>
        <au-button type="primary" @click="prompt">Prompt</au-button>
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
        MessageBox组件本身就是一个方法。<br>
        如果是按需引入，则直接调用<span class="code au-theme-radius au-theme-background-color--warning-5">MessageBox()</span>方法或者调用MessageBox上附加的三个别名方法<span class="code au-theme-radius au-theme-background-color--warning-5">MessageBox.alert()</span>、<span class="code au-theme-radius au-theme-background-color--warning-5">MessageBox.confirm()</span>和<span class="code au-theme-radius au-theme-background-color--warning-5">MessageBox.prompt()</span>即可。<br>
        如果是全局引入的Admin UI，Admin UI会在Vue实例上注册<span class="code au-theme-radius au-theme-background-color--warning-5">$alert()</span>、<span class="code au-theme-radius au-theme-background-color--warning-5">$confirm()</span>和<span class="code au-theme-radius au-theme-background-color--warning-5">$prompt()</span>三个别名方法（他们是前三者的别名）。方法接受一个表示选项的参数<span class="code au-theme-radius au-theme-background-color--warning-5">config</span>，其字段如下：
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
            <td>type</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>alert</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">alert</li>
                <li class="au-theme-border-color--base-8">confirm</li>
                <li class="au-theme-border-color--base-8">prompt</li>
              </ol>
            </td>
            <td>消息框类型<br>当使用别名方法时不需要该字段</td>
          </tr>
          <tr>
            <td>title</td>
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
            <td>标题</td>
          </tr>
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
            <td>confirm</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              当按下确认按钮时的回调函数
            </td>
          </tr>
          <tr>
            <td>confirmText</td>
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
            <td>确定按钮显示的文字</td>
          </tr>
          <tr>
            <td>cancel</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              当按下取消按钮时的回调函数（type为alert时不支持）
            </td>
          </tr>
          <tr>
            <td>cancelText</td>
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
            <td>取消按钮显示的文字（type为alert时不支持）</td>
          </tr>
          <tr>
            <td>validators</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Array<br>
              -Object
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">validator: Function，验证器函数，具体参见<router-link class="au-theme-font-color--info-3" :to="{path: '/input'}" target="_blank">输入框组件</router-link></li>
                <li class="au-theme-border-color--base-8">warning: String，验证失败后的警告信息，具体参见<router-link class="au-theme-font-color--info-3" :to="{path: '/input'}" target="_blank">输入框组件</router-link></li>
              </ol>
            </td>
            <td>
              用户输入验证<br>
              仅当type为prompt时有效
            </td>
          </tr>
          <tr>
            <td>reset</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">Boolean</li>
                <li class="au-theme-border-color--base-8">String</li>
              </ol>
            </td>
            <td>
              true
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">''</li>
                <li class="au-theme-border-color--base-8">false</li>
                <li class="au-theme-border-color--base-8">any other string</li>
              </ol>
            </td>
            <td>
              每次显示消息框时输入框的初始值<br>
              为true或为空字符串时仅清空<br>
              为false时不清空<br>
              为普通字符串时以该字符串为初始值<br>
              仅当type为prompt时有效
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-button type="warning" @click="alert">Alert</au-button>
        <au-button type="success" @click="confirm">Confirm</au-button>
        <au-button type="primary" @click="prompt">Prompt</au-button>
      '></code-h>
      <code-h lang="js">
        export default {
          methods: {
            alert () {
              this.$alert({
                title: 'Alert',
                message: 'oh yes~',
                confirm () {
                  console.log('confirm')
                }
              })
            },
            confirm () {
              this.$confirm({
                title: 'Confirm',
                message: 'you feel good?',
                confirmText: 'Yes',
                cancelText: 'No',
              })
            },
            prompt () {
              this.$prompt({
                title: 'Prompt',
                message: 'How\'d you feel?',
                reset: true,
                validators: [
                  {
                    validator (v) {
                      return v !== ''
                    },
                    warning: 'Write Sth!'
                  }
                ],
                confirm () {
                  console.log('yes!')
                }
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
    name: 'message-box-examles',
    methods: {
      alert () {
        this.$alert({
          title: 'Alert',
          message: 'oh yes~',
          messageType: 'warning',
          icon: 'home',
          confirm () {
            console.log('confirm')
          }
        })
      },
      confirm () {
        this.$confirm({
          title: 'Confirm',
          message: 'you feel good?',
          confirmText: 'Yes',
          messageType: 'info',
          icon: 'home',
          cancelText: 'No'
        })
      },
      prompt () {
        this.$prompt({
          title: 'Prompt',
          message: 'How\'d you feel?',
          reset: true,
          messageType: 'danger',
          validators: [
            {
              validator (v) {
                return v !== ''
              },
              warning: 'Write Sth!'
            }
          ],
          confirm () {
            console.log('yes!')
          }
        })
      }
    }
  }
</script>


