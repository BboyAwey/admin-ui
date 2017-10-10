<style lang="scss" scoped>
  .collapse {
    .collapse-examples {
      width: 300px;
      height: 300px;
      margin: 10px;
      border-width: 1px;
      border-style: solid;
    }
    .collapse-paragraph {
      padding: 10px;
      margin: 0;
    }
  }
</style>
<template>
  <div class="page collapse">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        手风琴组件，提供水平方向和垂直方向上的伸缩折叠动画，无样式。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button @click="collapse = !collapse">{{ collapse ? '展开' : '收起'}}</au-button>
        <au-collapse class="collapse-examples au-theme-border-color--base-8" :collapse="collapse">
          <p class="paragraph collapse-paragraph">Laborum adipisicing do in dolore dolor consectetur adipisicing. Aute anim quis amet exercitation dolore. Laboris veniam occaecat eiusmod anim non qui. Laborum ipsum reprehenderit sint sint elit labore laborum ullamco.</p>
        </au-collapse>
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
            <td>collapse</td>
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
              是否折叠
            </td>
          </tr>
          <tr>
            <td>horizontal</td>
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
              是否水平折叠
            </td>
          </tr>
          <tr>
            <td>min</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>0px</td>
            <td>
              合法的css长度值
            </td>
            <td>最小折叠高度</td>
          </tr>
          <tr>
            <td>max</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>内容的高度</td>
            <td>
              合法的css长度值
            </td>
            <td>最大折叠高度</td>
          </tr>
          <tr>
            <td>transition</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
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
            <td>是否是用折叠展开动画</td>
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
        <au-button @click="collapse = !collapse">&#123;&#123;collapse ? "展开" : "收起" &#125;&#125;</au-button>
        <au-collapse class="collapse-examples au-theme-border-color--base-8" :collapse="collapse">
          <p class="paragraph collapse-paragraph">Laborum adipisicing do in dolore dolor consectetur adipisicing. Aute anim quis amet exercitation dolore. Laboris veniam occaecat eiusmod anim non qui. Laborum ipsum reprehenderit sint sint elit labore laborum ullamco.</p>
        </au-collapse>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              collapse: false
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'collapse-examples',
    data () {
      return {
        collapse: false
      }
    }
  }
</script>

