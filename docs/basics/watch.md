# 侦听器 watch

[[toc]]

## 介绍

侦听器 `watch` 可以用来监听一个数据的变化。`watch` 和 `computed`、`methods` 一样，都是一个对象。所以，他们都使用`:{}`的方式，并且处于同一级别。

```js

data () {
    return {
        count: 0
    }
}

watch: {

},
computed: {

},
methods: {

}
```

## watch

我们知道，computed 里面添加的是一个**新值**，并且可以在任何地方使用。而 watch 里面添加的是一个已经存在的表达式（变量）。watch 的使用方式分为好几种，下面我们来具体说明一下:

- 普通方式

```js
computed: {
  count: (newValue, oldValue) {
      console.log('newValue', newValue)
      console.log('oldValue', oldValue)
  }
}
```

此时我们就已经设置好了对变量`count`进行了监听。如果`count`的值改变，那么会打印出对应的值。其中，`newValue`代表新值，`oldValue`代表旧值（newValue 和 oldValue 的名字可以随意更改，只代表第一个参数和第二个参数而已）。

比如说，`count`初始化为 0, 那么我们把`count = 1`。此时，`newValue`为 1，`oldValue`为 0。

- 使用*方法*

```js
methods: {
    countHandler: function(newValue, oldValue) {
      console.log('newValue', newValue)
      console.log('oldValue', oldValue)
    }
}

computed: {
    count: 'countHandler'
}
```

这种方式和上面是同样的效果。

- 使用`handler`（deep）

```js
computed:{
    count: {
        handler: (newValue, oldValue) {
            ...
        },
        deep: true
    }
}
```

注意这里有一个`depp`选项，官网中的解释如下：

> 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深

正常来说，我们使用 watch 监听的是单个值，watch 能够正常使用。而如果是一个对象的话，那么 watch 只会监听到**内存地址**的改变，而监听不到对象里面值的改变。

假如有如下代码：

```js

data () {
    return {
        obj: {
            name: 'tim'
        }
    }
}

watch: {
    obj: function(newVal, oldVal) {
        console.log('newVal', newVal)
        console.log('oldVal', oldVal)
    }
}
```

我们设置了对 obj 对象的监听，当我们改变 obj 时：

```js
this.obj = {
  name: 'sam'
}
```

<img :src="$withBase('/computed-1.png')" />

如上图所示，我们能够看到，控制台打印出了对应的信息，说明我们能够监听到。但是我们改变`obj`里面的值呢？我们把代码做一下改变：

```js
this.obj.name = 'sam'
```

现在我们再看一下控制台，发现没有任何打印信息出现，说明我们没有监听到`name`属性。实际上，我们对`obj`设置了`watch`，只是监听了它的内存地址，如果`obj`的内存地址改变了，`watch`才会响应。
（有关内存地址，可以网上找一下`const`声明对象的原理）

那么我们想要监听到`obj`里面的属性，或者说监听`name`属性，我们有两种方法：

1. 其一是，如上面所示，我们可以给`watch`的`obj`里面添加`deep: true`这一条属性，代表我们进行深度监听。但是`obj`里面的任何值改变，该函数都会执行。

加上了`deep: true`属性后，发现控制台打印出了对应的`newVal`和`oldVal`了。

2.  其二是，对`name`属性进行单独的监听，可以进行如下设置：

```js
computed: {
    'obj.name': function(newVal, oldVal) {
        // ...
    }
}
```

这样，只要`obj.name`的值改变，才会执行对应的函数！

- 使用*方法*（immediate）

```js
computed: {
    count: {
      handler: function(newVal, oldVal) {},
      immediate: true
    },
}
```

可以看到，我们又换了一个属性`immediate`，什么意思呢？来自官网的解释如下：

> 该回调将会在侦听开始之后被立即调用

这里比较好理解，意思就是，设置监听后，会立马调用监听的函数。正常来说，最开始的几种方法在页面加载完毕后，都不会打印`newVal`。而设置了`immediate`属性后，页面加载完毕控制台就会打印出`newVal`。

还有其他方法请查看[官方文档](https://cn.vuejs.org/v2/api/#watch)

以上说了一大堆方法可能大家有点蒙，别着急，目前我日常使用过程中，比较常用的就是：

```js

computed: {
    count(newVal, oldVal) {
        // ...
    }
    // 或者
    'obj.name'(newVal, oldVal){
        // ...
    }
}
```

侦听器固然好用，但是也会造成滥用，那么[官方文档](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)里面有对应的例子，这里就不在细说了。
