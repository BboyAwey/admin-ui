<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        根据标签选择进行内容切换显示。
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <div style="width:100%;padding:30px;">
          <au-tabs :tabs="tabs" :current="activeTabName" style="height:400px;">
            <!--name required and is tabName-->
            <div name="baseInfo">基本信息</div>
            <div name="externalresource">列表信息</div>
          </au-tabs>
        </div>
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
          <td>tabs</td>
          <td>
            <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
            <!--<au-icon type="times"></au-icon>-->
          </td>
          <td>
            <ol>
              <li> Array </li>
              <li> -Object </li>
              <li> --String </li>
              <li> --Strin </li>
            </ol>
          </td>
          <td>[]</td>
          <td>
            ——

          </td>
          <td>
            标签内容 Object name：标签name text：标签显示名称 比如： [{ name: '...', text: '...' }]

          </td>
        </tr>
        <tr>
          <td>currentTabName</td>
          <td>
            <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
            <!--<au-icon type="times"></au-icon>-->
          </td>
          <td>String</td>
          <td>

          </td>
          <td>
            ——

          </td>
          <td>
            表示当前选中的标签Id

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
            组件通过默认slot的name属性作为标识，来显示对应的内容
          </td>
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
          <td>@admin-tabs-toggle</td>
          <td>
            <ol class="option-list">
              <li class="au-theme-border-color--base-8">event</li>
            </ol>
          </td>
          <td>当tabs切换的时候触发该事件，事件处理函数接受两个参数，tabName和event，tabName表示当前切换到的tab的name属性，event表示当前点击事件的事件对象，但是如果是由外部修改currentTabName的值触发的切换，则event为undefined

          </td>
        </tr>
        </tbody>
      </au-table>
      <cite
        class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">当需要监听除点击事件之外的其它事件时，请使用<span
        class="code au-theme-radius au-theme-background-color--warning-5">.native</span>修饰符</cite>
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Methods">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
      <div style="width:700px;padding:30px;" >
      <au-tabs :tabs="tabsData" :current="activeTabNameData" style="height:400px;" >
         <!--name required and is tabName-->
        <div name="baseInfo" >基本信息</div> <div name="externalresource">列表信息</div> </au-tabs>
      </div>
      '>
      </code-h>
      <code-h lang="js">

        import adTabs from '../admin-ui/components/tabs'
        export default{
           data(){
             return {
               activeTabName:'baseInfo',
               tabs:[
                       {
                           name:'baseInfo',
                           text:'基本信息'
                       },
                       {
                           name:'externalresource',
                           text:'列表信息'
                       }
                   ]
             };
           },
           components: {
                 adTabs
           }
        }


      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'tabs-examples',
    data () {
      return {
        activeTabName: '',
        tabs: [
          {
            name: 'baseInfo',
            text: '基本信息'
          },
          {
            name: 'externalresource',
            text: '列表信息'
          }
        ]
      }
    }
  }
</script>
