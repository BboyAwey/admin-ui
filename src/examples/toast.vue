<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        提示消息组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="warning" @click="toast">弹出提示消息</au-button>
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
        Toast组件本身就是一个方法，用于显示一些简单的提示信息。如果是按需引入，则直接调用<span class="code au-theme-radius au-theme-background-color--warning-5">Toast()</span>方法即可。如果是全局引入的Admin UI，则其会在Vue实例上注册<span class="code au-theme-radius au-theme-background-color--warning-5">$toast()</span>方法（它是前者的别名）。方法接受一个表示选项的参数<span class="code au-theme-radius au-theme-background-color--warning-5">config</span>，其字段如下：
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
              图标
            </td>
          </tr>
          <tr>
            <td>icon-class</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              可参考使用<router-link class="au-theme-font-color--info-3" :to="{path: '/icon'}" target="_blank">主题系统</router-link>中的类<br>
              也可自定义类
            </td>
            <td>图标样式类</td>
          </tr>
          <tr>
            <td>toast-class</td>
            <td><au-icon type="times"></au-icon></td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>用于自定义消息提示样式的类</td>
          </tr>
          <tr>
            <td>top</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>自定义的Y轴位置</td>
          </tr>
          <tr>
            <td>left</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>自定义的X轴位置</td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-button type="warning" @click="toast">弹出提示消息</au-button>
      '></code-h>
      <code-h lang="js">
        export default {
          methods: {
            toast () {
              this.$toast({
                message: '一则提示消息',
                icon: 'podcast',
                iconClass: 'au-theme-font-color--warning-3'
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
    name: 'toast-examples',
    methods: {
      toast () {
        this.$toast({
          message: '一则提示消息',
          icon: 'podcast',
          iconClass: 'au-theme-font-color--warning-3'
        })
      }
    }
  }
</script>
