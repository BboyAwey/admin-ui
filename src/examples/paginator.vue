<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        分页组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-paginator :total="1000" :size="20" :current="1" @toggle="togglePage"></au-paginator>
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
            <td>total</td>
            <td>
              <!--<au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>number</td>
            <td>0</td>
            <td>

            </td>
            <td>
              总条数
            </td>
          </tr>
          <tr>
            <td>size</td>
            <td>
               <!--<au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>number</td>
            <td>10</td>
            <td>

            </td>
            <td>
              每页条数
            </td>
          </tr>
          <tr>
            <td>current</td>
            <td>
               <!--<au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>number</td>
            <td>1</td>
            <td>
              <!--<ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>-->
            </td>
            <td>当前页</td>
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
            <td>@toggle</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">event</li>
              </ol>
            </td>
            <td>page切换</td>
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
        <au-paginator :total="1000" :size="20" :current="1" @toggle="togglePage"></au-paginator>
      '></code-h>
      <code-h lang="js">
        import AuPaginator from 'admin-ui'
        export default {
          components: { AuPaginator },
          methods: {
            togglePage (page) {
              console.log(page)
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'paginator-examples',
    methods: {
      togglePage (page) {
        console.log(page)
      }
    }
  }
</script>
