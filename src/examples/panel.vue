<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个简单的面板组件
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-panel title="Panel" style="width: 500px;">
          <p class="au-theme-font-color--base-3">
            Minim anim minim consectetur non veniam sint tempor ea irure aliqua reprehenderit. Adipisicing est ut elit elit. Et cillum anim aute do sunt exercitation anim excepteur incididunt.
          </p>
        </au-panel>
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
            <td>title</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              面板的标题
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
              面板内容
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Events">
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
            <td>event1</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">arg1</li>
                <li class="au-theme-border-color--base-8">arg2</li>
              </ol>
            </td>
            <td>
              该事件及参数的详细说明
            </td>
          </tr>
        </tbody>
      </au-table> -->
      <au-icon type="minus"></au-icon>
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
        </tbody>
      </au-table> -->
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-panel title="Panel" style="width: 500px;">
          <p class="au-theme-font-color--base-3">
            Minim anim minim consectetur non veniam sint tempor ea irure aliqua reprehenderit. Adipisicing est ut elit elit. Et cillum anim aute do sunt exercitation anim excepteur incididunt.
          </p>
        </au-panel>
      '></code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'panel-examples'
  }
</script>
