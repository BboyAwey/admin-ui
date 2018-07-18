<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        标签工厂组件，用于批量添加标签。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-tagfactory
          v-model="tags"
          :associations="associations"
          @input-change="inputChange"
          :loading="loading"
          label="打标签"/>
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
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              提示文字
            </td>
          </tr>
          <tr>
            <td>label-width</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>合法的css宽度值，仅支持px单位</td>
            <td>
              输入框前的提示文字的宽度<br>
              仅inline为true时有效
            </td>
          </tr>
          <tr>
            <td>tips</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Array<br>
              -String
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              需要显示的解释信息<br>
            </td>
          </tr>
          <tr>
            <td>inline</td>
            <td>
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
              是否横向放置label
            </td>
          </tr>
          <tr>
            <td>full-width</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>
              是否占满父元素宽度<br>
              仅在inline为false时有效
            </td>
          </tr>
          <tr>
            <td>width</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css长度值
            </td>
            <td>
              宽度<br>
              仅支持px单位<br>
            </td>
          </tr>
          <tr>
            <td>min-width</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css长度值
            </td>
            <td>
              最小宽度<br>
              仅支持px单位<br>
            </td>
          </tr>
          <tr>
            <td>max-width</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css长度值
            </td>
            <td>
              最大宽度<br>
              仅支持px单位<br>
            </td>
          </tr>
          <tr>
            <td>tags</td>
            <td>
              <au-icon type="check" class="au-theme-color--success"></au-icon>
            </td>
            <td>
              Array<br>
              -String
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              tag列表
            </td>
          </tr>
          <tr>
            <td>tagSize</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>mini</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">large</li>
                <li class="au-theme-border-color--base-8">normal</li>
                <li class="au-theme-border-color--base-8">small</li>
                <li class="au-theme-border-color--base-8">mini</li>
              </ol>
            </td>
            <td>
              标签尺寸
            </td>
          </tr>
          <tr>
            <td>associations</td>
            <td>
              <au-icon type="check" class="au-theme-color--success"></au-icon>
            </td>
            <td>
              Array<br>
              -String
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              关联列表
            </td>
          </tr>
          <tr>
            <td>tagMatcher</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              tag适配器函数<br>
              接受一个字符串参数表示当期输入或选中的关联<br>
              返回true和false来决定是否满足适配<br>
              如果需要异步适配，则返回一个promise对象，在其resolve()函数中传递结果
            </td>
          </tr>
          <tr>
            <td>canRemove</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>标签是否可删除</td>
          </tr>
          <tr>
            <td>canCreate</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>是否可以通过输入直接创建标签</td>
          </tr>
          <tr>
            <td>repeat</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>标签是否可重复</td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>''</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              占位字符
            </td>
          </tr>
          <tr>
            <td>warning</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>是否显示警告样式</td>
          </tr>
          <tr>
            <td>warnings</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Array<br>
              -String
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              需要显示的警告信息<br>
              如果给定了需要显示的警告信息，则组件将不执行validators中提供的验证器，而只是简单显示给定的警告<br>
              不管warning选项是true还是false，只要给定了警告信息就一定会显示警告样式<br>
            </td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>''</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              占位字符
            </td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>loading</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>
              加载状态
            </td>
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
            <td>@change</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">tags</li>
              </ol>
            </td>
            <td>
              新增或删除标签后触发<br>
              处理函数接受一个含有当前所有tag的字符串数组
            </td>
          </tr>
          <tr>
            <td>@input-change</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">value</li>
              </ol>
            </td>
            <td>
              输入框内容修改后触发<br>
              处理函数接受一个表示新值的字符串参数
            </td>
          </tr>
          <tr>
            <td>@focus</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">tags</li>
              </ol>
            </td>
            <td>
              聚焦事件<br>
            </td>
          </tr>
          <tr>
            <td>@focus</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">tags</li>
              </ol>
            </td>
            <td>
              失焦事件<br>
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
        <au-tagfactory
          v-model="tags"
          :associations="associations"
          @input-change="inputChange"
          :loading="loading"
          label="打标签"/>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              tags: [
                'tag1',
                'tag2',
                'tag3'
              ],
              associations: [
                'abcd',
                'efgh',
                '1234'
              ],
              tagMatcher (v) {
                return /\d/g.test(v)
              },
              loading: false
            }
          },
          watch: {
            tags (v) {
              console.log(v)
            }
          },
          methods: {
            inputChange (v) {
              this.loading = true
              setTimeout(() => {
                this.associations.push(v)
                this.loading = false
              }, 2000)
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
export default {
  name: 'tagfactory-examples',
  data () {
    return {
      tags: [
        'tag1',
        'tag2',
        'tag3'
      ],
      associations: [
        'abcd',
        'efgh',
        '1234'
      ],
      tagMatcher (v) {
        return /\d/g.test(v)
      },
      loading: false
    }
  },
  watch: {
    tags (v) {
      console.log(v)
    }
  },
  methods: {
    inputChange (v) {
      this.loading = true
      setTimeout(() => {
        this.associations.push(v)
        this.loading = false
      }, 2000)
    }
  },
  mounted () {
    this.tags = []
  }
}
</script>
