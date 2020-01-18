# 父向子传值 props

[[toc]]

## 介绍

当我们实际使用此组件的时候，发现这个简单的`Button`组件并不能满足我们的需求。我们想要的是漂亮的按钮。并且会改变颜色的按钮。漂亮的按钮我们可以通过 css 来美化，那么会改变颜色的按钮是什么意思呢？

从我们前面学习组件的知识来看，我们把组件写成什么样，我们引入过来后，页面就会显示什么样。但是我们总不能挨个把每个颜色的按钮都封装起来吧，那样就太 low 了。

所以，我们要基于目前的`Button`组件，来实现根据传入不同的值，显示不同颜色的按钮。

Vue 为此提供了`props`属性，我们可以向组件传入值，并且在组件内可以接收值。大家可以想到，`Button.vue`是一个按钮组件吧？`index.vue`是一个“页面”吧？那么我们在`index.vue`中引入`Button.vue`，说明`index.vue`是“父亲”，`Button.vue`是“儿子”，这就叫**父向子传值**。

## props

在讲解之前，我们需要明确一个概念。我们在`index.vue`中，想要向`Button.vue`组件传入值，这个值可以是任何类型的值，然后在`Button.vue`中接收值。

明确了概念后，我们开始讲`props`了。

`props`就是在一个文件内，用来接收值的。跟`methods、computed`等一样，他们都是相同的地位。不过，`props`可以有不同的写法：

```js
// first
props: {
  xxx
},
// second

props: [xxx, xxx, xxx],
```

前面说了，除了美化样式外，我们想要的是不同颜色的按钮。所以，我们可以定义一个`color`选项，用来**接收**值的

```js
props: {
    color: {
        type: String,
        required: true
    }
}
```

我们使用对象的写法，因为可以进行灵活的配置，其中，`type`为接收的类型，`require`可以设置为必填项。更多的配置信息请参考[官方文档](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)

定义好了接收的`color`后，我们需要设定值的范围，比如说：`['primary', 'success', 'error', 'warning']`，不过这个范围是**我们自己定义的**。

```html
<template>
  <div class="container">
    <button :class="color">Click Me</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      color: {
        type: String,
        required: true
      }
    },
    components: {},
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    updated() {},
    destroyed() {}
  }
</script>

<style scoped>
  button {
    border: none;
  }
  .success {
    color: #fff;
    background: forestgreen;
  }
  .error {
    color: #fff;
    background: #ff0000;
  }
  .primary {
    color: #fff;
    background: blue;
  }
  .warning {
    color: #fff;
    background: yellow;
  }
</style>
```

可以看出来，我们定义颜色的范围是为了我们设置好对应的 class。 接着，使用`v-bind`把`color`跟`class`绑定在一起

以上操作我们基本完成了组件接收值的操作，剩下的就是在父组件中传递值了。这一步非常简单，我们来看

```js
<Button color="success"></Button>
```

想要传值，我们只需要在使用组件里面添加对应的值即可。我们需要接收`color`，那么我们就需要在组件里面写上`color="xxx"`，xxx 为你要传入的值，为`['primary', 'success', 'error', 'warning']`
。

除了直接写上`color="xxx"`外，我们还可以对`color`进行动态的绑定值，比如说：

```js
<Button :color="dynamicColor"></Button>

data () {
    return {
        dynamicColor: 'success'
    }
}
```

这样，我们就通过变量灵活的控制按钮的颜色了。

## slot

在使用了上面的组件后，我们会发现，虽然可以根据传递`color`来改变颜色，但是每个按钮的内容全是一样的：`Click Me`。我们想要的是不同的内容，可能我们需要的是：`确定`或者是`取消`。所以，我们还可以在传入一个`name`选项，用来设置按钮的内容。

```js

// index.vue
<Button :color="dynamicColor" name="确定"></Button>


// Button.vue

<button :class="color" v-text="name"></button>

props: {
    color: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}

```

虽然上面同样实现了动态传入按钮的内容，但是略显得麻烦。Vue 提供了一个`<slot>`插槽，用来接收传过来的内容，可以是 html，非常的方便。

那么我们把关于`name`的所有代码删除，添加`<slot>`：

```html
<!-- Button.vue -->
<button :class="color">
  <slot></slot>
</button>

<!-- index.vue -->
<button color="error">
  this is a button
</button>
```

可以看到，我们只需要在`Button`组件内，添加一个`<slot></slot>`标签，然后在`index.vue`里面，像普通标签一样，在组件内填写内容就行了。这就是基本`slot`插槽的应用。

::: tip 提示

关于插槽的写法还有很多种，本文只是做一个抛砖引玉，更多写法请参考[官方文档](https://cn.vuejs.org/v2/guide/components-slots.html#ad)

:::
