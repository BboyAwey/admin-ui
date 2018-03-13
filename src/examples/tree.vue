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
      <div class="component-example">
        <au-tree :tree-data="treeData" :show-children="true" :show-checkbox="true" @node-click="nodeClick" @check-change="treeChange" @node-expand="nodeExpand" @node-collapse="nodeCollapse"></au-tree>
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
            <td>treeData</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              Array <br>
                -Object
            </td>
            <td>[]</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">label: String, 树节点显示的文字</li>
                <li class="au-theme-border-color--base-8">checked: Boolean 树节点的选中状态,默认为true</li>
                <li class="au-theme-border-color--base-8">children: Array 子节点</li>
              </ol>
            </td>
            <td>
              树数据
            </td>
          </tr>
          <tr>
            <td>showCheckbox</td>
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
            <td>
              是否显示checkbox，默认带checkbox
            </td>
          </tr>
          <tr>
            <td>showChildren</td>
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
            <td>是否展开子节点，默认展开</td>
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
            <td>@node-click</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">item 点击的节点数据</li>
                <li class="au-theme-border-color--base-8">items 整个树的树据</li>
                <li class="au-theme-border-color--base-8">event</li>
              </ol>
            </td>
            <td>点击节点事件</td>
          </tr>
          <tr>
            <td>@check-change</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">item 点击的节点数据</li>
                <li class="au-theme-border-color--base-8">items 整个树的树据</li>
                <li class="au-theme-border-color--base-8">event</li>
              </ol>
            </td>
            <td>节点checkbox 选中事件</td>
          </tr>
          <tr>
            <td>@node-expand</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">item 点击的节点数据</li>
                <li class="au-theme-border-color--base-8">items 整个树的树据</li>
                <li class="au-theme-border-color--base-8">event</li>
              </ol>
            </td>
            <td>节点展开事件</td>
          </tr>
           <tr>
            <td>@node-collapse</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">item 点击的节点数据</li>
                <li class="au-theme-border-color--base-8">items 整个树的树据</li>
                <li class="au-theme-border-color--base-8">event</li>
              </ol>
            </td>
            <td>节点收起事件</td>
          </tr>
        </tbody>
      </au-table>
      <!-- <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">当需要监听除点击事件之外的其它事件时，请使用<span class="code au-theme-radius au-theme-background-color--warning-5">.native</span>修饰符</cite> -->
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
       <au-tree :tree-data="treeData" :show-children="true" :show-checkbox="true" @node-click="nodeClick" @check-change="treeChange"></au-tree>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              treeData: [
                {
                  label: '行为分析',
                  checked: true,
                  children: [
                    {
                      label: '时间',
                      checked: true
                    },
                    {
                      label: '操作类型',
                      checked: true
                    }
                  ]
                },
                {
                  label: '路径分析',
                  checked: true
                }
              ]
            }
          },
          methods: {
            treeChange (item, items, e) {
              console.dir(item)
              console.dir(items)
              console.dir(e)
            },
            nodeClick (item, items, e) {
              console.dir(item)
              console.dir(items)
              console.dir(e)
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
      treeData: [
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
    }
  },
  methods: {
    treeChange (item, items, e) {
      console.dir(item)
      console.dir(items)
      console.dir(e)
    },
    nodeClick (item, items, e) {
      console.dir(item)
      console.dir(items)
      console.dir(e)
    },
    nodeExpand (item, items, e) {
      console.dir(item)
      console.dir(items)
      console.dir(e)
    },
    nodeCollapse (item, items, e) {
      console.dir(item)
      console.dir(items)
      console.dir(e)
    }
  }
}
</script>
