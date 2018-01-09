<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        多选框组件，还提供了部分选中的样式
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-checkbox
          v-model="allChecked"
          label="Please check witch kind of dance would you like"
          text="All above"
          @change="checkAll"
          :indeterminate="indeterminate"></au-checkbox><br><br>
        <au-checkbox
          :value="true"
          label="Please check witch kind of dance would you like"
          text="All above"
          :disabled="allChecked"
          :indeterminate="indeterminate"></au-checkbox><br><br>
        <au-checkbox
          v-model="kinds"
          label="Please check what kinds of dances do u love"
          :checkboxes="checkboxes"
          :validators="validators"
          @change="kindsCheck"></au-checkbox><br>
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
              提示文字
            </td>
          </tr>
          <tr>
            <td>value</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">All</li>
                <li class="au-theme-border-color--base-8">Array</li>
              </ol>
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              值<br>
              当传递Checkboxes时（单个多选框），value为Array类型<br>
              当不传递Checkboxes时（多个多选款），value为任意类型
            </td>
          </tr>
          <tr>
            <td>text</td>
            <td>
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>当不传递checkboxes时该属性表示选框后的文字</td>
          </tr>
          <tr>
            <td>checkboxes</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
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
                <li class="au-theme-border-color--base-8">text: String，选项显示的文字</li>
                <li class="au-theme-border-color--base-8">value: 任意类型，选项的值</li>
              </ol>
            </td>
            <td>
              选项配置
            </td>
          </tr>
          <tr>
            <td>indeterminate</td>
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
            <td>模糊（部分选中）状态<br>这里只是样式，只在不传递Checkboxes（单个多选框）时有效</td>
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
            <td>warnings</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
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
              可以通过传入空数组 [] 来让组件只显示警告样式而不显示警告信息<br>
              同样，即使是空数组，同时传入的自定义验证器也会被忽略<br>
              只有传入undefined或者null时，组件才会认为没有警告信息
            </td>
          </tr>
          <tr>
            <td>validators</td>
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
                <li class="au-theme-border-color--base-8">validator: Function，接受一个表示当前值的参数value</li>
                <li class="au-theme-border-color--base-8">warning: String，当验证失败时需要显示的警告信息</li>
                <li class="au-theme-border-color--base-8">async: Boolean，是否为异步验证，默认为false</li>
              </ol>
            </td>
            <td>
              验证器配置<br>
              同步验证时，验证器函数只需要返回Booean类型的验证结果即可<br>
              异步验证时，需要额外配置async为true<br>
              同时，验证器函数需要返回一个promise，并在resolve函数中传递Boolean类型的验证结果给验证器<br>
              既有同步验证，又有异步验证时，验证器首先执行同步验证<br>
              只有通过了全部的同步验证时，才会执行异步验证
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
            <td>validate()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              在给定了验证器的情况下执行验证<br>
              返回一个Promise实例<br>
              需要同时验证多个表单时请使用Promise.all()方法
            </td>
          </tr>
          <tr>
            <td>clear()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>清除值和警告</td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例--部分选中</h4>
      <code-h lang="html" content='
        <au-checkbox
          v-model="allChecked"
          label="Please check witch kind of dance would you like"
          text="All above"
          @change="checkAll"
          :indeterminate="indeterminate"></au-checkbox><br><br>
        <au-checkbox
          v-model="kinds"
          label="Please check what kinds of dances do u love"
          :checkboxes="checkboxes"
          :validators="validators"
          @change="kindsCheck"></au-checkbox><br>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              allChecked: false,
              indeterminate: false,
              kinds: [],
              checkboxes: [
                {
                  text: 'Breaking',
                  value: 'b'
                },
                {
                  text: 'Jazz',
                  value: 'j'
                },
                {
                  text: 'Popppin',
                  value: 'p'
                },
                {
                  text: 'Locking',
                  value: 'l'
                }
              ]
            }
          },
          computed: {
            validators () {
              let vm = this
              return [
                {
                  validator (v) {
                    return vm.kinds ? v.includes('b') : true
                  },
                  warning: 'Bboy forever'
                }
              ]
            }
          },
          methods: {
            kindsCheck (v) {
              if (!this.allChecked || !v.length) {
                this.allChecked = v.length === this.checkboxes.length
              }
              this.indeterminate = v.length > 0 && v.length < this.checkboxes.length
            },
            checkAll (v) {
              this.indeterminate = false
              this.kinds = v ? this.checkboxes.map(e => e.value) : []
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'checkbox-examples',
    data () {
      return {
        allChecked: false,
        indeterminate: false,
        kinds: [],
        checkboxes: [
          {
            text: 'Breaking',
            value: 'b'
          },
          {
            text: 'Jazz',
            value: 'j'
          },
          {
            text: 'Popppin',
            value: 'p'
          },
          {
            text: 'Locking',
            value: 'l'
          }
        ]
      }
    },
    computed: {
      validators () {
        let vm = this
        return [
          {
            validator (v) {
              return vm.kinds ? v.includes('b') : true
            },
            warning: 'Bboy forever'
          }
        ]
      }
    },
    methods: {
      kindsCheck (v) {
        if (!this.allChecked || !v.length) {
          this.allChecked = v.length === this.checkboxes.length
        }
        this.indeterminate = v.length > 0 && v.length < this.checkboxes.length
      },
      checkAll (v) {
        this.indeterminate = false
        this.kinds = v ? this.checkboxes.map(e => e.value) : []
      }
    }
  }
</script>
