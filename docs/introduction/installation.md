# 安装

[[toc]]

## 起步

有两种方式使用 Vue，一种方式是通过**CND**的方式引入 Vue.js；另一种方式是使用`vue-cli`构建一个完整的 Vue 项目。

1. 通过 CDN 方式引入：

```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

或者：

```html
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

注意这里有两个名词，**开发环境**和**生产环境**，那分别是什么意思呢:skull:？

- 开发环境： 我们在开发写代码的时候使用的环境，包含错误提示和警告。
- 生产环境： 项目写完了，正式发布到服务器上，一些错误提示会关闭。

现在我们需要的就是**开发环境**的 CDN 了，直接在项目里面引入`<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>`即可。

2. 构建完整的 Vue 项目

此方式通过`vue-cli`脚手架生成，但是官方文档指出：

> 请注意我们不推荐新手直接使用 vue-cli，尤其是在你还不熟悉基于 Node.js 的构建工具时。

不过，我还是建议通过`vue-cli`来生成一个完整的项目，因为这样能够学习`cli`的使用、`npm`的使用和学会构建一个完整的 Vue 项目。至于为什么尤大建议初学者使用 CDN 的方式，我在尤大的某篇回答里面看到，大概意思是：

> Vue 一直很重视 引入一个 script 就可以开始写 的用例，这样保证了新人上手的低门槛。

所以，选择哪种方式就看你自己了，选择哪种方式都不会影响 Vue 的学习

::: warning 警告

如果你准备通过`vue-cli`的方式构建`vue`，则需要先学会`vue-cli`和`npm`的使用，所以，我需要先简单介绍一下这两个工具的使用。如果你准备通过 CDN 的方式来学习 Vue，则可以略过接下来的内容，[点击进入下一节的学习](introduce.html)。

:::

## npm

`npm`是随同`Node.js`一起安装的包管理工具，想要使用`npm`，则需要先安装`Node.js`。安装`Node.js`是必不可少的步骤，各位可以先百度一下安装`Node.js`，这里不再赘述。

安装好了之后，打开`cmd`，输入`npm --version`，如果弹出版本号，说明安装成功。
::: tip 提示
由于 npm 的服务器在国外，所以在国内下载比较慢，可以配置下国内镜像，具体操作自行百度哦
:::

cmd 打开方式，window 系统下

- `win+r`，输入 cmd，即可打开 cmd。
- 按住`shift` -> 点击鼠标右键 -> 选择`在此处打开命令行窗口`即可打开 cmd

这里有必要集中说明一下 npm 的常用命令。

- `npm run dev`|`npm run serve` 启动 vue-cli 生成的项目。其中，`npm run dev`为 vue-cli 2.x 版本的命令；`npm run serve`为 vue-cli >=3 以上的版本的命令。
- `npm run build` 为打包命令，一般在项目开发完成后，进行打包上传，之后就可以进行访问了。
- `npm i <name>` 为`npm install <name>`的简写，意为包的下载命令。其中：
  - `npm install -S <name>` 为`npm install --save <name>`的简写，意为 把包安装在`dependencies`目录下，`dependencies`在 package.json 文件里面可以看到。**这里面存放的包为开发写代码和项目上线后使用的包**。
  - `npm install -D <name>` 为`npm install --save-dev <name>`的简写，意为 把包安装在`devDependencies`目录下，`devDependencies`同样在 package.json 文件里面找到。**这里面存放的包为我们开发写代码时候使用的包，项目上线后不再使用**。

**一般情况下**，我们需要使用`npm install -S <name>`的命令来安装一些包，比如： `npm install -S axios` 、 `npm install -S vue-router` 和 `npm install -S vue-vuex`

`package.json`文件里面包含项目的配置信息，其中里面可以看到这个项目安装的包，一般在下载别人的项目后，需要`npm install`安装包，**注意这里不需要写包的名字，直接就可以下载**。

## vue-cli

[vue-cli](https://cli.vuejs.org/zh/)，是 vue 官方提供的脚手架，用来**生成完整的 vue 项目**。

同时，vue-cli 2.x 和 以上版本命令有些区别，生成后的内容也有很大区别。这里我**建议大家使用 vue-cli 2.x 来生成项目**，因为 vue-cli 4.x 默认配置生成的项目 eslint 检查比较严格，对于新手不太友好，而 vue-cli 2.x 生成的项目，则相对来说没有那么严格。

- 使用 vue-cli 4.x

首先需要**全局安装** vue-cli ，在 cmd 下输入命令`npm install -g @vue/cli`

vue-cli 4.x 使用`vue create <name>`的方式来生成， `name`为项目名称

```js
vue create test
// 生成一个名为 `test`的项目


default (babel, eslint)
Manually select features

// 接下来有两个选项，第一个为 `默认配置`，安装babel（编译器） 和 eslint（代码检查）
// 第二个选项为自己选配。
```

经过“漫长”的等待，屏幕上出现

```js
$ cd test
$ npm run serve
```

即代表着项目初始化完成，按照指示输入上述**输入命令**即可运行服务

默认在浏览器输入`http://localhost:8080/`即可访问项目（这里根据 8080 端口是否被占用而生成不同的端口，按照提示访问即可）。

- 使用 vue-cli 2.x

如果想要使用`vue-cli 2.x`生成的项目，根据[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#%E6%8B%89%E5%8F%96-2-x-%E6%A8%A1%E6%9D%BF-%E6%97%A7%E7%89%88%E6%9C%AC)指出:

> Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：

```js
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

vue-cli 2.x 使用 `vue init webpack <name>`的方式来生成，`name`为项目名称。 运行后，一路按`enter`即可。

到这里为止，你已经学会了使用`vue-cli`生成一个完整的 Vue 项目，下面即将开始 Vue 的学习。
