# 介绍

[[toc]]

## 模板语法

在官网文档开始介绍的开头，有这么一句话

> Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统：

单单这一句话就有好几个名词，简化一下可以这么理解：

vue.js 允许采用**模板语法**来将数据渲染进 DOM 里。

```html
<div id="app">
  {{message}}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

上例来自于官网，可以看出，官网都是基于引入 CND 的方式来举的例子，即引入 vue 的`<script>`标签。不过我准备通过 vue-cli 脚手架生成的项目来进行讲解，所以 本文后面的例子都是基于`vue-cli`生成的项目进行举例。

上例中,[`el`代表](https://cn.vuejs.org/v2/api/#el)（element）把页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。而`{{}}`就是 vue 提供的模板语法，用来渲染数据使用的。`{{}}`里面放入`data`中的变量，即可渲染对应的值。如果你不想用`{{}}`的形式，可以通过`delimiters`进行改变。

```js
new Vue({
  delimiters: ['${', '}']
})
```

经过以上设置后，渲染变量不在通过`{{}}`，而是`${}`。

这里先打开我们初始化好的名为`test`的 vue 项目，打开命令行工具，输入`npm run serve`（vue 3.x 以上） | `npm run dev`（vue 2.x）即可启动项目 按提示在浏览器输入路径即可访问项目。

这里为了简化操作，直接修改`src/components/HelloWorld.vue`文件，初始化为:

```html
<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style></style>
```

那么上例可以重写为：

```html
<template>
  <div>{{message}}</div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }
</script>

<style></style>
```

注意这里有点区别，在 vue 项目里，每个页面都是由一个或多个`.vue`文件组成的，而每个`.vue`文件里面，分别由`<template> <script> <style>`标签组成。

## 文件结构

### template

`<template>`标签里面存放的就是我们的`html`代码，以后所有关于`html`的代码都需要放在`template`里面。同时，为了保证 vue 能够正常的渲染 dom 树结构，每个组件必须只有一个根元素，也就意味着一个`<template>`标签下，只能有一个`<div>`标签。

为了测试一下，我把页面改为：

::: danger 警告

```html
<template>
  <div>{{message}}</div>
  <div>{{message}}</div>
</template>
```

:::

果不其然，页面报错了。所以，各位朋友以后写的时候一定要注意，`<template>`标签下只能有一个“根”`<div>`哦。

### script

`<script>`标签里面存放的当然是我们的`javascript`代码啦，只不过是通过`es6`的`export`的方式导出的。如果没有学习过 es6 的朋友看不懂没关系，这里是固定模式，每个页面都需要这样初始化。但是，**对于一个合格的前端来说， es6 语法是必须要会的，所以各位要抓紧学习啦**。

细心的朋友可能注意到，`<script>`标签里面的`data`在两个例子中有些区别，一个是`data {}` 一个是`data() {}`。如果学过 es6 语法的朋友肯定知道`data() {}`代表一个函数，一个对象的函数。如果用 es5 的语法是这样的`data: function() {}`。那么为什么需要声明一个函数呢？[官网有解释](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0)。因为我们在写代码的时候，需要新建多个`.vue`文件，如果没有以函数的方式生命，就会影响到其他文件的变量，所以我们应该以函数的方式声明:

```js
// es6
export default {
  data() {
    return {
      message: 'hello'
    }
  }
}

// es5
export default {
  data: function() {
    return {
      message: 'hello'
    }
  }
}
```

以上两种方式都可以，如果不使用函数声明，浏览器会报错。

### style

`<style>`标签用来生命 css 样式，这个不需要多介绍。不过`<style>`标签和上面的`data`有共同的特性，即所有的**选择器**是共通的。Vue 通过提供[scoped](https://cn.vuejs.org/v2/guide/comparison.html#%E7%BB%84%E4%BB%B6%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%86%85%E7%9A%84-CSS)属性，可以让 css 只存在于当前组件内。用法为:

```html
<style scoped>
  #app {
    // ... some css
  }
</style>
```

> Vue 的单文件组件里的样式设置是非常灵活的。通过 vue-loader，你可以使用任意预处理器、后处理器，甚至深度集成 CSS Modules——全部都在 `<style>` 标签内

所以，如果你想要使用`sass/less/stylus`的话，只需要指定一个`lang`属性，即：

```html
<style scoped lang="less">
  #app {
    // ... some css
  }
</style>
```

使用上述预处理器的时候，需要先安装对应的包和 loader 哦，如: `npm install less less-loader -S`。
