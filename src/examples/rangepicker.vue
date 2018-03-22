<template>
  <div class="page" style="position: relative">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        日期/时间范围选择组件，支持v-model
      </p>
      <!-- 组件示例 -->
      <div class="component-example" style="position: absolute;top: 0; right: 30px; text-align: right;">
        <au-rangepicker
          v-model="range"
          label="选择日期范围"
          type="all"
          start="2017"
          end="2018"
          :relative="true"
          :absolute="true"
          size="normal"
          :disabled="false"
          placement="bottom right"
        ></au-rangepicker>
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
            <td>range</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
            </td>
            <td>
              Object<br>
              - string<br>
              - string<br>
              - string<br>
              - string
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">startDate: 开始日期</li>
                <li class="au-theme-border-color--base-8">startTime: 开始时间</li>
                <li class="au-theme-border-color--base-8">endDate: 结束日期</li>
                <li class="au-theme-border-color--base-8">endTime: 结束时间</li>
              </ol>
            </td>
            <td>
              一个表示日期/时间 范围的对象<br>
              当type为'date'时仅startDate和endDate有效<br>
              当type为'time'时仅startTime和endTime有效<br>
              当type为'all'时四个字段都有效<br>
              可使用v-model语法糖来进行绑定
            </td>
          </tr>
          <tr>
            <td>label-width</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>合法的css宽度值，仅支持px单位</td>
            <td>
              提示文字的宽度<br>
              仅inline为true时有效
            </td>
          </tr>
          <tr>
            <td>tips</td>
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
            <td>startPlaceholder</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>''</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              开始占位字符
            </td>
          </tr>
          <tr>
            <td>endPlaceholder</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>''</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              结束占位字符
            </td>
          </tr>
          <tr>
            <td>start</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">'2018-01-01'</li>
                <li class="au-theme-border-color--base-8">'11:22:33'</li>
                <li class="au-theme-border-color--base-8">'2018-01-01 11:22:33'</li>
              </ol>
            </td>
            <td>
              可选择的最早日期时间<br>
              日期 时间以空格分隔<br>
              日期分隔符只能为'-'<br>
              时间分隔符只能为':'<br>
              当type为'date'时不能只给定时间<br>
              当type为'time'时不能只给定日期
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
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">'2018-01-01'</li>
                <li class="au-theme-border-color--base-8">'11:22:33'</li>
                <li class="au-theme-border-color--base-8">'2018-01-01 11:22:33'</li>
              </ol>
            </td>
            <td>
              可选择的最晚日期时间<br>
              日期 时间以空格分隔<br>
              日期分隔符只能为'-'<br>
              时间分隔符只能为':'<br>
              当type为'date'时不能只给定时间<br>
              当type为'time'时不能只给定日期
            </td>
          </tr>
          <tr>
            <td>span</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>ms值</td>
            <td>
              最大日期时间跨度<br>
              单位为毫秒<br>
            </td>
          </tr>
          <tr>
            <td>relative</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
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
            <td>是否显示相对时间选项</td>
          </tr>
          <tr>
            <td>relatives</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Array<br>
              - Object<br>
              -- string<br>
              -- string
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">text: 选项文字</li>
                <li class="au-theme-border-color--base-8">span: 时间跨度(毫秒)</li>
              </ol>
            </td>
            <td>
              自定义的相对时间选项<br>
              如果设置了span选项，则大于span的选项会被过滤而不显示<br>
              如果设置了start和end，则span的选中后的值会被前二者的值所限制
            </td>
          </tr>
          <tr>
            <td>absolute</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
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
            <td>是否显示绝对时间选项</td>
          </tr>
          <tr>
            <td>placement</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>'bottom left'</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">top left</li>
                <li class="au-theme-border-color--base-8">top center</li>
                <li class="au-theme-border-color--base-8">top right</li>
                <li class="au-theme-border-color--base-8">right top</li>
                <li class="au-theme-border-color--base-8">right middle</li>
                <li class="au-theme-border-color--base-8">right bottom</li>
                <li class="au-theme-border-color--base-8">bottom left</li>
                <li class="au-theme-border-color--base-8">bottom center</li>
                <li class="au-theme-border-color--base-8">bottom right</li>
                <li class="au-theme-border-color--base-8">left top</li>
                <li class="au-theme-border-color--base-8">left middle</li>
                <li class="au-theme-border-color--base-8">left bottom</li>
              </ol>
            </td>
            <td>弹框的对齐方式，一般不需要设置</td>
          </tr>
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
            <td>size</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">mini</li>
                <li class="au-theme-border-color--base-8">small</li>
                <li class="au-theme-border-color--base-8">normal</li>
                <li class="au-theme-border-color--base-8">large</li>
              </ol>
            </td>
            <td>
              组件尺寸
            </td>
          </tr>
          <tr>
            <td>seconds</td>
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
              是否显示秒
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
            <td>是否禁用组件</td>
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
                <li class="au-theme-border-color--base-8">range</li>
              </ol>
            </td>
            <td>
              范围改变事件<br>
              参数range表示当前选定范围
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
        <au-rangepicker
          v-model="range"
          label="选择日期范围"
          type="all"
          :relative="true"
          :absolute="true"
          size="normal"
          :disabled="false"
        ></au-rangepicker>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              range: {}
            }
          },
          watch: {
            range (r) {
              console.log(r)
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
export default {
  name: 'rangepicker-examples',
  data () {
    return {
      range: {
        startDate: '2018-2-1',
        startTime: '10:10:10',
        endDate: '2018-2-10',
        endTime: '19:32:26'
      }
    }
  },
  watch: {
    range (r) {
      console.log(r)
    }
  }
}
</script>
