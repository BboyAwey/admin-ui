<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        面包屑组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-breadcrumb :crumbs="crumbs"/>
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
            <td>crumbs</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              Array <br>
               -Object
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">text: String, 显示名称</li>
                <li class="au-theme-border-color--base-8">url: String, 跳转链接，可以是普通链接，也可以是任意字符</li>
              </ol>
            </td>
            <td>
              面包屑配置
            </td>
          </tr>
          <tr>
            <td>separator</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>/</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              面包屑分隔符
            </td>
          </tr>
          <tr>
            <td>separatorClass</td>
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
            <td>
              面包屑分隔符样式名
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
            <td>@select</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">crumb</li>
              </ol>
            </td>
            <td>
              用户点击某个可点击的面包屑时触发 <br>
              参数crumb表示当前点击的面包屑
            </td>
          </tr>
        </tbody>
      </au-table>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">当需要监听除点击事件之外的其它事件时，请使用<span class="code au-theme-radius au-theme-background-color--warning-5">.native</span>修饰符</cite>
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Methods">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-breadcrumb :crumbs="crumbs" @select="handleCrumbSelect"/>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              crumbs: [
                {
                  text: 'Admin UI',
                  url: '/'
                },
                {
                  text: '组件'
                },
                {
                  text: '面包屑',
                  url: '/breadcrumb'
                }
              ]
            }
          },
          methods: {
            handleCrumbSelect (crumb) {
              this.$router.push(crumb.url)
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'breadcrumb-examples',
    data () {
      return {
        crumbs: [
          {
            text: 'Admin UI',
            url: '/'
          },
          {
            text: '组件'
          },
          {
            text: '面包屑',
            url: '/breadcrumb'
          }
        ]
      }
    }
  }
</script>


