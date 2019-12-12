<template>
  <div class="page">
    <au-panel class="section">
      <p class="paragraph">
        Admin UI使用样式类来构建主题系统。
      </p>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">
        Admin UI所有组件中与颜色相关的样式现在都通过诸如<span class="code au-theme-radius au-theme-background-color--warning-bottom">.au-theme-background--primary</span>这样的样式类来控制。我们设计了一套简单的规则来使用它们，并使得动态切换主题变得十分便捷，但代价便是在颜色一类的样式使用上存在很多限制，需要你适应它，同时发挥创造力在这套规则的限制下创造出同样丰富的颜色。
      </cite>
    </au-panel>
    <au-panel class="section">
      <h4 class="title-1">主题配置项</h4>
      <p class="paragraph">
        Admin UI提供了<span class="code au-theme-radius au-theme-background-color--warning-bottom">.theme()</span>方法来让开发者和用户动态配置和更换主题：
      </p>
      <code-h lang="js">
        import AdminUi from 'admin-ui'
        AdminUi.theme({
          theme: {
            // 彩色配置
            colors: {
              primary: '#2196f3',
              success: '#4caf50',
              danger: '#f44336',
              warning: '#ff9800',
              info: '#607d8b'
            },
            // 阴影配置，默认基于primary颜色自动计算
            shadows: {
              base: '',
              primary: '',
              info: '',
              warning: '',
              danger: '',
              success: ''
            },
            // 圆角配置
            radiuses: {
              small: '3px',
              large: '5px'
            }
          },
          // 反转lightness排序（黑白主题）
          lightnessReverse: false,
          // top和bottom颜色距离纯黑和纯白的lightness的距离，越小越接近纯黑纯白
          colorTopBottom: 5,
          // 彩色上下接近色与正色的lightness距离
          colorUpDown: 10,
          // 无彩色分级数量
          baseColorLeve: 12,
          // 无彩色饱和度
          baseColorHue: '20%',
          // 无彩色阴影不透明度
          baseShadowOpacity: 0.2,
          // 彩色阴影不透明度
          colorShadowOpacity: 0.6
        })
      </code-h>
      <p class="paragraph">
        上述配置是Admin UI用到的所有配置，也即官方的默认配置。修改这些配置，Admin UI的所有组件都将被影响。
      </p>
      <p class="paragraph">
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">theme</span>选项是最主要的配置项，可以配置颜色、阴影和圆角。除外的其它选项都为辅助选项，其具体作用见上述注释。所有这些选项都是可选的，上述选项的值即为Admin UI提供的默认值。
      </p>
      <p class="paragraph">
        基于上述配置，Admin UI提供了一系列的样式类名称，其本身的所有组件都使用了这些样式类名称来应用主题。这些样式类名称不仅仅局限于Admin UI本身，它也可以被应用到你的整个项目。
      </p>
    </au-panel>
    <au-panel class="section">
      <h4 class="title-1">颜色生成规则</h4>
      <p class="paragraph">
        颜色配置中的五个颜色<br>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">primary</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">warning</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">danger</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">info</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">success</span>
        为主要颜色。基于这五个主要颜色，为其生成了4个辅助色。<br>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">[color]-up</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">[color]-down</span>
        为明度较接近主要颜色的两个接近色。<br>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">[color]-top</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">[color]-bottom</span>
        为明度与主要颜色相差较大的两个远离色。<br>
        基于配置中无彩色的相关配置，以及<span class="code au-theme-radius au-theme-background-color--warning-bottom">primary</span>色，Admin UI自动生成了一系列按明度排列的无彩色。假如配置中无彩色的分级设置为了12，则：
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">base-0</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">base-12</span>
        为纯黑和纯白<br>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">base-[1~11]</span>
        为按明度排列的无彩色。<br>
        可以看到，每种彩色自上而下依次为：<span class="code au-theme-radius au-theme-background-color--warning-bottom">top</span> -> <span class="code au-theme-radius au-theme-background-color--warning-bottom">up</span> -> <span class="code au-theme-radius au-theme-background-color--warning-bottom">[primary]</span> -> <span class="code au-theme-radius au-theme-background-color--warning-bottom">down</span> -> <span class="code au-theme-radius au-theme-background-color--warning-bottom">bottom</span>，无彩色则按照0-分级排列，这些颜色的明度顺序是一致的，可以使用<span class="code au-theme-radius au-theme-background-color--warning-bottom">lightnessReverse</span>对明度顺序进行反转。
        <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">
          如此设计的规则，主要是为了在满足主体功能的前提下，尽可能减少类的数量，减少大家的认知成本。请牢记上面的规则，这对你进行主题自定义和主题系统全站应用非常重要。
        </cite>
      </p>
    </au-panel>
    <au-panel class="section">
      <h4 class="title-1">全站应用</h4>
      <p class="paragraph">
        Admin UI中的主题样式类是按照下面的规则来生成的：
      </p>
      <p class="paragraph">
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">前缀</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">[-伪类名]</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">-属性名</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">--属性值</span>
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">[-权重]</span>
      </p>
      <p class="paragraph">
        每个部分的可选值如下：
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
              <au-icon type="check" class="au-theme-color--success"></au-icon>
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
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
              <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">很遗憾，伪类名不可叠加使用，请发挥你的聪明才智。</cite>
            </td>
          </tr>
          <tr>
            <td>属性名</td>
            <td>
              <au-icon type="check" class="au-theme-color--success"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">color</li>
                <li class="au-theme-border-color--base-8">placeholder-color</li>
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
                <li class="au-theme-border-color--base-8">box-shadow</li>
              </ol>
            </td>
            <td>可使用的属性名</td>
          </tr>
          <tr>
            <td>属性值</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              颜色类：
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">primary-top</li>
                <li class="au-theme-border-color--base-8">primary-up</li>
                <li class="au-theme-border-color--base-8">primary</li>
                <li class="au-theme-border-color--base-8">primary-down</li>
                <li class="au-theme-border-color--base-8">primary-bottom</li>
                <li class="au-theme-border-color--base-8">warning-top</li>
                <li class="au-theme-border-color--base-8">warning-up</li>
                <li class="au-theme-border-color--base-8">warning</li>
                <li class="au-theme-border-color--base-8">warning-down</li>
                <li class="au-theme-border-color--base-8">warning-bottom</li>
                <li class="au-theme-border-color--base-8">danger-top</li>
                <li class="au-theme-border-color--base-8">dange-up</li>
                <li class="au-theme-border-color--base-8">danger</li>
                <li class="au-theme-border-color--base-8">danger-down</li>
                <li class="au-theme-border-color--base-8">danger-bottom</li>
                <li class="au-theme-border-color--base-8">info-top</li>
                <li class="au-theme-border-color--base-8">info-up</li>
                <li class="au-theme-border-color--base-8">info</li>
                <li class="au-theme-border-color--base-8">info-down</li>
                <li class="au-theme-border-color--base-8">info-bottom</li>
                <li class="au-theme-border-color--base-8">success-top</li>
                <li class="au-theme-border-color--base-8">success-up</li>
                <li class="au-theme-border-color--base-8">success</li>
                <li class="au-theme-border-color--base-8">success-down</li>
                <li class="au-theme-border-color--base-8">success-bottom</li>
                <li class="au-theme-border-color--base-8">base-top</li>
                <li class="au-theme-border-color--base-8">base-up</li>
                <li class="au-theme-border-color--base-8">base</li>
                <li class="au-theme-border-color--base-8">base-down</li>
                <li class="au-theme-border-color--base-8">base-bottom</li>
              </ol>
              圆角类：
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">normal</li>
                <li class="au-theme-border-color--base-8">large</li>
              </ol>
              阴影类：
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">base</li>
                <li class="au-theme-border-color--base-8">primary</li>
                <li class="au-theme-border-color--base-8">warning</li>
                <li class="au-theme-border-color--base-8">danger</li>
                <li class="au-theme-border-color--base-8">info</li>
                <li class="au-theme-border-color--base-8">success</li>
              </ol>
            </td>
            <td>
              可使用的属性值
            </td>
          </tr>
          <tr>
            <td>权重</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">important</li>
              </ol>
            </td>
            <td>
              为css属性值添加
              <span class="code au-theme-radius au-theme-background-color--warning-bottom">!important</span>后缀
            </td>
          </tr>
        </tbody>
      </au-table>
      <p class="paragraph">
        所有，我们可以这样使用Admin UI提供的样式类：
      </p>
      <code-h lang="html" :content='`
        <div class="
          au-theme-bakcground-color--base-12
          au-theme-border-color--primary
          au-theme-color--base-3
          au-theme-box-shadow--base
          au-theme-border-radius--large
        "></div>
      `'></code-h>
    </au-panel>
    <au-panel class="section">
      <h4 class="title-1">自定义主题类名</h4>
      <p class="paragraph">
        <span class="code au-theme-radius au-theme-background-color--warning-bottom">.theme(options)</span>方法的<span class="code au-theme-radius au-theme-background-color--warning-bottom">options</span>参数中，可以使用自定义的主题类名。Admin UI的默认主题中提供了5种彩色，及根据这5种彩色生成的各自的四种辅助色，假设现在你希望添加一个<span class="code au-theme-radius au-theme-background-color--warning-bottom">my-color</span>类作为颜色类，一个<span class="code au-theme-radius au-theme-background-color--warning-bottom">my-radius</span>作为圆角类，一个<span class="code au-theme-radius au-theme-background-color--warning-bottom">my-shadow</span>作为阴影类，则可以像下面这样定义：
      </p>
      <code-h lang="js">
        adminUi.theme({
          'colors': {
            'my-color': '#ff6633'
          },
          'radiuses': {
            'my-radius': '6px'
          },
          'shadows': {
            'my-shadow': '0 0 6px rgba(60, 60, 60, .75)'
          }
        })
      </code-h>
      <p class="paragraph">
        然后你可以按照前文的规则来使用这个自定义的主题类：
      </p>
      <code-h lang="html" :content='`
        <div class="
          au-theme-color--my-color
          au-theme-box-shadow--my-shadow
          au-theme-border-radius--my-radius
        "></div>
      `'></code-h>
    </au-panel>
    <!-- <au-panel class="section">
      <h4 class="title-1">配色参考</h4>
      <p class="paragraph">
        有时候你可能不希望自己配置颜色，但又不想使用官方默认配色，所以我们提供一些配色方案供你选择。
      </p>
      <h4 class="title-2">蓝色主题（Admin-UI 2的默认主题）：</h4>
      <code-h lang="js">
        {
          colors: {
            'primary': '#1c86e2',
            'info': '#32a2ea',
            'warning': '#f5ae08',
            'danger': '#ea3a46',
            'success': '#0cb470'
          }
        }
      </code-h>
    </au-panel> -->
  </div>
</template>
<script>
export default {
  name: 'theme'
}
</script>
