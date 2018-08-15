### 组件文件位置与结构

所有通用组件位于【admin-ui】-【components】中。无论组件是否有多个文件，文件结构都应该保持统一——组件输出统一在组件文件夹的index.js中输出，并且组建文件夹中含有【src文件夹】（即使你的组件仅需要一个`.vue`文件，也应该在文件结构上保持统一），就像下面这样：

![组件文件结构](http://upload-images.jianshu.io/upload_images/3094907-002a5b48ef2162d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 注释规范

* scss注释：全部使用单行注释
* JavaScript注释：全部使用单行注释

### 作者和修订者信息

按照下面的格式在文件中添加作者和修订者信息，JavaScript文件和SCSS文件写在文件开头，Vue文件写在文件的script标签内的开头：

```js
// Author: Awey
// email: chenwei@rongcapital.cn
// github: https://github.com/BboyAwey
// blog: http://www.jianshu.com/u/3c8fe1455914
 
// Modifier:
// Lilijing
// email: lilijing@rongcapital.cn
// github: https://github.com/lilijing
// blog: http://www.jianshu.com/u/*****
 
// Modifier:
// Tianliqiang
// email: tianliqiang@rongcapital.cn
// github: https://github.com/*****
// blog: http://www.jianshu.com/u/*****
```

### 组件开发流程

1. 从master分支切换到一个新的组件分支（分支命名按照前文所述，如果没有权限请联系 chenwei1@rongcapital.cn 将你添加到gitlab开发者中）
2. 在【admin-ui】-【components】中按照前文规范新建你的组件的文件夹和文件
3. 在【examples】中新建该组件的example页，并在【router.map.js】文件中配置好该页面的路由，最后在【App.vue】中添加该页面的导航
4. 编写你的组件，并在example页中测试你的组件，然后正常提交到你的分支上
5. 完成组件本身的编写后，请按照下面的格式完善example页面:
  * 组件名称
  * 组件示例（若干）
  * 接口说明
6. 让其他伙伴为你review代码，无误后，可将你的组件分支合并到master分支

### 版本号规则

正式版起始版本号为 1.0.0，更新规则如下：

1. 第一位，断层式升级：当新版本的功能升级为断层式的，且大量的API与旧版本不再兼容，则应该升级该位版本号；
2. 第二位， 新增功能：当有新增组件或功能，但并未改变前一版本任何API时，则应该升级该位版本号；
3. 第三位，BUG修复：修复BUG后，应当更新该位版本号
