<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        按钮组件，不同颜色的按钮，还有空心按钮
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-button type="default">按钮</au-button>
        <au-button type="primary" size="mini">按钮</au-button>
        <au-button type="danger" size="small">按钮</au-button>
        <au-button type="warning" size="large">按钮</au-button>
        <au-button type="info">按钮</au-button>
        <au-button type="primary" :plain="true">按钮</au-button>
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
            <td>type</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>primary</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">default</li>
                <li class="au-theme-border-color--base-8">primary</li>
                <li class="au-theme-border-color--base-8">danger</li>
                <li class="au-theme-border-color--base-8">warning</li>
                <li class="au-theme-border-color--base-8">info</li>
                <li class="au-theme-border-color--base-8">success</li>
              </ol>
            </td>
            <td>
              按钮类型
            </td>
          </tr>
          <tr>
            <td>size</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">large</li>
                <li class="au-theme-border-color--base-8">small</li>
                <li class="au-theme-border-color--base-8">mini</li>
              </ol>
            </td>
            <td>
              按钮尺寸
            </td>
          </tr>
          <tr>
            <td>plain</td>
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
            <td>空心按钮</td>
          </tr>
          <tr>
            <td>disabled</td>
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
            <td>禁用</td>
          </tr>
          <tr>
            <td>native-type</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>false</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">button</li>
                <li class="au-theme-border-color--base-8">submit</li>
                <li class="au-theme-border-color--base-8">reset</li>
              </ol>
            </td>
            <td>原生类型</td>
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
            <td>@click</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">event</li>
              </ol>
            </td>
            <td>点击事件</td>
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
        <au-button type="primary" @click="handleClick"></au-button>
      '></code-h>
      <code-h lang="js">
        import AuButton from 'admin-ui'
        export default {
          components: { AuButton },
          methods: {
            handleClick (event) {
              console.log(event)
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'button-examples'
  }
</script>
