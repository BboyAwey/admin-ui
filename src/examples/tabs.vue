<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        根据标签选择进行内容切换显示。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-tabs :tabs="tabs"
          :current="current"
          can-create
          can-remove
          can-rename
          :rename-validators="validators"
          :create-validators="validators"
          @remove="remove"
          @create="create"
          :creating-modal="false"
          @toggle="c => current = c"
          @rename="rename">
          <div
            v-for="(tab, i) in tabs"
            :name="tab.name" :key="i">
            {{ tab.text }}
            <div>hhhhhhh</div>
          </div>
        </au-tabs>
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
          <td>tabs</td>
          <td>
            <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
            <!--<au-icon type="times"></au-icon>-->
          </td>
          <td>
            <ol>
              <li> Array </li>
              <li> -Object </li>
            </ol>
          </td>
          <td>
            <au-icon type="minus"></au-icon>
          </td>
          <td>
            <ol class="option-list">
              <li class="au-theme-border-color--base-8">name: String, 标签名称，用于匹配默认slots中内容的name</li>
              <li class="au-theme-border-color--base-8">text: String, 标签显示的文字</li>
            </ol>
          </td>
          <td>
            标签配置
          </td>
        </tr>
        <tr>
          <td>current</td>
          <td>
            <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
            <!--<au-icon type="times"></au-icon>-->
          </td>
          <td>String</td>
          <td>
          </td>
          <td>
            <au-icon type="minus"></au-icon>
          </td>
          <td>
            表示当前选中的标签的name
          </td>
        </tr>
        <tr>
          <td>can-remove</td>
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
          <td>
            tab是否可被删除
          </td>
        </tr>
        <tr>
          <td>can-rename</td>
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
          <td>
            tab是否可被重命名
          </td>
        </tr>
        <tr>
          <td>rename-validators</td>
          <td>
            <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
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
            重命名tab时的验证器
          </td>
        </tr>
        <tr>
          <td>can-create</td>
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
          <td>
            是否可新增tab
          </td>
        </tr>
        <tr>
          <td>creating-modal</td>
          <td>
            <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
            <au-icon type="times"></au-icon>
          </td>
          <td>Boolean</td>
          <td>
            true
          </td>
          <td>
            <ol class="option-list">
              <li class="au-theme-border-color--base-8">true</li>
              <li class="au-theme-border-color--base-8">false</li>
            </ol>
          </td>
          <td>
            新增tab时是否弹出输入名称的弹窗<br>
            仅在can-create为true时有效
          </td>
        </tr>
        <tr>
          <td>create-validators</td>
          <td>
            <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
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
            新增tab时的验证器
          </td>
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
            slot中的所有子集元素都需要添加name属性作为切换的依据<br>
            它跟tabs的name属性一一对应<br>
            如果每个content中的内容模板是相同的，则可以不给定slot中的容器元素的name<br>
            如果没有找到相应的tab容器，它不会切换底部的内容<br>
            这样你就可以只使用一个内容模板，在点击tab时仅仅是切换其中的数据而不是整个模板了
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
          <td>@toggle</td>
          <td>
            <ol class="option-list">
              <li class="au-theme-border-color--base-8">current</li>
              <li class="au-theme-border-color--base-8">event</li>
            </ol>
          </td>
          <td>
            当用户切换标签的时候触发该事件<br>
            current表示当前切换到的tab的name属性，event表示当前点击事件的事件对象<br>
            但是如果是由外部修改currentTabName的值触发的切换，则event为undefined
          </td>
        </tr>
        <tr>
          <td>@remove</td>
          <td>
            <ol class="option-list">
              <li class="au-theme-border-color--base-8">index</li>
              <li class="au-theme-border-color--base-8">tab</li>
            </ol>
          </td>
          <td>
            当用户确认删除tab的时候触发该事件<br>
            index表示需要删除的tab的索引，tab表示需要删除的tab本身<br>
            仅在can-remove为true时才有效
          </td>
        </tr>
        <tr>
          <td>@rename</td>
          <td>
            <ol class="option-list">
              <li class="au-theme-border-color--base-8">newText</li>
              <li class="au-theme-border-color--base-8">index</li>
              <li class="au-theme-border-color--base-8">tab</li>
            </ol>
          </td>
          <td>
            当用户点击标签的删除图标的时候触发该事件<br>
            newText表示新的tab名称<br>
            index表示需要删除的tab的索引<br>
            tab表示需要删除的tab本身<br>
            仅在can-rename为true时才有效
          </td>
        </tr>
        <tr>
          <td>@create</td>
          <td>
            <ol class="option-list">
              <li class="au-theme-border-color--base-8">text</li>
            </ol>
          </td>
          <td>
            当用户确认新增tab的时候触发该事件<br>
            text表示新的tab名称<br>
            仅在can-create为true时才有效
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
        <au-tabs :tabs="tabs"
          :current="current"
          can-create
          can-remove
          can-rename
          :rename-validators="validators"
          :create-validators="validators"
          @remove="remove"
          @create="create"
          @toggle="c => current = c"
          @rename="rename">
          <div
            v-for="(tab, i) in tabs"
            :name="tab.name" :key="i">
            &#x7B;&#x7B; tab.text &#x7D;&#x7D;
          </div>
        </au-tabs>
      '>
      </code-h>
      <code-h lang="js">
        export default {
          name: 'tabs-examples',
          data () {
            return {
              current: 'baseInfo',
              tabs: [
                {
                  name: 'baseInfo',
                  text: '基本信息'
                },
                {
                  name: 'externalResource',
                  text: '列表信息'
                }
              ],
              tabCounter: 0,
              validators: [
                {
                  validator (v) {
                    return v !== '' && !/^\s+$/g.test(v)
                  },
                  warning: '必须输入新名称'
                },
                {
                  validator (v) {
                    return new Promise((resolve, reject) => {
                      setTimeout(function () {
                        if (v.indexOf('有间客栈') !== -1) resolve(true)
                        else resolve(false)
                      }, 2000)
                    })
                  },
                  warning: '请在输入中包含“有间客栈”',
                  async: true
                }
              ]
            }
          },
          methods: {
            remove (index, tab) {
              this.tabs.splice(index, 1)
              if (this.current === tab.name) this.current = this.tabs[0].name
            },
            create (text) {
              this.tabs.push({
                text,
                name: 'tab' + this.tabCounter++
              })
            },
            rename (newText, index, tab) {
              this.$set(this.tabs[index], 'text', newText)
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'tabs-examples',
    data () {
      return {
        current: 'baseInfo',
        tabs: [
          {
            name: 'baseInfo',
            text: '基本信息'
          },
          {
            name: 'externalResource',
            text: '列表信息'
          }
        ],
        tabCounter: 0,
        validators: [
          {
            validator (v) {
              return v !== '' && !/^\s+$/g.test(v)
            },
            warning: '必须输入新名称'
          },
          {
            validator (v) {
              return new Promise((resolve, reject) => {
                setTimeout(function () {
                  if (v.indexOf('有间客栈') !== -1) resolve(true)
                  else resolve(false)
                }, 2000)
              })
            },
            warning: '请在输入中包含“有间客栈”',
            async: true
          }
        ]
      }
    },
    methods: {
      remove (index, tab) {
        this.tabs.splice(index, 1)
        if (this.current === tab.name) this.current = this.tabs[0].name
      },
      create (text) {
        this.tabs.push({
          name: 'tab' + this.tabCounter++,
          text: text || 'tab' + this.tabCounter
        })
      },
      rename (newText, index, tab) {
        this.$set(this.tabs[index], 'text', newText)
      }
    }
  }
</script>
