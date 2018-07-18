<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个全功能的菜单组件
      </p>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">
        示例请参考左侧菜单
      </cite>
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
            <td>items</td>
            <td>
              <au-icon type="check" class="au-theme-color--success"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              Array<br>
              -Object
             </td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">text: String，菜单项要显示的文字</li>
                <li class="au-theme-border-color--base-8">url: String，菜单项的地址</li>
                <li class="au-theme-border-color--base-8">isRouteName: Boolean，菜单项地址是否是vue router的route name</li>
                <li class="au-theme-border-color--base-8">icon: String，菜单项的图标，参考<router-link class="au-theme-color--info" :to="{path: '/icon'}" target="_blank">图标组件</router-link></li>
                <li class="au-theme-border-color--base-8">collapse: Boolean，该项是否收起(如果有子项)</li>
                <li class="au-theme-border-color--base-8">children: Array-Object，菜单项的子项，其内容与items一致</li>
              </ol>
            </td>
            <td>
              菜单项配置
            </td>
          </tr>
          <tr>
            <td>collapsable</td>
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
            <td>
              菜单栏是否可以被收起
            </td>
          </tr>
          <tr>
            <td>collapse</td>
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
              菜单栏是否收起<br>
              只在collapsable为true时有效<br>
              可以配合@toggle事件使用来主动控制折叠展开
            </td>
          </tr>
          <tr>
            <td>collapse-handlebar-position</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>top</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">top</li>
                <li class="au-theme-border-color--base-8">bottom</li>
              </ol>
            </td>
            <td>
              “展开-收起”操作栏的位置<br>
              只在collapsable为true时有效<br>
            </td>
          </tr>
          <tr>
            <td>background-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link><router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              背景色
            </td>
          </tr>
          <tr>
            <td>item-font-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              菜单项文字颜色
            </td>
          </tr>
          <tr>
            <td>item-background-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              菜单项背景颜色
            </td>
          </tr>
          <tr>
            <td>item-unlink-font-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              无链接的菜单项文字颜色
            </td>
          </tr>
          <tr>
            <td>item-hover-font-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              菜单项鼠标悬浮时的文字颜色
            </td>
          </tr>
          <tr>
            <td>item-hover-background-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              菜单项鼠标悬浮时的背景颜色
            </td>
          </tr>
          <tr>
            <td>item-active-font-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              菜单项激活时的文字颜色
            </td>
          </tr>
          <tr>
            <td>item-active-background-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              菜单项激活时的背景颜色
            </td>
          </tr>
          <tr>
            <td>collapse-handlebar-seprator-color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              仅支持主题系统中定义的颜色名称(包括自定义的颜色类名)，参见<router-link class="au-theme-color--info" :to="{path: '/theme'}" target="_blank">主题系统</router-link>
            </td>
            <td>
              左右伸缩栏的分割线颜色
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="Slots">
      <!-- <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>slot1</td>
            <td>
              该slot的详细说明
            </td>
          </tr>
        </tbody>
      </au-table> -->
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
            <td>@toggle</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">isCollapse</li>
              </ol>
            </td>
            <td>
              当用户向左收起菜单时触发<br>
              参数isCollapse表示是否向左折叠
            </td>
          </tr>
          <tr>
            <td>@select</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">item</li>
              </ol>
            </td>
            <td>
              当用户点击菜单项时时触发<br>
              参数item是一个表示菜单项的对象
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Methods">
      <!-- <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>参数</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>method1</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">arg1</li>
                <li class="au-theme-border-color--base-8">arg2</li>
              </ol>
            </td>
            <td>
              该方法及参数的详细说明
            </td>
          </tr>
        </tbody>,
      </au-table> -->
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-menu :items="menu" @select="go" class="menu" :collapsable="true" :collapse="false"></au-menu>
      '></code-h>
      <code-h lang="js">
        export default {
          name: 'app',
          data () {
            return {
              menu: [
                {
                  'text': '介绍',
                  'url': '/intro',
                  'icon': 'info-circle'
                },
                {
                  'text': '安装',
                  'url': '/installation',
                  'icon': 'cog'
                },
                {
                  'text': '主题',
                  'url': '/theme',
                  'icon': 'th-large'
                },
                {
                  'text': '组件',
                  'icon': 'cube',
                  'collapse': false,
                  'children': [
                    {
                      'text': '图标',
                      'url': '/icon'
                    },
                    {
                      'text': '按钮',
                      'url': '/button'
                    }
                  ]
                }
              ]
            }
          },
          methods: {
            go (item) {
              if (item.url) {
                this.$router.push(item.url)
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
  name: 'menu-examples'
}
</script>
