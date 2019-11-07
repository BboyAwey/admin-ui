<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        自定义滚动条组件，作为容器使用，该组件会需要时显示滚动条，支持嵌套。<br>
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button @click="test = !test">hello</au-button>
        <au-scroller style="width: 300px; border-width: 1px; border-style: solid;" class="au-theme-border-color--base-8" :scaleable="false" :offset="0">
          <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          <div v-show="test">
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          </div>
          <!-- <au-scroller style="width: 200px; height: 300px; border-width: 1px; border-style: solid; padding: 10px;" class="au-theme-border-color--base-8">
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
            <p class="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ab. Odit consectetur incidunt error libero illum reiciendis, sint sunt voluptas nostrum iusto assumenda placeat beatae, nihil corporis. Laboriosam, ea esse?</p>
          </au-scroller> -->
          <!-- <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis ullam vel culpa laborum at libero in! Atque sequi excepturi quia ullam harum soluta minus, eos culpa nisi, quam officiis accusantium?</p> -->
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
            <td>direction</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              String
            </td>
            <td>
              both
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">both</li>
                <li class="au-theme-border-color--base-8">none</li>
                <li class="au-theme-border-color--base-8">vertical</li>
                <li class="au-theme-border-color--base-8">horizontal</li>
              </ol>
            </td>
            <td>
              滚动的方向
            </td>
          </tr>
          <tr>
            <td>scroll-top</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Number
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              类似原生的scrollTop属性，用于控制纵向滚动的距离<br>
              可以配合@scroll事件使用来动态控制滚动
            </td>
          </tr>
          <tr>
            <td>scroll-left</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Number
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              类似原生的scrollLeft属性，用于控制横向滚动的距离<br>
              可以配合@scroll事件使用来动态控制滚动
            </td>
          </tr>
          <tr>
            <td>offset</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Number
            </td>
            <td>
              4
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              滚动条到元素边缘的距离
            </td>
          </tr>
          <tr>
            <td>scaleable</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              Boolean
            </td>
            <td>
              true
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              鼠标悬停时滚动条是否放大
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
              scroll <br/>
              - scrollTop: Number <br/>
              - scrollLeft: Number <br/>
            </td>
            <td>
              当用户滚动内容时触发<br>
              参数scroll是一个表示滚动距离对象
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
            <td>scrollTo</td>
            <td>
              scroll <br/>
              - scrollTop: Number <br/>
              - scrollLeft: Number <br/>
            </td>
            <td>
              让内容滚动到指定位置，接受一个表示滚动距离的对象，其中的scrollTop和scrollLeft都是可选的
            </td>
          </tr>
        </tbody>
      </au-table>
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
  name: 'scroller-examples',
  data () {
    return {
      test: false
    }
  }
}
</script>
