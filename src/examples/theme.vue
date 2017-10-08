<template>
  <div class="page">
    <au-panel class="section">
      <p class="paragraph">
        Admin UI 2使用样式类来构建主题系统。
      </p>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
        Admin UI 2所有组件中与颜色相关的样式现在都通过诸如<span class="code au-theme-radius au-theme-background-color--warning-5">.au-theme-background--primary-3</span>这样的样式类来控制。我们设计了一套简单的规则来使用它们，并使得动态切换主题变得十分便捷，但代价便是在颜色一类的样式使用上存在很多限制，需要你适应它，同时发挥创造力在这套规则的限制下创造出同样丰富的颜色。
      </cite>
    </au-panel>
    <au-panel class="section">
      <h4 class="title-1">自定义主题</h4>
      <p class="paragraph">
        Admin UI 2提供了<span class="code au-theme-radius au-theme-background-color--warning-5">.theme()</span>方法来让开发者和用户动态更换主题
      </p>
      <p class="paragraph">
        需要注意的是，颜色类的值中：<br>
        <span class="code au-theme-radius au-theme-background-color--warning-5">primary-3</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">warning-3</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">danger-3</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">info-3</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">success-3</span>
        为主要颜色<br>
        <span class="code au-theme-radius au-theme-background-color--warning-5">[color]-2</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">[color]-4</span>
        为明度较接近主要颜色的次要颜色<br>
        <span class="code au-theme-radius au-theme-background-color--warning-5">[color]-1</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">[color]-5</span>
        为明度与主要颜色相差较大的辅助颜色<br>
        <span class="code au-theme-radius au-theme-background-color--warning-5">base-0</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">base-12</span>
        为最暗无彩色和最亮无彩色（建议使用纯黑和纯白）<br>
        <span class="code au-theme-radius au-theme-background-color--warning-5">base-[1~11]</span>
        为按明度排列的无彩色（灰色）。<br>
        彩色从[1~5]无彩色从[0~12]按明度顺序排列，彩色和无彩色的明度顺序需要一致。
        <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
          请牢记上面的规则，这对你进行主题自定义和主题系统全站应用非常重要。
        </cite>
      </p>
      <code-h lang="js">
        // 可接受的所有配置
        import AdminUi from 'admin-ui'
        AdminUi.theme({
          colors: {
            'base-0': '#000',
            'base-1': '#3c4147',
            'base-2': '#575e66',
            'base-3': '#757f8a ',
            'base-4': '#8b97a3',
            'base-5': '#a4b0bc',
            'base-6': '#b4bdc8',
            'base-7': '#cbd1d9',
            'base-8': '#d8dde6',
            'base-9': '#e6ecf2',
            'base-10': '#eef5f9',
            'base-11': '#f7fafb',
            'base-12': '#fff',

            'primary-1': '#042039',
            'primary-2': '#1c7dd2',
            'primary-3': '#1c86e2',
            'primary-4': '#1e8cee',
            'primary-5': '#c7e5ff',

            'info-1': '#062846',
            'info-2': '#2391d7',
            'info-3': '#32a2ea',
            'info-4': '#37aefa',
            'info-5': '#ceecff',

            'warning-1': '#322600',
            'warning-2': '#eea806',
            'warning-3': '#f5ae08',
            'warning-4': '#fab612',
            'warning-5': '#ffe9b2',

            'danger-1': '#400c10',
            'danger-2': '#e03743',
            'danger-3': '#ea3a46',
            'danger-4': '#f53e50',
            'danger-5': '#ffbcc2',

            'success-1': '#00301e',
            'success-2': '#0cae6c',
            'success-3': '#0cb470',
            'success-4': '#0ebc74',
            'success-5': '#ace6ce'
          },
          shadows: {
            'level-1': '0 1px 3px rgba(60, 65, 71, .5)',
            'level-2': '0 2px 4px rgba(60, 65, 71, .4)',
            'level-3': '0 3px 6px rgba(60, 65, 71, .3)',
            'primary': '0 1px 3px rgba(28, 134, 226, .5)',
            'info': '0 1px 3px rgba(50, 162, 234, .5)',
            'warning': '0 1px 3px rgba(245, 174, 8, .5)',
            'danger': '0 1px 3px rgba(234, 58, 70, .5)',
            'success': '0 1px 3px rgba(12, 180, 112, .5)'
          },
          borderRadius: false // 默认为true
        })
      </code-h>
    </au-panel>
    <au-panel class="section">
      <h4 class="title-1">全站应用</h4>
      <p class="paragraph">
        如果你的网站有换肤需求，那仅仅更换Admin-UI的主题似乎满足不了你的需求。这时候你可能希望将这套主题系统应用到全站当中。
      </p>
      <p class="paragraph">
        因为整套主题系统是基于样式类构建的，所以即使应用到全站当中也非常简单，只需要按规则为你的元素编写样式类即可。Admin UI 2中的主题样式类按照下面的规则来使用：
      </p>
      <p class="paragraph">
        <span class="code au-theme-radius au-theme-background-color--warning-5">前缀</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">[-伪类名]</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">-属性名</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">--属性值</span>
        <span class="code au-theme-radius au-theme-background-color--warning-5">[-权重]</span>
      </p>
      <au-table class="table">
        <thead>
          <tr>
            <th>字段</th>
            <th>必填</th>
            <th>可选</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>前缀</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">au-theme</li>
              </ol>
            </td>
            <td>主题样式类前缀</td>
          </tr>
          <tr>
            <td>伪类名</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">link</li>
                <li class="au-theme-border-color--base-8">visited</li>
                <li class="au-theme-border-color--base-8">hover</li>
                <li class="au-theme-border-color--base-8">active</li>
                <li class="au-theme-border-color--base-8">focus</li>
                <li class="au-theme-border-color--base-8">first-child</li>
                <li class="au-theme-border-color--base-8">last-child</li>
                <li class="au-theme-border-color--base-8">before</li>
                <li class="au-theme-border-color--base-8">after</li>
                <li class="au-theme-border-color--base-8">enabled</li>
                <li class="au-theme-border-color--base-8">disabled</li>
                <li class="au-theme-border-color--base-8">checked</li>
              </ol>
            </td>
            <td>
              如果主题是应用在当前元素的伪类上的，则可以在类名中连接伪类名。
              <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">注意，伪类名不可叠加使用，请发挥你的聪明才智。</cite>
            </td>
          </tr>
          <tr>
            <td>属性名</td>
            <td>
              <au-icon type="check" class="au-theme-font-color--success-3"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">font-color</li>
                <li class="au-theme-border-color--base-8">border-color</li>
                <li class="au-theme-border-color--base-8">border-top-color</li>
                <li class="au-theme-border-color--base-8">border-right-color</li>
                <li class="au-theme-border-color--base-8">border-bottom-color</li>
                <li class="au-theme-border-color--base-8">border-left-color</li>
                <li class="au-theme-border-color--base-8">border-left-color</li>
                <li class="au-theme-border-color--base-8">border-radius</li>
                <li class="au-theme-border-color--base-8">border-top-left-radius</li>
                <li class="au-theme-border-color--base-8">border-top-right-radius</li>
                <li class="au-theme-border-color--base-8">border-bottom-leftradius</li>
                <li class="au-theme-border-color--base-8">border-bottom-right-radius</li>
                <li class="au-theme-border-color--base-8">background-color</li>
                <li class="au-theme-border-color--base-8">shadow</li>
              </ol>
            </td>
            <td>如果主题是应用在当前元素的伪类上的，则可以在类名中连接伪类名。<br>注意，伪类名不可叠加使用，请发挥你的聪明才智。</td>
          </tr>
          <tr>
            <td>属性值</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              颜色类：
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">primary-[1~5]</li>
                <li class="au-theme-border-color--base-8">warning-[1~5]</li>
                <li class="au-theme-border-color--base-8">danger-[1~5]</li>
                <li class="au-theme-border-color--base-8">info-[1~5]</li>
                <li class="au-theme-border-color--base-8">success-[1~5]</li>
                <li class="au-theme-border-color--base-8">base-[0~12]</li>
              </ol>
              阴影类：
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">level-[1~3]</li>
                <li class="au-theme-border-color--base-8">primary</li>
                <li class="au-theme-border-color--base-8">warning</li>
                <li class="au-theme-border-color--base-8">danger</li>
                <li class="au-theme-border-color--base-8">info</li>
                <li class="au-theme-border-color--base-8">success</li>
              </ol>
            </td>
            <td>
              除了参考自定义主题中的规则，还有一点需要注意的是<br>
              <span class="code au-theme-radius au-theme-background-color--warning-5">au-theme-radius</span>不需要属性值
            </td>
          </tr>
          <tr>
            <td>权重</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-font-color--success-3"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">important</li>
              </ol>
            </td>
            <td>
              为css属性值添加
              <span class="code au-theme-radius au-theme-background-color--warning-5">！important</span>前缀
            </td>
          </tr>
        </tbody>
      </au-table>
      <p class="paragraph">
        例如：
      </p>
      <code-h lang="html" :content='`
        <div class="
          au-theme-bakcground-color--base-12
          au-theme-border-color--primary-3
          au-theme-font-color--base-3
          au-theme-shadow--level-1
          au-theme-radius
        "></div>
      `'></code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'theme'
  }
</script>
