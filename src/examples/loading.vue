<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        加载动画组件，可为元素添加加载动画
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="warning" @click="toggle">{{ (loading ? '结束' : '开始') + '加载' }}</au-button>
        <div ref="target" class="au-theme-border-color--base-8" style="margin-top: 10px; border-style: solid; border-width: 1px; width: 300px; padding: 20px;">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum fuga ipsa odit atque cumque perferendis et facere aperiam numquam doloribus dolor quasi molestias esse, aut tenetur eaque architecto consequatur quaerat.
        </div>
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
        Loading组件是一个方法组件，用于在元素上显示加载动画。如果是按需引入，则直接调用<span class="code au-theme-radius au-theme-background-color--warning-5">Loading()</span>方法即可。如果是全局引入的Admin UI，则其会在Vue实例上注册<span class="code au-theme-radius au-theme-background-color--warning-5">$loading()</span>方法（它是前者的别名）。方法接受一个表示选项的参数<span class="code au-theme-radius au-theme-background-color--warning-5">config</span>，其字段如下：
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
            <td>target</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Dom Element</td>
            <td>
              document.element.body
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>目标元素，不指定则以body为目标元素</td>
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
            <td>提示文字</td>
          </tr>
          <tr>
            <td>color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              primary
            </td>
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
            <td>颜色类型</td>
          </tr>
          <tr>
            <td>size</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>

            </td>
            <td>
              合法的CSS长度值，仅支持px单位
            </td>
            <td>动画尺寸，不设置则自动计算</td>
          </tr>
          <tr>
            <td>mask</td>
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
            <td>是否显示半透明遮罩</td>
          </tr>
          <tr>
            <td>tag</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              div
            </td>
            <td>
              合法的HTML标签名
            </td>
            <td>
              组件最外层的标签类型<br>
              当希望在ul、ol等不能放置div的元素中添加loading效果时需要指定标签名<br>
              table元素是个例外，你只能在其外部再包一层父级元素比如div然后将其指定为target
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-button type="warning" @click="toggle">&#123;&#123; (loading ? "结束" : "开始") + "加载" &#125;&#125;</au-button>
        <div ref="target" class="au-theme-border-color--base-8" style="margin-top: 10px; border-style: solid; border-width: 1px; width: 300px; padding: 20px;">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum fuga ipsa odit atque cumque perferendis et facere aperiam numquam doloribus dolor quasi molestias esse, aut tenetur eaque architecto consequatur quaerat.
        </div>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              loading: null
            }
          },
          methods: {
            toggle () {
              if (!this.loading) {
                this.loading = this.$loading({
                  target: this.$refs.target,
                  message: '拼命加载中',
                  color: 'danger',
                  tag: 'p'
                })
              } else {
                this.loading.close()
                this.loading = null
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
    name: 'loading-examples',
    data () {
      return {
        loading: null
      }
    },
    methods: {
      toggle () {
        if (!this.loading) {
          this.loading = this.$loading({
            target: this.$refs.target,
            message: '拼命加载中',
            color: 'danger'
          })
        } else {
          this.loading.close()
          this.loading = null
        }
      }
    }
  }
</script>

