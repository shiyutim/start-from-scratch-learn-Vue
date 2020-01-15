# 生命周期

[[toc]]

理解生命周期函数对于我们来说至关重要，但是也不需要你马上理解其所有内容，官方文档里有一张图片，展示了生命周期的过程。

> 你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。

<img src="https://cn.vuejs.org/images/lifecycle.png">

## 介绍

生命周期，就是 Vue 实例从创建到销毁经过的一系列过程。其实就是函数调用的时机，我们可以选择对应的生命周期里面进行调用。而不同的阶段可以访问的数据有很大区别，接下来根据官方文档的描述进行分析。

::: tip 提示

下面分析会使用`debugger;`语句进行断点分析，如果不了解`debugger`的可以查看一下[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/debugger)。

:::

## beforeCreate

> 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

在使用 `new Vue()`创建 Vue 实例后，进入初始化阶段。此时，不能访问到 data 里面的数据，也不能访问到 watch 和 methods 里面的函数。

在进行测试之前，先初始化如下模板:

```html
<template>
  <div class="container">
    <p>{{message}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'hello Vue'
      }
    },
    methods: {
      test() {
        console.log('test function')
      }
    },
    beforeCreate() {
      try {
        console.log('进入 beforeCreated')
        console.log(this.message, 'message')
        let body = document.querySelector('body')
        console.log(body, 'body')
        this.test()
        debugger
      } catch (e) {
        console.error(e)
        debugger
      }
    }
  }
</script>

<style scoped lang=""></style>
```

调用如上代码后，打开控制台可以看到如下图片展示信息

<br />
<img :src="$withBase('/life-1.png')">

以上信息说明：

- 控制台打印 `进入 beforeCreated`，表示首先开始进入`beforeCreated`生命周期函数。
- 接着打印`data`里面的`message`，发现值为`undefined`，说明在此生命周期函数内，并不能访问到`data`里面的值。
- 接着打印 body，能打印出来，但是发现`#app`的 div 里面并没有任何内容，说明**虚拟 dom**还没有渲染出来。
- 接着调用`test`函数，发现控制台报错了，提示 test 不是一个函数，说明在此不能访问`methods`里面的任何函数。

经过分析，此生命周期为初始化阶段，数据、函数、watch 等事件不能访问到。**此生命周期很少使用**。

## created

> 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，\$el 属性目前尚不可用。

在**实例创建完成后**被立即调用，而且实例已经完成了 数据观测，属性和方法的运算，watch 和事件的回调，说明我们已经能够访问`data`里面的数据和`methods`里面的方法了，那么事实到底是这样吗？我们接着加入以下生命周期函数：

```js
beforeCreate() {
    try {
      console.log('进入 beforeCreated')
      console.log(this.message, 'message')
      let body = document.querySelector('body')
      console.log(body, 'body')
      this.test()
      debugger
    } catch (e) {
      console.error(e)
      debugger
    }
  },
  // 新添加 ！！！
  created() {
    try {
      console.log('进入 created')
      console.log(this.message, 'message')
      let body = document.querySelector('body')
      console.log(body, 'body')
      this.test()
      debugger
    } catch (e) {
      console.error(e)
      debugger
    }
  },

```

::: tip 提示

你可能已经看到，生命周期**函数**是一个函数，以`xxx(){}`的方式声明，以`,`进行分隔，跟`methods: {}`等方法不一样，这里需要注意。

:::

<br />
<img :src="$withBase('/life-2.png')">

以上信息说明：

- 首先，打印`created`表示进入`created`生命周期
- 接着打印`hello Vue`这里需要注意，在此我们**能够访问到`data`里面的值**！！！
- 接着打印 body，跟上面一样，说明此时 dom 还为挂载完成，这里**并不能对 dom 进行任何操作**！！！
- 最后调用`test`函数，控制台打印出了`test function`，说明在此我们也**能够访问`methods`里面的函数了**！！！

此时我们已经能够访问`data`里面的函数，`methods`里面的方法。还可以使用`watch/props/computed`等方法。**此函数经常使用，需要重点关注**。

## beforeMount

> 在挂载开始之前被调用：相关的 render 函数首次被调用。

在挂载开始之前被调用，也就表示还不能访问 dom，因为还没有开始挂载。

<br />
<img :src="$withBase('/life-3.png')">

从图中可以看出，此时打印出的内容跟`created`里面打印出的内容差不多，因此也可以访问`data/methods/watch`等数据和方法。

## mounted

> 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。 如果根实例挂载到了一个文档内的元素上，当mounted被调用时vm.$el 也在文档内。

实例被挂载后调用，新创建的 Vue 实例的 el 替换对应的 dom 元素。这里说明虚拟 dom 已经挂载完成了，也就表示我们能够访问 dom 了。

<br />
<img :src="$withBase('/life-4.png')">

此时能够看到，我们能展开`#app`里面的元素了，并看到`p`标签里面的内容了。说明在`mounted`里面，dom 已经加载完成，我们可以在此对 dom 进行操作。**此函数经常使用，需要重点关注**。
