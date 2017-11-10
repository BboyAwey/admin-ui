<style lang="scss" scoped>
  @import '../style/common';
</style>
<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        树组件
      </p>
      <!-- 组件示例 -->
      <div @click="clickMe">点我看看</div>
      <div class="component-example">
        <au-tree :tree-data="treeData" :show-checkbox="true" @node-click="nodeClick" @check-change="treeChange"></au-tree>
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
    data () {
      return {
        treeData: []
      }
    },
    methods: {
      treeChange (item, items) {
        console.dir(item)
        console.dir(items)
      },
      nodeClick (item, items) {
        console.dir(item)
        console.dir(items)
      },
      clickMe () {
        var that = this
        var data = [
          {
            label: '行为分析',
            checked: true,
            children: [
              {
                label: '时间',
                checked: true,
                children: [
                  {
                    label: '二级',
                    checked: true,
                    children: [
                      {
                        label: '三一级',
                        checked: false
                      },
                      {
                        label: '三二级',
                        checked: true
                      }
                    ]
                  }
                ]
              },
              {
                label: '操作类型',
                checked: true
              }
            ]
          },
          {
            label: '漏斗分析',
            checked: true
          },
          {
            label: '路径分析',
            checked: true
          }
        ]
        setTimeout(() => {
          that.treeData = data
        }, 0)
      }
    }
  }
</script>


