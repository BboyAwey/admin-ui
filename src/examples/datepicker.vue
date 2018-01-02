<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        日期选择组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-datepicker label="选一个日子吧" v-model="date" :validators="validators" start="2017-12-1" end="2018-1-1"></au-datepicker>
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
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              值
            </td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>''</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              输入框占位字符
            </td>
          </tr>
          <tr>
            <td>size</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>normal</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">large</li>
                <li class="au-theme-border-color--base-8">normal</li>
                <li class="au-theme-border-color--base-8">small</li>
                <li class="au-theme-border-color--base-8">mini</li>
              </ol>
            </td>
            <td>
              输入框尺寸（高度）
            </td>
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
            <td>readonly</td>
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
            <td>只读</td>
          </tr>
          <tr>
            <td>start</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              有效日期的开始日期（包含）<br>
              设置后该日期之后的日期才可被选中<br>
              格式必须为YYYY-M(M)-D(D)
            </td>
          </tr>
          <tr>
            <td>end</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              有效日期的结束日期（包含）<br>
              设置后该日期之前的日期才可被选中<br>
              格式必须为YYYY-M(M)-D(D)
            </td>
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
          <tr>
            <td>@focus</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">value</li>
              </ol>
            </td>
            <td>
              聚焦事件<br>
              参数value表示当前值
            </td>
          </tr>
          <tr>
            <td>@blur</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">value</li>
              </ol>
            </td>
            <td>
              失焦事件<br>
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
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-datepicker label="选一个日子吧" v-model="date" :validators="validators"></au-datepicker>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              date: '',
              validators: [
                {
                  validator (v) {
                    return v === '2017-10-14'
                  },
                  warning: '请选择2017年10月14日'
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
    name: 'datepicker-examples',
    data () {
      return {
        date: '',
        validators: [
          {
            validator (v) {
              return v === '2017-10-14'
            },
            warning: '请选择2017年10月14日'
          }
        ]
      }
    }
  }
</script>
