<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        开关组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-switch v-model="value" color="success" :label="value ? '开' : '关'"></au-switch><br/><br/>
        <au-switch v-model="shadowValue" color="danger" :label="shadowValue ? '开' : '关'"></au-switch>
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
            <td>label</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              开关前的提示文字
            </td>
          </tr>
          <tr>
            <td>value</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
            </td>
            <td>Boolean</td>
            <td>false</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>值</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>
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
            <td>color</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>Success</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">default</li>
                <li class="au-theme-border-color--base-8">primary</li>
                <li class="au-theme-border-color--base-8">danger</li>
                <li class="au-theme-border-color--base-8">warning</li>
                <li class="au-theme-border-color--base-8">info</li>
                <li class="au-theme-border-color--base-8">success</li>
              </ol>
            </td>
            <td>颜色</td>
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
          <!-- <tr>
            <td>@input</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">value</li>
                <li class="au-theme-border-color--base-8">event</li>
              </ol>
            </td>
            <td>
              输入事件<br>
              参数value表示当前值<br>
              参数event表示事件对象
            </td>
          </tr> -->
          <tr>
            <td>@change</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">value</li>
              </ol>
            </td>
            <td>
              值改变事件<br>
              参数value表示当前值
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Methods">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-switch v-model="value" color="success" :label="value ? &#x27;开&#x27; : &#x27;关&#x27;"></au-switch>
        <au-switch v-model="shadowValue" color="danger" :label="shadowValue ? &#x27;开&#x27; : &#x27;关&#x27;"></au-switch>
      '></code-h>
      <code-h lang="js">
        export default {
          name: 'switch-examples',
          data () {
            return {
              value: true
            }
          },
          computed: {
            shadowValue: {
              get: function () {
                return !this.value
              },
              set: function (v) {
                this.value = !v
              }
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'switch-examples',
    data () {
      return {
        value: true
      }
    },
    computed: {
      shadowValue: {
        get: function () {
          return !this.value
        },
        set: function (v) {
          this.value = !v
        }
      }
    }
  }
</script>
