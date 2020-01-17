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

经过分析，此生命周期为初始化阶段，数据、函数、watch 等事件不能访问到。**轻度使用**。

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

此时我们已经能够访问`data`里面的函数，`methods`里面的方法。还可以使用`watch/props/computed`等方法。**重度使用，需要重点关注**。

## beforeMount

> 在挂载开始之前被调用：相关的 render 函数首次被调用。

在挂载开始之前被调用，也就表示还不能访问 dom，因为还没有开始挂载。

<br />
<img :src="$withBase('/life-3.png')">

从图中可以看出，此时打印出的内容跟`created`里面打印出的内容差不多，因此也可以访问`data/methods/watch`等数据和方法。**轻度使用**。

## mounted

> 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。 如果根实例挂载到了一个文档内的元素上，当mounted被调用时vm.$el 也在文档内。

实例被挂载后调用，新创建的 Vue 实例的 el 替换对应的 dom 元素。这里说明虚拟 dom 已经挂载完成了，也就表示我们能够访问 dom 了。

<br />
<img :src="$withBase('/life-4.png')">

此时能够看到，我们能展开`#app`里面的元素了，并看到`p`标签里面的内容了。说明在`mounted`里面，dom 已经加载完成，我们可以在此对 dom 进行操作。**重度使用，需要重点关注**。

## beforeUpdate

> 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

- 数据更新时调用

说明**数据已经更新了**。

- 发生在虚拟 dom 打补丁之前

虚拟 dom 打补丁之前，也就是说，在 dom 修改之前，说明页面还没有更新。这里解释一下为什么叫*打补丁*，因为 vue 采用虚拟 dom，并且采用优化算法，对比新旧`Vnode`（虚拟 dom），只修改 **改变的部分**。所以，如果我们只更改了部分值，那么只会更新页面的一部分。这也是 使用 Vue 构建的页面 显得特别快的原因。

还是通过断点调试，为了更好的观察 dom 发生的变化，设置了一个`test`方法，用来改变`message`的值。在`<script>`中加入如下代码：

::: tip 提示

记住，这些生命周期**函数**是属于同级别“地位”，所以他们应该并列的放在一起，并使用`,`分隔。那么此时，在`<script>`标签下，大概有如下“结构”：

```js
export default {
  data() {}
  methods: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {}
}
```

:::

```html
<div class="container">
  <p>{{message}}</p>
  <button @click="test">reverse</button>
</div>
```

```js
beforeUpdate() {
    console.log('beforeUpdate')
    console.log(this.message, 'message')
    let body = document.querySelector('body')
    console.log(body, 'body')
    console.log(this)  // `this`代表 Vue 实例
    debugger
  }

  methods: {
    test() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    }
  }
```

初始化好后，我们点击`reverse`按钮，触发`test`函数，改变`data`里面`message`的值，控制台信息如下图所示：

<img :src="$withBase('/life-5.png')" />
<br />
<img :src="$withBase('/life-6.png')" />

以上信息说明：

- 首先，打印`beforeUpdate`表示进入`beforeUpdate`生命周期
- 接着打印`message`的值为：`euV olleh`，发现值已经是**更新后的值**。说明在此 值已经被更新。
- 接着展开 body，发现`<p>`里面的值为`Hello Vue`。说明虽然`data`里面的值已经更新，但是真实的 dom 中，值并没有被更新
- 最后一条是打印的`this`，`this`指向 Vue 实例，可以看到红色箭头指向`message`的值，是更新后的值。因为`data`和`methods`里面的所有方法都会被挂载在 Vue 实例上，所以我们可以通过`this.xxx`获取到对应的值或方法。

最后一张图片是断点时 dom 中的显示情况，可以看到在`beforeUpdate`的时候，真实 dom 里面的值没有更新。**轻度使用**。

## updated

> 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。

官方文档说的很清楚了，总结如下：数据更改导致虚拟 dom 重新渲染，组件 dom 已经更新，可以执行对应的 dom 操作。在大多数情况下，应该避免在此期间更改状态。应该使用计算属性(computed)和 watcher`watch`。

继续测试，在`<script>`添加如下代码：

```js
updated() {
    console.log('updated')
    console.log(this.message, 'message')
    let body = document.querySelector('body')
    console.log(body, 'body')
    console.log(this)
  }
```

点击`reverse`按钮后，控制台打印如下图所示：

<img :src="$withBase('/life-7.png')" />

此时可以看到，dom 已经更新。**轻度使用**。

## beforeDestroy

> 实例销毁之前调用。在这一步，实例仍然完全可用。

组件销毁前或离开页面后，调用这个函数。**轻度使用**。

## destroyed

> 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

组件销毁后或页面离开之后，调用这个函数。Vue 中的所有绑定的事件监听都会被销毁，如：watch、computed 等。

除了 Vue 中会自动销毁一些事件监听外，还需要我们自己手动移除监听器，比如:

- 使用`document.addEventListener`添加的监听器
- 使用 setInterval 设置的定时器

我们初始化一个组件（关于组件会在后面细说），并在这个组件内设置一个定时器，并使用一个按钮来销毁这个组件：

```html
<template>
  <div class="container">
    <component-a v-if="toggleComponent"></component-a>
    <button @click="toggleComponent = !toggleComponent">toggle</button>
  </div>
</template>

<script>
  import Vue from 'vue'

  Vue.component('component-a', {
    template: `
      <div>Component-a</div>
    `,
    methods: {
      interval() {
        setInterval(() => {
          console.log('1')
        }, 1000)
      }
    },
    mounted() {
      this.interval()
    },
    beforeDestroy() {
      console.log('component beforeDestroy')
    },
    destroyed() {
      console.log('component destroyed')
    }
  })

  export default {
    data() {
      return {
        toggleComponent: true
      }
    }
  }
</script>
```

`@click="toggleComponent = !toggleComponent"` 表示把`toggleComponent`这个变量取反并赋值给他自己。为`true`取反后就为`false`。最后的效果就是点击后可以来回切换显示或隐藏。

在进入页面后，在`mounted`里面调用定时器函数，发现控制台开始打印`1`。同时页面如下，`component-a`组件存在。
<br />
<img :src="$withBase('/life-8.png')" />
<br />
<br />
<img :src="$withBase('/life-9.png')" />

当我们点击`toggle`按钮后，控制台打印如下：

<br />
<img :src="$withBase('/life-10.png')" />
<br />
<br />
<img :src="$withBase('/life-11.png')" />

发现虽然已经调用`destroyed`了，但是控制台还是能够打印`1`，说明定时器并没有被销毁。所以，使用`setInterval`需要我们自己手动清除。

清除定时器，大家都知道，如果是`setTimeout`，我们使用`clearTimeout`；如果是`setInterval`，我们使用`clearInterval`。所以，我们应该使用`clearInterval()`并且加在`beforeDestroyed`或者`destroyed`里面。但是还有一个问题，就是清除哪个定时器，所以我们还需要把这个定时器赋值给一个变量：

```js
interval() {
  let timer = setInterval(() => {
    console.log('1')
  }, 1000)
}

destroyed() {
  clearInterval(timer)
  console.log('component destroyed')
}
```

这样可以吗？你可以试一下，保证报错。因为函数作用域的问题，我们在**外部是无法访问到函数内部的变量的**。所以，在`destroyed`里面是访问不到 timer 的。聪明的你一定想到了，我们可以在`data`里面初始化一个变量`timer`，然后在定时器里面进行赋值，最后在`destroyed`里面进行销毁。让我们试一下：

```js
data () {
  return {
    message: 'hello Vue',
    timer: null
  }
}

interval() {
  this.timer = setInterval(() => {
    console.log('1')
  }, 1000)
}


destroyed() {
  clearInterval(this.timer)
  console.log('component destroyed')
}
```

访问`data`里面的变量，我们需要使用`this.xxx`的方式，所以我们通过`this.timer`进行赋值和销毁。现在从新加载页面，并点击`toggle`，控制台不会再打印`1`了，说明我们销毁定时器成功了。

官方文档里面还有关于`destroyed`的使用例子，[点击这里](https://cn.vuejs.org/v2/cookbook/avoiding-memory-leaks.html)访问。
**轻度使用**。
