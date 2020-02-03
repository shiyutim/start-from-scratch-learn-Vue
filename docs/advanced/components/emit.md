# 子向父传值 emit

[[toc]]

## 介绍

前面我们讲解了怎么封装一个单`.vue`文件组件，同时通过*父向子传值*来显示不同的内容和颜色。只不过目前这个`Button`按钮没有任何的作用，我们没有为它设置任何`v-on`监听器。所以，为了要真正的使用它，我们需要给它绑定一个事件。

比如说，一个登录页面，我们使用了这个组件，并且把它作为登录按钮。那么，用户点击了这个登录按钮（也就是这个组件）后，我们需要发送 http 请求，这时我们需要使用`v-on`监听`click`事件。

最“无脑”的写法，就是写在这个组件里，大概是这样：

```html
<button :class="color" v-text="name" @click="login"></button>

<script>
  methods: {
    login() {
      // login event
    }
  }
</script>
```

虽然以上写法能够满足我们的需求，但是如果别的页面引入了这个组件呢？它可不一定同样是登录按钮，可能是*取消*按钮。所以，我们在这个组件内写**监听事件**是不被允许的。

我们需要的是一个**通用事件**，每个页面都能触发这个`click`事件，并且触发不同的函数，传递不同的值。这时候`$emit`就派上了用场。

## `$emit`

`$emit`用来触发当前实例上事件，附带参数都会传回给监听器回调。也就是说，通过`$emit`，我们能够在子组件内向父组件传递一个**事件**，这就是**子向父传值**。

下面我们来看一下如何使用它：

```html
<button :class="color" v-text="name" @click="$emit('btn-handler')"></button>
```

跟以前的代码相比，我们多了一行`@click="$emit('btn-handler')"`。意思是：我们通过`v-on`监听 button 的`click`，使用`$emit`触发传递回一个`btn-handler`事件。

::: tip 提示
有关`$emit`传递事件名的命名规范，请参考[官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E4%BA%8B%E4%BB%B6%E5%90%8D)
:::

目前为止，我们在子组件内，通过`$emit`向使用它的父组件传递回一个`btn-handler`事件。注意，我这里说的是`btn-handler`**事件**，那么我们只需要在父组件里，监听这个事件就好了啊。那么监听事件我们知道，使用`v-on`就可以了。所以，我们在引用这个组件的地方，加上监听器就可以了：

```html
<button color="primary" content="登录" @btn-handler="xxx"></button>
```

可以看到，我在引入组件的时候，添加了一个不完整的代码`@btn-handler="xxx"`。这表示监听`btn-handler`事件，并触发右侧的表达式或者函数（这里为 xxx）。因为我们需要的是登录功能，所以，我们可以写成这样：

```html
<button color="primary" content="登录" @btn-handler="login"></button>

<script>
  methods: {
      login() {
          console.log('login~')
      }
  }
</script>
```

<component-example1 />

现在你打开控制台，然后点击上面蓝色按钮，发现能够打印出`login~`，说明我们已经监听成功啦。这样，我们就完成了从子组件向父组件传递事件的过程。

## 传递参数

除了能够传递一个事件外，同时还能传递一个值，官网里面的解释已经比较简单明了了，所以推荐大家直接去看官方文档，[点击这里](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%80%BC)查看。

如果你看了后，对组件之间的互相传值还是有些困惑，没关系。下面我们通过一个例子来重新温习一下`Button`组件的使用。

## 小例子

### 点击按钮变色

还是基于我们的`Button`组件，这次我们来点不一样的：点击按钮变换不同的颜色。

首先是注册组件：

```html
<!-- Button.vue -->
<template>
  <div>
    <button :class="color" v-text="content"></button>
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
      },
      content: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  button {
    border: none;
    padding: 15px 20px;
    border-radius: 3px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.9;
  }
  .success {
    color: #fff;
    background: #27ae60;
  }
  .error {
    color: #fff;
    background: #c0392b;
  }
  .primary {
    color: #fff;
    background: #3498db;
  }
  .warning {
    color: #fff;
    background: #d35400;
  }
</style>

<!-- index.vue -->

<template>
  <div>
    <button :color="color" content="change color"></button>
  </div>
</template>

<script>
  import Button from 'src/components/Button.vue'
  export default {
    data() {
      return {
        color: 'primary'
      }
    },
    components: {
      Button
    }
  }
</script>

<style scoped></style>
```

<component-example2 />

我决定了，不要在丑下去了。所以，我改了些样式，并且把颜色更换了一下，这样美观多了是吧。

首先注册组件`Button.vue`，并使用`props`接收两个值，分别是`color`和`content`，代表颜色和按钮的内容。并初始化了一些 class 样式，这样我们才能通过`v-bind:class`来变换不同的颜色。

然后是`index.vue`，这里首先通过`import`引入`Button`组件，接着在`components`里面注册组件，最后在页面上使用。这里传递了两个值，分别为`color: 'primary'`和`content: 'change color'`。

接下来就是改变按钮颜色的逻辑了，我们需要通过`Button.vue`向`index.vue`传递事件和值，然后去改变颜色。首先定义一个颜色的列表，然后获取随机的 index，最后把随机的颜色值传回过去就可以了。

```html
<!-- Button.vue -->
<button :class="color" v-text="content" @click="btnClick"></button>

<script>
  methods: {
    btnClick() {
        let value = ['success', 'error', 'primary', 'warning']  // {1}
        let index = Math.random()   // {2}
        let l = value.length   // {3}
        index = Math.round((l - 1 ) * index)   // {4}

        // {5}
        if(index > 3) index = 3
        if(index < 0) index = 0
        // console.log('index', index)
        this.$emit('btn-handler', value[index])   // {6}
    }
  }
</script>
```

在`Button.vue`组件内，我们定义了一个函数，这次不再直接`$emit`传递了，而是把它写在函数内部。在函数内部，我们一一进行分析：

1. 定义了一个颜色列表，所有的颜色都在这里
2. 获取到一个随机数，并赋值给`index`
3. 定义颜色列表的长度，并赋值给`l`
4. 这一步，是获取一个在颜色列表内的随机 index。其中，`l - 1`代表限定范围为 3，`*index`就是获取最后的随机数。最后的随机数应该为`0/1/2/3`
5. 为了不出错误，保险起见，我们在做一个处理，如果超过`0-3`的范围，我们就把它改变成边界（就是 0 或 3）。
6. 最后把获取到的**颜色值**传递获取。`value[index]`为颜色值。`$emit`的**第二个参数**为传递回去的参数！！！

接着我们在接收值：

```js
<template>
  <div>
    <Button
      :color="color"
      content="change color"
      @btn-handler="changeColor"
    ></Button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        color: 'primary'
      }
    },
    methods: {
      changeColor(event) {
        console.log('event', event)
        this.color = event   // {1}
      }
    }
  }
</script>

<style scoped></style>
```

<component-example2-2 />

`event` 就是子组件传过来的值，我们使用`{1}`处，就可以完成值的改变。

有人可能会觉得，为什么要这么麻烦的传来传去呢？为什么不直接在子组件内改变颜色的值呢？其实我们可以试一下，在子组件内，不使用`$emit`传递事件和值，直接修改通过`props`传过来的`color`的颜色。也就是`this.color = value[index]`。

如果你试了，会发现，虽然功能正常使用，但是控制台会报错。也就是说，实际上我们不能直接在子组件里面修改父组件传过来的值，因为这样并不容易区分改变来源。

所以，想要**便利**的使用“双向绑定”，Vue 提供了`update:xxx`模式，[点击这里](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)查看官方文档具体说明。其中，xxx 代表通过`props`传过来值的名字。`update:propsName`。

所以，我们要修改的是`color`的值

- 第一步是在`Button`组件里，修改为`this.$emit('update:color', value[index])`。表示我们要直接修改`color`的值，值为`value[index]`。
- 第二步是在使用组件的文件里(`index.vue`)把`@btn-handler="changeColor"`去掉，因为现在不需要监听事件了，修改`:color="color"` 为`:color.sync="color"`。

修改后的为`<Button :color.sync="color" content="change color"></Button>`

进行以上修改后，点击按钮后还是能够正常的改变颜色。

<hr />

不知道有没有人注意到，点击按钮的时候，有时候两次按钮的颜色是一样的，**为了追求完美**，我们在完善一下这个功能！

总的来说就是，当返回的颜色值和当前的颜色值一样时，在从新求一次值，直到不一样，并返回。

我们以前写的函数逻辑如下：

```js
methods: {
    btnClick() {
        let value = ['success', 'error', 'primary', 'warning']  // {1}
        let index = Math.random()   // {2}
        let l = value.length   // {3}
        index = Math.round((l - 1 ) * index)   // {4}

        // {5}
        if(index > 3) index = 3
        if(index < 0) index = 0
        // console.log('index', index)
        this.$emit('btn-handler', value[index])   // {6}
    }
  }
```

现在我们要继续在`btnClick`函数里面添加代码逻辑了，但是有没有发现，在此函数里面写代码会越写越多，最终会各种逻辑都有，变得非常难理解。所以，我们需要拆分函数，我准备把获取颜色的逻辑拆分成一个`getColor`函数

```js
methods: {
    btnClick() {
        let result = this.getColor()
        console.log('result', result)
        this.$emit('update:color', result)
    },
    getColor() {
        let value = ['success', 'error', 'primary', 'warning']
        let index = Math.random()
        let l = value.length
        let color = this.color   // {1}
        index = Math.round((l - 1 ) * index)

        // {2}
        if(value[index] === color) {
            return this.getColor()
        }

        if(index > 3) index = 3
        if(index < 0) index = 0
        return value[index]
    }
  }
```

<component-example2-3 />

我们在`{1}`处，储存了当前颜色。在`{2}`处，如果当前的颜色和随机颜色一样，则从新调用这个函数（这里一定要加上`return`，要不返回的颜色为第一次返回的颜色）。

<hr />

除了从新调用函数外，我们还可以使用`while`循环来从新写一下这个函数

```js
    methods: {
        btnClick() {
            let result = this.getColor()
            console.log('result', result)
            this.$emit('update:color', result)
        },
        getColor() {
            let value = ['success', 'error', 'primary', 'warning']
            let index = Math.random()
            let l = value.length
            let color = this.color
            index = Math.round((l - 1 ) * index)

            // {1}
            do {
                index = Math.round((l - 1 ) * Math.random())
            }
            while(color === value[index])

            if(index > 3) index = 3
            if(index < 0) index = 0
            return value[index]
        }
    }
```

在`{1}`处，添加了`do/while`逻辑，首先执行一下从新获取随机数。如果不相同，则返回值；如果相同，则继续获取随机数，直到不相同退出 while 循环。

经过我个人测试，第二种方法使用 while 循环比第一种直接调用函数要快一些。
