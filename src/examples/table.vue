<style lang="scss" scoped>

</style>

<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个非常简单的表格组件，仅仅提供了样式，使用方式与原生的<span class="code au-theme-radius au-theme-background-color--warning-5">table</span>元素一致。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-table :bordered="true" :striped="true" style="width: 500px;">
          <thead>
            <tr>
              <th>#</th>
              <th>项目</th>
              <th>发布时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cube</td>
              <td>2016-12-14</td>
              <td>已发布</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Stream</td>
              <td>2017-03-15</td>
              <td>开发中</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Web2Data</td>
              <td>2017-05-20</td>
              <td>开发中</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Admin System</td>
              <td>2017-05-30</td>
              <td>开发中</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">当前显示10行，共100行</td>
            </tr>
          </tfoot>
        </au-table>
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
            <td>bordered</td>
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
            <td>
              是否有边框
            </td>
          </tr>
          <tr>
            <td>striped</td>
            <td>
              false
            </td>
            <td>Boolean</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
            </td>
            <td>
              是否为条纹表格
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="Slots">
      <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>默认slot</td>
            <td>
              表格内容，规则与table元素一致
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
      <cite class="cite au-theme-before-background-color--success-5 au-theme-font-color--base-5">
        当<span class="code au-theme-radius au-theme-background-color--warning-5">tfoot</span>中只有唯一一个<span class="code au-theme-radius au-theme-background-color--warning-5">td</span>时，该行默认为注脚样式（小一号文字并靠右对齐）
      </cite>
    </au-panel>
    <au-panel class="section" title="Events">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Methods">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-table :bordered="true" :striped="true" style="width: 500px;">
          <thead>
            <tr>
              <th>#</th>
              <th>项目</th>
              <th>发布时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cube</td>
              <td>2016-12-14</td>
              <td>已发布</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Stream</td>
              <td>2017-03-15</td>
              <td>开发中</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Web2Data</td>
              <td>2017-05-20</td>
              <td>开发中</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Admin System</td>
              <td>2017-05-30</td>
              <td>开发中</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">当前显示10行，共100行</td>
            </tr>
          </tfoot>
        </au-table>
      '></code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'table-examples'
  }
</script>
