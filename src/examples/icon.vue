<style lang="scss" scoped>
  .icon-item {
    margin-right: 12px;
  }
</style>
<template>
  <div class="page">
    <doc-section title="组件描述">
      <doc-p>
        Admin UI中的图标组件，是基于著名的<doc-link href="http://fontawesome.io">Font Awesome 4</doc-link>,我们将其内置到了Admin UI中。
      </doc-p>
      <doc-cite>
        Admin UI 1中的图标组件是基于
        <doc-link href="http://ionicons.com/">Ionicons</doc-link>
        ，但由于其图标数量较少，这一版本中我们替换了它，如果你仍旧希望使用，可以手动引入到项目中，然后通过组件的"custom"接口来使用
      </doc-cite>
      <doc-example>
        <au-icon class="icon-item au-theme-color--primary" type="home" size="48px"></au-icon>
        <au-icon class="icon-item au-theme-color--success" type="heart" size="44px"></au-icon>
        <au-icon class="icon-item au-theme-color--danger" type="globe" size="46px"></au-icon>
        <au-icon class="icon-item au-theme-color--warning" type="user" size="46px"></au-icon>
        <au-icon class="icon-item au-theme-color--info" type="cog" size="46px"></au-icon>
      </doc-example>
    </doc-section>
    <doc-props
      :props="[
        {
          name: 'type',
          required: false,
          type: 'String',
          default: '-',
          options: '%%Font Awesome Icons%%，由于Font Awesome项目已经升级到5，其官网已经改版，建议优先参考：%%第三方提供的Font Awesome Icons列表%%',
          description: '图标的类型（仅支持免费版的FontAwesome）'
        },
        {
          name: 'unify-size',
          required: false,
          type: 'Boolean',
          default: 'false',
          description: '是否统一图标尺寸。图表库中可能存在图标宽度不一致的情况，有时候需要纵向对齐时会有麻烦。将本接口设置为true会将图标宽度设置为一致，纵向居中对齐'
        },
      ]"
      :links="{
        'Font Awesome Icons': 'https://fontawesome.com/icons?d=listing&m=free',
        '第三方提供的Font Awesome Icons列表': 'https://9iphp.com/fa-icons'
      }"
    />
    <doc-section title="Props">
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
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <a class="au-theme-color--info" href="https://fontawesome.com/icons?d=listing&m=free" target="_blank">Font Awesome Icons</a><br>
              由于Font Awesome项目已经升级到5，其官网已经改版，建议优先参考：
              <a class="au-theme-color--info" href="https://9iphp.com/fa-icons" target="_blank">第三方提供的Font Awesome Icons列表</a>
            </td>
            <td>
              图标的类型（仅支持免费版的FontAwesome）
            </td>
          </tr>
          <tr>
            <td>custom</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              自定义图标的class-name（用于支持第三方CSS图标库）
            </td>
          </tr>
          <tr>
            <td>size</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
          <tr>
            <td>unify-size</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
              是否统一图标尺寸<br>
              图表库中可能存在图标宽度不一致的情况，有时候需要纵向对齐时会有麻烦<br>
              将本接口设置为true会将图标宽度设置为一致，纵向居中对齐
            </td>
          </tr>
        </tbody>
      </au-table>
    </doc-section>
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
            <td>click</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              点击事件
            </td>
          </tr>
        </tbody>
        <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">当需要监听除点击事件之外的其它事件时，请使用<span class="code au-theme-radius au-theme-background-color--warning-bottom">.native</span>修饰符</cite>
      </au-table>
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
