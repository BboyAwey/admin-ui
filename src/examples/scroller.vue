<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        自定义滚动条组件，作为容器使用，该组件会需要时显示滚动条，支持嵌套。<br>
        目前仅支持垂直方向上的滚动条。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-scroller style="width: 300px; height:400px; border-width: 1px; border-style: solid; padding: 10px;" class="au-theme-border-color--base-8">
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <au-scroller style="width: 200px; height: 300px; border-width: 1px; border-style: solid; padding: 10px;" class="au-theme-border-color--base-8">
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          </au-scroller>
        </au-scroller>
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
            <td>scroll-top</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">String</li>
                <li class="au-theme-border-color--base-8">Number</li>
              </ol></td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>合法的css长度值或数字</td>
            <td>
              类似原生的scrollTop属性，用于控制滚动的距离<br>
              可以配合@scroll事件使用来动态控制滚动
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
              内容
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
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
            <td>@scroll</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">scrollTop</li>
              </ol>
            </td>
            <td>
              当用户滚动内容时触发<br>
              参数scrollTop表示滚动距离，即内容最上端与容器最上端的距离值
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
        </tbody>
      </au-table> -->
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-scroller style="width: 200px; height: 300px; border-width: 1px; border-style: solid; padding: 10px;" class="au-theme-border-color--base-8">
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
        </au-scroller>
      '></code-h>
      <h4 class="title-1">嵌套</h4>
      <code-h lang="html" content='
        <au-scroller style="width: 300px; height:400px; border-width: 1px; border-style: solid; padding: 10px;" class="au-theme-border-color--base-8">
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <au-scroller style="width: 200px; height: 300px; border-width: 1px; border-style: solid; padding: 10px;" class="au-theme-border-color--base-8">
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          </au-scroller>
        </au-scroller>
      '></code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'icon-examples'
  }
</script>
