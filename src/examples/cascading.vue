<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        级联下拉组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-cascading
          label="请选择地区"
          v-model="value"
          :options="options"
          :placeholder="[
            '请选择省份',
            '请选择地区（市）',
            '请选择县级'
          ]"
          :validators="validators"></au-cascading><br>
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
            <td>Any</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              最后一级下拉的值<br>
            </td>
          </tr>
          <tr>
            <td>options</td>
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
                <li class="au-theme-border-color--base-8">value: Any，选项的值，可以是任意类型</li>
                <li class="au-theme-border-color--base-8">children: Object，选项的子级，与options本身结构相同</li>
              </ol>
            </td>
            <td>
              选项配置
            </td>
          </tr>
          <tr>
            <td>placeholder</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">String</li>
                <li class="au-theme-border-color--base-8">Array</li>
              </ol>
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              占位字符<br>
              如果所有层级的占位字符都一样，则只需要传递字符串即可<br>
              如果希望每一级的占位字符都不同，则需要传递一个数组
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
              尺寸（高度）<br>
            </td>
          </tr>
          <tr>
            <td>singleWidth</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css px宽度值
            </td>
            <td>
              单个下拉框的宽度
            </td>
          </tr>
          <tr>
            <td>singleMinWidth</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css px宽度值
            </td>
            <td>
              单个下拉框的最小宽度
            </td>
          </tr>
          <tr>
            <td>singleMaxWidth</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css px宽度值
            </td>
            <td>
              单个下拉框的最大宽度
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
          <tr>
            <td>validate-on-blur</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Boolean
            </td>
            <td>false</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>
              当配置了验证器后，是否在blur事件中验证<br>
              默认是在change事件中验证
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
                <li class="au-theme-border-color--base-8">all</li>
              </ol>
            </td>
            <td>
              值改变事件<br>
              参数value表示当前值<br>
              参数all表示当前选中的所有选项的数组
            </td>
          </tr>
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
              返回值为一个表示验证结果的Boolean值
            </td>
          </tr>
          <tr>
            <td>reset()</td>
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
        <au-cascading
          label="请选择地区"
          v-model="value"
          :options="options"
          :placeholder="[
            &#39;请选择省份&#39;,
            &#39;请选择地区（市）&#39;,
            &#39;请选择县级&#39;
          ]"
          :validators="validators"></au-cascading>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              value: '',
              options: [
                {
                  value: 'prov1',
                  text: '江西',
                  children: [
                    {
                      value: 'city1',
                      text: '南昌',
                      children: [
                        {
                          value: 'cout1',
                          text: '南昌县'
                        },
                        {
                          value: 'cout2',
                          text: '奉新县'
                        },
                        {
                          value: 'cout3',
                          text: '安义县'
                        }
                      ]
                    },
                    {
                      value: 'city2',
                      text: '吉安',
                      children: [
                        {
                          value: 'cout4',
                          text: '吉安县'
                        },
                        {
                          value: 'cout5',
                          text: '泰和县'
                        },
                        {
                          value: 'cout6',
                          text: '万安县'
                        }
                      ]
                    },
                    {
                      value: 'city3',
                      text: '赣州',
                      children: [
                        {
                          value: 'cout7',
                          text: '南康县'
                        },
                        {
                          value: 'cout8',
                          text: '上犹县'
                        },
                        {
                          value: 'cout9',
                          text: '信丰县'
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'prov2',
                  text: '某个省',
                  children: [
                    {
                      value: 'city4',
                      text: '嘿',
                      children: [
                        {
                          value: 'cout10',
                          text: '嘿嘿'
                        },
                        {
                          value: 'cout11',
                          text: '嘿嘿嘿'
                        },
                        {
                          value: 'cout12',
                          text: '嘿嘿嘿嘿'
                        }
                      ]
                    },
                    {
                      value: 'city5',
                      text: '哈',
                      children: [
                        {
                          value: 'cout13',
                          text: '哈哈'
                        },
                        {
                          value: 'cout14',
                          text: '哈哈哈'
                        },
                        {
                          value: 'cout15',
                          text: '哈哈哈哈'
                        }
                      ]
                    },
                    {
                      value: 'city6',
                      text: '吼',
                      children: [
                        {
                          value: 'cout16',
                          text: '吼吼'
                        },
                        {
                          value: 'cout17',
                          text: '吼吼吼'
                        },
                        {
                          value: 'cout18',
                          text: '吼吼吼吼'
                        }
                      ]
                    }
                  ]
                }
              ],
              validators: [
                {
                  validator (v) {
                    return v === 'cout6'
                  },
                  warning: '我是万安人'
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
    name: 'cascading-examples',
    data () {
      return {
        value: '',
        options: [
          {
            value: 'prov1',
            text: '江西',
            children: [
              {
                value: 'city1',
                text: '南昌',
                children: [
                  {
                    value: 'cout1',
                    text: '南昌县'
                  },
                  {
                    value: 'cout2',
                    text: '奉新县'
                  },
                  {
                    value: 'cout3',
                    text: '安义县'
                  }
                ]
              },
              {
                value: 'city2',
                text: '吉安',
                children: [
                  {
                    value: 'cout4',
                    text: '吉安县'
                  },
                  {
                    value: 'cout5',
                    text: '泰和县'
                  },
                  {
                    value: 'cout6',
                    text: '万安县'
                  }
                ]
              },
              {
                value: 'city3',
                text: '赣州',
                children: [
                  {
                    value: 'cout7',
                    text: '南康县'
                  },
                  {
                    value: 'cout8',
                    text: '上犹县'
                  },
                  {
                    value: 'cout9',
                    text: '信丰县'
                  }
                ]
              }
            ]
          },
          {
            value: 'prov2',
            text: '某个省',
            children: [
              {
                value: 'city4',
                text: '嘿',
                children: [
                  {
                    value: 'cout10',
                    text: '嘿嘿'
                  },
                  {
                    value: 'cout11',
                    text: '嘿嘿嘿'
                  },
                  {
                    value: 'cout12',
                    text: '嘿嘿嘿嘿'
                  }
                ]
              },
              {
                value: 'city5',
                text: '哈',
                children: [
                  {
                    value: 'cout13',
                    text: '哈哈'
                  },
                  {
                    value: 'cout14',
                    text: '哈哈哈'
                  },
                  {
                    value: 'cout15',
                    text: '哈哈哈哈'
                  }
                ]
              },
              {
                value: 'city6',
                text: '吼',
                children: [
                  {
                    value: 'cout16',
                    text: '吼吼'
                  },
                  {
                    value: 'cout17',
                    text: '吼吼吼'
                  },
                  {
                    value: 'cout18',
                    text: '吼吼吼吼'
                  }
                ]
              }
            ]
          }
        ],
        validators: [
          {
            validator (v) {
              return v === 'cout6'
            },
            warning: '我是万安人'
          }
        ]
      }
    }
  }
</script>




