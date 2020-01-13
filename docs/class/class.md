# class

[[toc]]

## 介绍

在我们写代码的时候，避免不了需要操作 style 样式和 class，我们可以使用`v-bind`来操作他们。通过`v-bind`，我们可以使用**表达式、对象和数组**来对他们进行控制。

> 因为本节比较好理解，所以基本按照[官方文档](https://cn.vuejs.org/v2/guide/class-and-style.html)进行描述。

## class

我们可以根据变量来动态的切换 class，最终结果只会渲染出计算后的 class。

```html
<div :class="{active: isActive}"></div>

data: { isActive: true }
```

结果为：

```html
<div style="active"></div>
```

其中，左边为 class，右边为变量。只有变量的值为`truthy`时，才会渲染对应的 class。

除了可以使用`v-bind`来绑定 class 外，还可以与原生 class 共存：

```html
<div class="test" :class="{active: isActive}"></div>
data: { isActive: true }
```

结果为：

```html
<div class="test active"></div>
```

如果样式多了，写在 html 里面比较麻烦，也可以在`data`里面定义一个对象：

```html
<div class="test" :class="classObject"></div>
data: { classObject: { active: true, test: false } }
```

除了可以使用`对象{}`的方式，还可以通过`数组[]`进行绑定：

```html
<div :class="[activeClass, testClass]"></div>
data: { activeClass: 'active', testClass: 'test' }
```

结果为：

```html
<div class="active test"></div>
```

但是这样写的话，写在上面的所有 class 都会渲染出来，那么想要条件渲染可以在数组里面使用对象的语法：

```html
<div :class="[{activeClass: isActiveClass}, testClass]"></div>
data: { isActiveClass: true, activeClass: 'active', testClass: 'test' }
```

## style

同样的，style 与 class 一样，都可以通过**对象**和**数组**的方式进行绑定。

```html
<!-- 对象方式 -->
<div :style="{ color: Color, height: Height + 'px' }"></div>
data: { Color: '#000', Height: 100 }

<!-- 数组方式 -->
<div :style="['Color', 'Height']"></div>
data: { Color: '#000', Height: '100px' }
```

更完整的信息请参阅[官方文档](https://cn.vuejs.org/v2/guide/class-and-style.html)

## 小例子

### 动态的切换导航页高亮

一个常见的需求，就是顶部导航栏或底部导航栏的点击高亮，那么我们通过`v-bind:class`就可以实现这个功能。不过，这个小例子需要搭配`v-for`一起使用。

首先我们初始化一个模板：

```html
<template>
  <div class="container"></div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped></style>
```

然后简单的添加一个导航栏，在添点样式（不能一直这样丑下去啊:kissing_heart:）：

```html
<div class="container">
  <section>
    <span class="item" v-for="(i, index) in 5">标签{{index+1}}</span>
  </section>
</div>

<style scoped>
  .item {
    margin-right: 7px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  }
</style>
```

我们首先给导航栏加一个鼠标滑过改变字体颜色的效果吧，那么我们可以使用`v-bind:style`来动态的绑定一个 color 颜色，首先你应该思考一下怎么做，然后在看我的思路：

```html
<div class="container">
  <section>
    <span
      :style="{color: hoverIndex === index ? '#3498db' : ''}"
      @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = -1"
      class="item"
      v-for="(i, index) in 5"
      >标签{{index+1}}</span
    >
  </section>
</div>

<script>
  export default {
    data() {
      return {
        hoverIndex: -1
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .item {
    margin-right: 7px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  }
</style>
```

<class-example1-1 style="margin: 35px 0;" />

通过预览效果，能够看到，我们鼠标放上去，颜色字体改变了，这就是通过动态的添加 style 的 color 来改变的，下面我们来分析一下具体的操作：

- 大家知道，我们使用`v-for`遍历时，有一个 index 值，index 就是当前的索引项，为 0..1..2....，那么对于我们的例子来说，就是`0 1 2 3 4`。
- `@mouseenter="hoverIndex = index"` 这一步是最为重要，这里使用了我们前面学习的`v-on`的语法，监听了`mouseenter`事件，当鼠标放在**当前的 span 标签时**，设置`hoverIndex`变量等于**index**。通过这一步，我们就知道了**当前鼠标放在的是哪一个 span 标签**。
- `:style="{color: hoverIndex === index ? '#3498db' : ''}"` 这里使用三元表达式，对 color 的字体颜色进行求值，意思为：如果 hoverIndex 等于 当前的**索引项**的话，就添加*蓝色*，否则*什么都不做*。所以，我们知道了鼠标滑过的是哪一个 span 标签后，在设置值就可以了。
- `@mouseleave="hoverIndex = -1"` 这一步，是清除动作，鼠标离开后，把值初始化为-1。为-1 不等于任何 index（0-4），所以鼠标离开后，不会有任何标签高亮。

在经过以上解释后，相信大家已经有了初步的了解，那么我们在设置点击标签后，添加高亮理解起来也就比较方便了。

跟动态绑定`style`一样，添加高亮我们使用`v-bind:class`，那么我们就添加一个 class：

```css
.active {
  border-bottom: 2px solid #e74c3c;
}
```

上面是鼠标滑过，添加颜色效果，这次我们是点击标签，然后添加 class，那么我们就需要`v-on`来监听`click`事件。给思考一下，然后继续看如下代码：

- 首先添加一个变量，用来控制当前**点击的是哪个标签**。我们知道，导航肯定得有一个是高亮状态，不可能没有高亮的标签，所以我们初始化为 0，这样第一个标签自动变成高亮状态。

```js
activeIndex: 0
```

- 添加`v-on:click`事件。跟上面一样，点击的时候，存储点击的 index。这样通过`activeIndex`变量，我们就知道当前点击的是哪个标签了。如果为 0，说明是第一个；为 1，说明是第二个，以此类推。

```js
@click="activeIndex = index"
```

- 接下来就是进行判断了，如果当前点击的项和`index`相同，那么就认为这个 span 标签需要添加高亮 class：

```js
:class="{active: activeIndex === index}"
```

那么通过以上设置后，效果如下：

<class-example1-2 style="margin: 35px 0;" />

总结一下，就是通过一个**变量来储存当前的点击状态**，然后通过**变量与 index 进行对比** 来添加 class。

如果你觉得以上你内容比较麻烦，那么还有一个简单的方法，如果你使用了`vue-router`的话，可以通过`<router-link>`自带的高亮 class 来添加对应的样式，引用[官方的话](https://router.vuejs.org/zh/guide/#javascript)就是:

> 要注意，当 `<router-link>` 对应的路由匹配成功，将自动设置 class 属性值 `.router-link-active`。查看 API 文档 学习更多相关内容。

那么只要我们给`.router-link-active`这个 class 设置对应的高亮样式就可以了。
