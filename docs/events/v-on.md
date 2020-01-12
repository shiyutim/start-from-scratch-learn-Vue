# v-on

[[toc]]

## 介绍

[`v-on`](https://cn.vuejs.org/v2/guide/events.html)指令用于**监听 dom 事件**，可以触发一段代码，也可以触发一个函数。

还记得我们前面小例子中的 申请按钮 吗，我们给申请按钮设置了一个监听点击事件，是这样写的：`@click="userInfo.isMember = 1"`，这里同样使用了简写的形式，实际上为：`v-on:click="userInfo.isMember = 1"`。
意思为：使用`v-on:`监听`click`点击事件，如果发生点击事件，则调用右边的表达式，也就是把`userInfo.isMember`改为 1。

那么，除了可以监听`click`事件，还可以监听哪些呢？比如说： `v-on:keyup`监听键盘按下事件/`v-on:mouseover`监听鼠标经过事件 等等 dom 事件。还可以监听子组件传过来的事件，等到讲解组件一节时在详细说明。除了这些外外，还可以自定义事件，这里不再赘述。

上面也提到了我们可以使用简写的方式，那么`v-on:`指令可以简写为`@`，那么其他事件就可以写为：`@click/@mouseover/@keyup`。

## 调用方法

`v-on`除了可以调用表达式外（@click="userInfo.isMember = 1"），还可以调用函数，比如: `@click="submit"`，那么这个`submit`就是一个函数。下面我们还详细说一下**函数**。

在 vue 中，一个函数是定义在`methods{}`中的，在前面几节中，我们初始化的模板里面并没有`methods:{}`一项，现在，我们可以添加这一项了，这里面就是存放我们定义函数的地方。

::: warning 注意
在 methods 后面写的是 `:{}`，而不是`()`，这里需要注意！一定不要弄混了。
:::

```html
<template>
  <div class="container">
    <div v-if="userInfo.isMember" class="member">
      <p v-for="(value, name, index) in userInfo" :key="index">
        {{name}}: {{value}}
      </p>
    </div>
    <div v-else class="noMember">
      <h1>你现在不是会员哦！</h1>
      <button @click="userInfo.isMember = 1">点击申请</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: {
          name: 'tim',
          age: 10,
          sex: 1, // 1男 2女
          isMember: 0 // 0为非会员 1 为会员
        }
      }
    }, // 每个层级间， 以 `,` 分隔
    // change
    methods: {} // {1}  这里定义函数
    // end
  }
</script>

<style scoped lang=""></style>
```

还是套用前面的例子（嘻嘻:grinning:），在此基础上，我们在`{1}`处添加了一个`methods:{}`，注意，这里的层级关系是 `data`和`methods`是同级的，是同级的，是同级的。每个层级之间以`,`分隔。

好了，现在我们需要改造一下，不适用`click`调用表达式，改成调用函数，所以，我们首先改变一下`申请按钮`。我们应该调用一个函数，那么就叫`submit`函数吧。

```html
<button @click="submit">点击申请</button>
```

接下来我们定义一个函数:

```js
// es6 写法
methods: {
    submit () {}
}

// es5 写法
methods: {
    submit: function() {}
}
```

定义好了函数后，我们测试一下是否设置好了，我们使用`console.log`进行测试，在函数内部添加如下代码：

```js
submit() {
    console.log('click`)
}
```

在你点击`申请按钮`后，控制台出现了`click`，恭喜你，函数调用成功了。接下来就是改变会员状态了，那么我们把以前写的`userInfo.isMember = 1`放到函数里面就可以了。

```js
submit() {
    console.log('click')
    this.userInfo.isMember = 1   // {1}
}
```

注意，我们在 html 内联中定义`click`事件的时候，`userInfo`前面没有`this`，而在函数中，也就是`{1}`处，我们使用的是`this`，前面已经讲过，我们访问`data`里面的数据的时候，需要通过`this`来访问，这里一定要注意。

这时候再点击`申请按钮`，可以看到，页面中已经自动改变了界面状态。

## 按键修饰符

按键修饰符可以添加在**事件**的后面，以`.`进行分隔。`@<事件名>.<修饰符>`。比如说，我们在提交表单的时候，用户在输入完成后，除了可以手动点击提交按钮外，还可以点击键盘的`enter`键来提交申请，那么这时候我们就可以使用`@keyup.enter`来调用函数。`keyup`为事件名，`enter`为修饰符，更多修饰符请参考[官方文档](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)。
