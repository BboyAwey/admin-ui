<template>
  <div class="page">
    <doc-description description="面包屑组件">
      <au-breadcrumb :crumbs="crumbs" @select="handleSelect"/>
    </doc-description>

    <doc-props :props="[
      { name: 'crumbs', required: true, type: 'Array >> Object', default: '-', options: [
        { key: 'text', type: 'String', description: '显示名称' },
        { key: 'url', type: 'String', description: '跳转链接，可以是普通链接，也可以是任意字符' }
      ], description: '面包屑配置' },
      { name: 'separatorClass', required: false, type: 'String', default: '-', options: '-', description: '面包屑分隔符样式名' }
    ]"/>

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
  },
  methods: {
    handleSelect (crumb, crumbs) {
      this.$router.push({ path: crumb.url })
    }
  }
}
</script>
