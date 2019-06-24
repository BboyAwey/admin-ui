<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个文件上传组件，兼具文件上传，已上传文件预览、删除、下载、描述等功能。<br>
      </p>
      <!-- 组件示例 -->
      <div class="component-example">
        <au-upload label="请上传附件" button-text="选择文件" v-model="files" inline action="http://localhost:1234/upload" :auto-upload="true" :can-describe="true" @change="change" list-type="inline" multiple :show-upload-button="true"></au-upload>
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
            <td>value</td>
            <td>
              <au-icon type="check" class="au-theme-color--success"></au-icon>
              <!-- <au-icon type="times"></au-icon> -->
            </td>
            <td>
              Array <br>
              -Object
            </td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">base64: String, 文件的base64字符串</li>
                <li class="au-theme-border-color--base-8">description: String, 文件的描述</li>
                <li class="au-theme-border-color--base-8">extension: String, 文件的后缀名</li>
                <li class="au-theme-border-color--base-8">file: File, 原生的文件对象</li>
                <li class="au-theme-border-color--base-8">isImage: Boolean, 表示当前文件是否为图片</li>
                <li class="au-theme-border-color--base-8">name: String, 文件名</li>
                <li class="au-theme-border-color--base-8">percent: Number, 上传进度</li>
                <li class="au-theme-border-color--base-8">timestamp: Number, 用户选择文件时的时间戳</li>
                <li class="au-theme-border-color--base-8">type: String, 文件类型，参考<a class="au-theme-color--info" href="https://www.iana.org/assignments/media-types/media-types.xhtml" target="_blank">Media Types</a></li>
                <li class="au-theme-border-color--base-8">url: String, 文件地址</li>
              </ol>

              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              上传组件中已经选中或已经上传的文件<br>
              所有属性都是可选的，但url和name需要至少提供一个<br>
              支持v-model语法
            </td>
          </tr>
          <tr>
            <td>name</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              传递给后端接口的文件名<br>
              也即添加到formData对象中时使用的key
            </td>
          </tr>
          <tr>
            <td>multiple</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Boolean</td>
            <td>true</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              是否多选文件
            </td>
          </tr>
          <tr>
            <td>accept</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              参考：<a class="au-theme-color--info" href="https://www.iana.org/assignments/media-types/media-types.xhtml" target="_blank">Media Types</a>表中的template字段
              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              可接受的文件类型，默认不指定则全部文件类型都接受
            </td>
          </tr>
          <tr>
            <td>auto-upload</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Boolean</td>
            <td>true</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              是否自动上传
            </td>
          </tr>
          <tr>
            <td>action</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              自动上传时的上传接口地址<br>
              无论是否设置为可多选文件，组件每次仅向该地址上传一个文<br>
              （如果一次选择了5个文件，则将会发送5个上传请求）<br>
              该地址成功时应该返回一个json字符串，包含当前上传的文件的地址<br>
              可以使用urlPath来解析和获取到这个地址<br>
              否则下载功能不可用<br>
              仅在autoUpload为true时生效
            </td>
          </tr>
          <tr>
            <td>urlPath</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>'url'</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              自动上传成功后后端接口返回的文件url的对象路径<br>
              类似Object Path语法，使用"."作为分隔符<br>
              <br>
              例如：{<br>
                "message":"upload success",<br>
                "data":"http://127.0.0.1:3000/upload-files/me.jpg"<br>
              }<br>
              则其文件url的对象路径为'data'<br>
              <br>
              又如：{<br>
                "message":"upload success",<br>
                "data":{ "url": "http://127.0.0.1:3000/upload-files/me.jpg" }<br>
              }<br>
              则其文件url的对象路径为'data.url'<br>
              如没有正确的文件url的对象路径，则下载和预览功能不可用<br>
              仅在autoUpload为true时生效
            </td>
          </tr>
          <tr>
            <td>baseUrl</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>''</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              自动上传成功后后端接口返回的文件url有可能不包含baseUrl，<br>
              比如可能只返回类似'some-path/your-file.ext'这样无法直接访问的地址，<br>
              为了保证预览和下载功能能够正确访问到已上传的文件，<br>
              需要提供baseUrl<br>
              仅在autoUpload为true时生效
            </td>
          </tr>
          <tr>
            <td>method</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>post</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">get</li>
                <li class="au-theme-border-color--base-8">post</li>
              </ol>
              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              自动上传时的请求类型<br>
              仅在autoUpload为true时生效
            </td>
          </tr>
          <tr>
            <td>data</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Object</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              提供给上传接口的其它字段<br>
              仅在autoUpload为true时生效
            </td>
          </tr>
          <tr>
            <td>withCredentials</td>
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
              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              访问跨域的上传接口时是否使用cookie或authorization headers<br>
              仅在autoUpload为true时生效
            </td>
          </tr>
          <tr>
            <td>headers</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Object</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              设置或修改访问上传接口时的headers<br>
              仅在autoUpload为true时生效
            </td>
          </tr>
          <tr>
            <td>show-upload-button</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Boolean</td>
            <td>true</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">true</li>
                <li class="au-theme-border-color--base-8">false</li>
              </ol>
              <!-- <au-icon type="minus"></au-icon> -->
            </td>
            <td>
              是否显示上传按钮
            </td>
          </tr>
          <tr>
            <td>label</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              上传按钮前的提示文字<br>
              仅在show-upload-button为true时有效
            </td>
          </tr>
          <tr>
            <td>button-text</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>上传文件</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              上传按钮文字<br>
              仅在show-upload-button为true时有效
            </td>
          </tr>
          <tr>
            <td>button-type</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>primary</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">default</li>
                <li class="au-theme-border-color--base-8">primary</li>
                <li class="au-theme-border-color--base-8">warning</li>
                <li class="au-theme-border-color--base-8">danger</li>
                <li class="au-theme-border-color--base-8">success</li>
                <li class="au-theme-border-color--base-8">info</li>
              </ol>
            </td>
            <td>
              上传按钮颜色<br>
              仅在show-upload-button为true时有效
            </td>
          </tr>
          <tr>
            <td>button-size</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>normal</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">large</li>
                <li class="au-theme-border-color--base-8">normal</li>
                <li class="au-theme-border-color--base-8">small</li>
                <li class="au-theme-border-color--base-8">mini</li>
              </ol>
            </td>
            <td>
              上传按钮尺寸<br>
              仅在show-upload-button为true时有效
            </td>
          </tr>
          <tr>
            <td>button-plain</td>
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
              上传按钮是否为空心按钮<br>
              仅在show-upload-button为true时有效
            </td>
          </tr>
          <tr>
            <td>disabled</td>
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
            <td>禁用</td>
          </tr>
          <tr>
            <td>show-file-list</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
            <td>是否显示文件列表</td>
          </tr>
          <tr>
            <td>list-type</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>String</td>
            <td>block</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">block</li>
                <li class="au-theme-border-color--base-8">inline</li>
              </ol>
            </td>
            <td>
              文件列表排列方式<br>
              仅在show-file-list为true时有效
            </td>
          </tr>
          <tr>
            <td>can-remove</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
              文件列表中的文件是否可以被删除<br>
              仅在show-file-list为true时有效
            </td>
          </tr>
          <tr>
            <td>can-describe</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
              文件列表中的文件是否可填写描述<br>
              仅在show-file-list为true时有效
            </td>
          </tr>
          <tr>
            <td>can-download</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
              文件列表中的文件是否可下载<br>
              仅在show-file-list为true时有效
            </td>
          </tr>
          <tr>
            <td>can-preview</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
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
              文件列表中的图片文件是否可预览<br>
              仅在show-file-list为true时有效
            </td>
          </tr>
          <tr>
            <td>before-remove</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              当用户点击删除图标删除文件前调用<br>
              接受一个表示当前要删除的文件的file参数，和第二个表示文件位置的index参数<br>
              如果函数未返回或者返回true，则文件被删除<br>
              如果函数返回false，则文件不被删除<br>
              如果希望异步地做一些事情，可以返回一个promise对象，当其resolve时文件被删除，reject时文件不被删除<br>
              仅在show-file-list和can-remove为true时有效
            </td>
          </tr>
          <tr>
            <td>before-describe</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              当用户修改文件描述后点击确认图标时调用<br>
              接受一个表示当前用户输入的描述信息的description参数，和第二个表示文件位置的index参数<br>
              如果函数未返回或者返回true，则文件描述被修改<br>
              如果函数返回false，则文件描述不被修改<br>
              如果希望异步地做一些事情，可以返回一个promise对象，当其resolve时文件描述被修改，reject时文件描述不被修改<br>
              仅在show-file-list和can-describe为true时有效
            </td>
          </tr>
          <tr>
            <td>before-preview</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              当用户点击图片预览图片前调用<br>
              接受一个表示当前要预览的文件的file参数，和第二个表示文件位置的index参数<br>
              如果函数未返回或者返回true，则文件被预览<br>
              如果函数返回false，则文件不被预览<br>
              如果希望异步地做一些事情，可以返回一个promise对象，当其resolve时文件被预览，reject时文件不被预览<br>
              仅在show-file-list和can-preview为true时有效
            </td>
          </tr>
          <tr>
            <td>before-download</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              当用户点击下载图标下载文件前调用<br>
              接受一个表示当前要下载的文件的file参数，和第二个表示文件位置的index参数<br>
              如果函数未返回或者返回true，则文件被下载<br>
              如果函数返回false，则文件不被下载<br>
              如果希望异步地做一些事情，可以返回一个promise对象，当其resolve时文件被下载，reject时文件不被下载<br>
              仅在show-file-list和can-download为true时有效
            </td>
          </tr>
          <tr>
            <td>before-upload</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              当一个文件被上传前调用<br>
              接受一个表示当前选中的所有文件的fileList参数，和第二个表示文件位置的index参数<br>
              如果函数未返回或者返回true，则文件被上传<br>
              如果函数返回false，则文件不被上传<br>
              如果希望异步地做一些事情，可以返回一个promise对象，当其resolve时文件被上传，reject时文件不被上传<br>
              仅在auto-upload为true时有效
            </td>
          </tr>
          <tr>
            <td>on-Error</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              当文件上传出错时调用<br>
              接受一个表示错误对象的error参数<br>
              仅在auto-upload为true时有效
            </td>
          </tr>
          <tr>
            <td>on-progress</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              文件上传进度更新时调用<br>
              接受一个表示进度事件对象的event参数<br>
              仅在auto-upload为true时有效
            </td>
          </tr>
          <tr>
            <td>on-success</td>
            <td>
              <!-- <au-icon type="check" class="au-theme-color--success"></au-icon> -->
              <au-icon type="times"></au-icon>
            </td>
            <td>Function</td>
            <td><au-icon type="minus"></au-icon></td>
            <td><au-icon type="minus"></au-icon></td>
            <td>
              文件上传成功时调用<br>
              接受一个表示上传成功时服务器返回的responseText的body参数<br>
              仅在auto-upload为true时有效
            </td>
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
          <!-- <tr>
            <td>@input</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">files</li>
              </ol>
            </td>
            <td>
              用户选择文件后触发<br>
              参数files表示当前用户选中的所有文件
            </td>
          </tr> -->
          <tr>
            <td>@change</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">files</li>
              </ol>
            </td>
            <td>
              value值变化时触发<br>
              参数files表示当前用户选中的所有文件
            </td>
          </tr>
          <tr>
            <td>@native-change</td>
            <td>
              <ol class="option-list">
                <li class="au-theme-border-color--base-8">files</li>
              </ol>
            </td>
            <td>
              用户选择文件后触发<br>
              参数files表示当前用户选中的所有文件
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5"><span class="code au-theme-radius au-theme-background-color--warning-bottom">@input</span>事件仅是为了支持v-model语法糖，从语法上建议使用<span class="code au-theme-radius au-theme-background-color--warning-bottom">@change</span>事件</cite> -->
      <!-- <au-icon type="minus"></au-icon> -->
    </au-panel>
    <au-panel class="section" title="Methods">
      <!-- <au-icon type="minus"></au-icon> -->
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
            <td>chooseFiles()</td>
            <td>
              <au-icon type="minus"></au-icon>
            </td>
            <td>
              你可能希望自定义上传按钮，可以将<span class="code au-theme-radius au-theme-background-color--warning-bottom">show-upload-button</span>设置为<span class="code au-theme-radius au-theme-background-color--warning-bottom">false</span>，然后使用这个方法来触发选文件选择动作。
            </td>
          </tr>
        </tbody>
      </au-table>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <au-upload v-model="files" action="http://localhost:3480/upload"></au-upload>
      '></code-h>
      <code-h lang="js">
        export default {
          data () {
            return {
              files: []
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
export default {
  name: 'upload-examples',
  data () {
    return {
      files: [
        { url: 'http://127.0.0.1:1234/files/liuyifei.png' },
        { url: 'http://127.0.0.1:1234/files/yes.1.wav' }
      ]
    }
  },
  methods: {
    change (files) {
      // console.log(files)
    }
  }
}
</script>
