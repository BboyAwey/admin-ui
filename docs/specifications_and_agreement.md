### 编码规范

#### HTML

* 缩进：2空格
* 大小写：全部小写

#### CSS

* 语法：scss
* 缩进：2空格
* 嵌套：不要超过3层
* 类名：.some-class-name
* 空格：选择器后空一格，冒号后空一格
* 分号：不省略最后一个属性分号

#### JavaScript

* 语法：ES6+
* lint：ESLint默认规则，详* https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style


#### Vue文件

* 顺序：style -> template -> script
* name：中划线命名，`some-comp`
* style scoped：no
* 拆分：无特殊情况不将样式、模板与逻辑拆分到不同文件

### 命名规范

* 文件名：中划线命名，`some-file.vue`
* 样式类名：中划线命名，`some-class-name`
* 变量名：样式变量与JavaScript变量为驼峰命名，`someVariable`
* scss文件名：以下划线开头并以下划线分词命名，`_some_sccc_file.scss` 引入时首个下划线和后缀都可以省略
* 分支名：组件分支以`feature_组件名`的形式命名

### 错误抛出规范

抛出错误需要使用`new Error()`语法，并在自定义错误消息中，使用`Admin UI@ `作为前缀，就像下面这样：
```js
throw new Error('Admin UI@component name@ your error message')
```

### API命名语义约定

组件props命名，按照以下约定进行
| 名称 | 语义 | 适用场景 |
|-------|-------|-------|
| items | 组件中的项 | 菜单、树等组件 |
| size |  |  |
| color |  |  |
| text |  |  |
| url |  |  |
| iconClass |  |  |
| iconClass |  |  |
| collapse |  |  |
| active |  |  |
| children |  |  |
| min |  |  |
| max |  |  |
| from |  |  |
| to |  |  |
| display |  |  |

组件事件命名，按照以下约定进行
| 名称 | 语义 | 适用场景 |
|-------|-------|-------|
| select |  |  |
| collapse |  |  |


组件方法命名，按照以下约定进行
| 名称 | 语义 | 适用场景 |
|-------|-------|-------|
| show() |  |  |
| hide() |  |  |

#### 样式类

#### 组件API
