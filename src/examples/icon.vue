<style lang="scss" scoped>
  .icon-item {
    margin-right: 12px;
  }
</style>
<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        Admin UI 2中的图标组件，是基于著名的
        <a class="au-theme-font-color--info-3" href="http://fontawesome.io" target="_blank">Font Awesome</a>
        ，我们将其内置到了Admin UI 2中
      </p>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
        Admin UI 1中的图标组件是基于
        <a class="au-theme-font-color--info-3" href="http://ionicons.com/" target="_blank">Ionicons</a>
        ，但由于其图标数量较少，这一版本中我们替换了它
      </cite>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-icon class="icon-item au-theme-font-color--primary-3" type="home" size="48px"></au-icon>
        <au-icon class="icon-item au-theme-font-color--success-3" type="heart" size="44px"></au-icon>
        <au-icon class="icon-item au-theme-font-color--danger-3" type="globe" size="46px"></au-icon>
        <au-icon class="icon-item au-theme-font-color--warning-3" type="user" size="46px"></au-icon>
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
            <td>false</td>
            <td>
              <a class="au-theme-font-color--info-3" href="http://fontawesome.io/icons/" target="_blank">Font Awesome Icons</a>
            </td>
            <td>
              图标的类型
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
              <!-- <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol> -->
              合法的css长度值
            </td>
            <td>
              图标尺寸，也可直接在组件上使用class或style的font-size属性控制而不使用此字段
            </td>
          </tr>
          <tr>
            <td>color</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              合法的css颜色值
            </td>
            <td>
              图标颜色，也可直接在组件上使用class或style的color属性控制而不使用此字段
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="Slots">
      <!-- <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>slot1</td>
            <td>
              该slot的详细说明
            </td>
          </tr>
        </tbody>
      </au-table> -->
      <au-icon type="minus"></au-icon>
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
        <au-icon type="check"></au-icon>
      '></code-h>
      <code-h lang="js">
        import AuIcon from 'admin-ui'
        export default {
          components: { AuIcon }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'icon-examples'
  }
</script>
