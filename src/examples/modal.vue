<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个通用的模态框组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="info" @click="modalDisplay = true">点我弹出模态框</au-button>
        <au-modal :display="modalDisplay" title="一个模态框" @hide="modalDisplay = false" :buttons="buttons" onEnter="确认">
          <p style="font-size: 14px;">Sit nulla duis proident non mollit cupidatat anim. Deserunt pariatur enim ut aliqua velit id incididunt eu enim. Velit eiusmod pariatur mollit ad sunt enim. Non culpa ipsum duis non elit in consectetur sit laboris duis non. Ad nulla laboris sunt sit ea nostrud dolore velit id.</p>
          <p style="font-size: 14px;">Sit nulla duis proident non mollit cupidatat anim. Deserunt pariatur enim ut aliqua velit id incididunt eu enim. Velit eiusmod pariatur mollit ad sunt enim. Non culpa ipsum duis non elit in consectetur sit laboris duis non. Ad nulla laboris sunt sit ea nostrud dolore velit id.</p>
          <p style="font-size: 14px;">Sit nulla duis proident non mollit cupidatat anim. Deserunt pariatur enim ut aliqua velit id incididunt eu enim. Velit eiusmod pariatur mollit ad sunt enim. Non culpa ipsum duis non elit in consectetur sit laboris duis non. Ad nulla laboris sunt sit ea nostrud dolore velit id.</p>
          <p style="font-size: 14px;">Sit nulla duis proident non mollit cupidatat anim. Deserunt pariatur enim ut aliqua velit id incididunt eu enim. Velit eiusmod pariatur mollit ad sunt enim. Non culpa ipsum duis non elit in consectetur sit laboris duis non. Ad nulla laboris sunt sit ea nostrud dolore velit id.</p>
          <p style="font-size: 14px;">Sit nulla duis proident non mollit cupidatat anim. Deserunt pariatur enim ut aliqua velit id incididunt eu enim. Velit eiusmod pariatur mollit ad sunt enim. Non culpa ipsum duis non elit in consectetur sit laboris duis non. Ad nulla laboris sunt sit ea nostrud dolore velit id.</p>
          <p style="font-size: 14px;">Sit nulla duis proident non mollit cupidatat anim. Deserunt pariatur enim ut aliqua velit id incididunt eu enim. Velit eiusmod pariatur mollit ad sunt enim. Non culpa ipsum duis non elit in consectetur sit laboris duis non. Ad nulla laboris sunt sit ea nostrud dolore velit id.</p>
        </au-modal>
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
            <td>display</td>
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
            <td>显示和隐藏模态框<br>配合@hide使用来进行同步</td>
          </tr>
          <tr>
            <td>title</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              标题<br>
              如果希望自定义标题，可以不指定转而在slot中自己编写
            </td>
          </tr>
          <tr>
            <td>buttons</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Array<br>
              -Object
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">text: String，按钮文字</li>
                <li class="au-theme-border-color--base-8">type: String，按钮类型，参考<router-link class="au-theme-font-color--info-3" :to="{path: '/button'}" target="_blank">按钮组件</router-link></li>
                <li class="au-theme-border-color--base-8">size: String，按钮尺寸，参考<router-link class="au-theme-font-color--info-3" :to="{path: '/button'}" target="_blank">按钮组件</router-link></li>
                <li class="au-theme-border-color--base-8">plain: Boolean，空心按钮，参考<router-link class="au-theme-font-color--info-3" :to="{path: '/button'}" target="_blank">按钮组件</router-link></li>
                <li class="au-theme-border-color--base-8">disabled: Boolean，禁用按钮，参考<router-link class="au-theme-font-color--info-3" :to="{path: '/button'}" target="_blank">按钮组件</router-link></li>
                <li class="au-theme-border-color--base-8">handler: Function，点击按钮时的处理函数，接受一个loading对象作为参数，该对象有两个方法start()和stop()，用于开启和停止按钮loading</li>
              </ol>
            </td>
            <td>
              按钮配置
            </td>
          </tr>
          <tr>
            <td>on-enter</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              在buttons中指定的按钮的text
            </td>
            <td>
              指定在用户按下Enter键时希望按下的按钮
            </td>
          </tr>
          <tr>
            <td>width</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css宽度值<br>
              不设置时自动计算
            </td>
            <td>宽度</td>
          </tr>
          <tr>
            <td>height</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css高度值<br>
              不设置时自动计算
            </td>
            <td>高度</td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="Slots">
      <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>默认slot</td>
            <td>
              内容
            </td>
          </tr>
        </tbody>
      </au-table>
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
            <td><au-icon type="minus"></au-icon></td>
            <td>模态框出现时触发</td>
          </tr>
          <tr>
            <td>@hide</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>模态框隐藏时触发</td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="Methods">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-button type="info" @click="modalDisplay = true">按钮</au-button>
        <au-modal :display="modalDisplay" title="一个模态框" @hide="modalDisplay = false" :buttons="buttons">
          <p style="font-size: 14px;">Sit nulla duis proident non mollit cupidatat anim. Deserunt pariatur enim ut aliqua velit id incididunt eu enim. Velit eiusmod pariatur mollit ad sunt enim. Non culpa ipsum duis non elit in consectetur sit laboris duis non. Ad nulla laboris sunt sit ea nostrud dolore velit id.</p>
        </au-modal>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            let vm = this
            return {
              modalDisplay: false,
              buttons: [
                {
                  text: '确认',
                  type: 'primary',
                  handler () {
                    vm.modalDisplay = false
                  }
                },
                {
                  text: '取消',
                  plain: true,
                  type: 'default',
                  handler () {
                    vm.modalDisplay = false
                  }
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
    name: 'modal-examples',
    data () {
      let vm = this
      return {
        modalDisplay: false,
        buttons: [
          {
            text: '确认',
            type: 'primary',
            handler () {
              vm.modalDisplay = false
            }
          },
          {
            text: '取消',
            plain: true,
            type: 'default',
            handler () {
              vm.modalDisplay = false
            }
          }
        ]
      }
    }
  }
</script>

