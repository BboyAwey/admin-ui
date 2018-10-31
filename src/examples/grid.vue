<style lang="scss" scoped>
  .component-example {
    border-width: 1px;
    border-style: solid;
  }
</style>

<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个与著名的
        <a class="au-theme-color--info" href="http://fontawesome.io" target="_blank">Bootstrap</a>
        中的栅格系统设计理念一致的栅格组件。<br>
        它将父元素的宽度均等划分为12份，通过设置每个栅格占其中几份宽度来进行布局。<br>
        更准确地讲，是通过设置每个栅格在
        <span class="emphasize au-theme-color--success">不同的屏幕宽度下</span>
        占父元素宽度的十二分之几来进行
        <span class="emphasize au-theme-color--success">响应式布局</span>。
      </p>
      <!-- 组件示例 -->
      <div class="component-example au-theme-border-color--base-8">
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="8" width-md="4" width-sm="3" width-xs="6">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="3" width-md="7" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="3" width-md="6" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="3" width-md="9" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="3" width-md="4" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="5" width-md="5" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Esta occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="7" width-md="3" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="4" width-md="4" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaec
        </au-grid>
        <au-grid class="au-theme-background-color--warning au-theme-border-color--base-8" space="10px" width-lg="3" width-md="4" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
      </div>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">
        通过改变浏览器窗口大小来查看响应式布局效果
      </cite>
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
            <td>width-lg</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在大屏幕宽度（屏幕宽度超过1170px）时当前栅格所占宽度
            </td>
          </tr>
          <tr>
            <td>width-md</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在中等屏幕宽度（屏幕宽度超过970px）时当前栅格所占宽度
            </td>
          </tr>
          <tr>
            <td>width-sm</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在小屏幕宽度（屏幕宽度超过750px）时当前栅格所占宽度
            </td>
          </tr>
          <tr>
            <td>width-xs</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在超小屏幕宽度（所有屏幕宽度）时当前栅格所占宽度
            </td>
          </tr>
          <!-- offset -->
          <tr>
            <td>offset-lg</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在大屏幕宽度（屏幕宽度超过1170px）时当前栅格向右偏移的距离
            </td>
          </tr>
          <tr>
            <td>offset-md</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在中等屏幕宽度（屏幕宽度超过970px）时当前栅格向右偏移的距离
            </td>
          </tr>
          <tr>
            <td>offset-sm</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在小屏幕宽度（屏幕宽度超过750px）时当前栅格向右偏移的距离
            </td>
          </tr>
          <tr>
            <td>offset-xs</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Number</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">1~12</li>
              </ol>
            </td>
            <td>
              在超小屏幕宽度（所有屏幕宽度）时当前栅格向右偏移的距离
            </td>
          </tr>
          <tr>
            <td>space</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              String
            </td>
            <td>
              0px
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">合法的css宽度值，单位px</li>
              </ol>
            </td>
            <td>
              网格间的间距
            </td>
          </tr>
        </tbody>
      </au-table>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">
        默认情况下栅格将单列排列（每个栅格占满12格），当你需要在屏幕宽度小于750px时单列排列，而大于750px时3列排列，则可以设置<span class="code au-theme-radius au-theme-background-color--warning-bottom">width-sm="4"</span>来达成这个目标。<br>
        当一行所有栅格宽度及其偏移距离相加大于12时会自动换行。
      </cite>
    </au-panel>
    <au-panel class="section" title="Slots">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Events">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Methods">
      <!-- <h4 class="title-1"><span class="code au-theme-radius au-theme-background-color--warning-bottom">yourComponentInstance.$root.reorderAuGrids()</span>重新排序</h4>
      <p class="paragraph">
        由于我们并没有使用行的概念，并且基本无视了父级容器元素，所以所有的grid的cell位置，都是动态计算出来，然后使用flex来进行布局的。由于并不是纯CSS布局，会导致一个问题，就是外部元素的尺寸变化导致的父级容器元素宽度变化后，内部grid并不能感知。所以需要你在这种时候通知grid宽度变化。由于重排并不是一个grid组件的事情，而是所有grid组件的事情，所以我们把通知重排的方法挂载到了根组件上，只需在合适的时候调用<span class="code au-theme-radius au-theme-background-color--warning-bottom">this.$root.reorderAuGrids()</span>方法即可。
      </p>
      <p class="paragraph">
        但并不需要在<span class="code au-theme-radius au-theme-background-color--warning-bottom">window.resize</span>中使用这个方法，grid已经自己处理好了窗口尺寸变化事件。
      </p> -->
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-grid class="my-grid au-theme-border-color--base-8" width-lg="3" width-md="4" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="my-grid au-theme-border-color--base-8" width-lg="3" width-md="4" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
        <au-grid class="my-grid au-theme-border-color--base-8" width-lg="3" width-md="4" width-sm="6" width-xs="12">
          Enim consequat excepteur ut adipisicing Lorem sint. Enim excepteur culpa nostrud velit id occaecat labore eu fugiat est est ad minim in. Est excepteur fugiat enim id ea occaecat elit. Anim ad laborum qui id velit non laborum incididunt excepteur culpa eiusmod nostrud eu ex. Quis officia veniam ex sit qui est qui duis irure officia incididunt laborum enim. Deserunt aliquip consectetur ullamco eu aliqua.
        </au-grid>
      '></code-h>
    </au-panel>
  </div>
</template>
<script>
export default {
  name: 'grid-examples'
}
</script>
