# 组件 components

[[toc]]

## 介绍

组件是什么呢？能用来干什么呢？在以前传统的项目中，我们使用`.html`作为一个页面。同时，页面中会有很多重复的地方，页面和页面之间也有很多重复的代码。幸好的是，在现在我们可以通过以组件的方式来复用这些代码。

比如说，一个官网的首页，有 header，有中间的主要内容，有 footer。那么我们就可以把 header 和 footer 分别抽离出一个组件，哪个页面需要 header 或者 footer，我们直接引入进来就可以了。这样不仅节省了大量的时间还少写了很多重复的代码。

那么在 Vue 中，一个“页面”可以由大量的组件组成。引用一下官网的图片如下所示：

![](https://cn.vuejs.org/images/components.png)

可以看到，最上面的那一个“方块”就可以表示为一个“页面”，下面的所有分支都可以代表一个个组件。可以说，一个“页面”就可以由多个组件组成。

介绍完了组件的含义和好处后，我们开始进入正题，在 Vue 中如何组成组件？和如何使用组件？

## 注册组件

Vue 提供了`Vue.component()`这个 api 来注册一个组件，组件名为`()`里面的第一个选项：

```js
Vue.component('component-a', {
  template: `
        <div>This is component-a</dvi>
    `
})
```

这样我们就注册了一个名为`component-a`的**全局组件**。注意是全局组件，也就是说，在任何地方我们都可以使用这个组件，而且有一点需要注意，就是组件**名字不能重复**。所以，除了注册一个全局组件外，还可以注册有一个局部组件，那么这个局部组件只能在当前的文件中使用。

```js
var componentA = {
  // ...
}
```

这样，就完成了一个局部组件的注册。

有一点我需要声明一下，本文主要是向大家讲解一下如何学习我们工作中最常使用的方法。所以，以上方式我在工作中并没有经常使用，我也不准备深入讲解以上方法，更具体的信息可以查阅官方文档中关于[组件基础](https://cn.vuejs.org/v2/guide/components.html)/[深入了解组件](https://cn.vuejs.org/v2/guide/components-registration.html)一节。

所以，我接下来要讲的是我工作中最常使用的注册组件和使用注册的方式，也就是如何将一个`.vue`文件注册为一个组件和**怎么使用它**。更多关于此方法优点的描述请查看[官方文档](https://cn.vuejs.org/v2/guide/single-file-components.html)

::: warning 注意
在此之前，你需要学会使用`vue-cli`构建一个完整的 Vue 项目。接下来都是对于此方式进行讲解。同时，你还需要知道点`es6 import、export`的知识。
:::

### 深入注册组件

在讲怎么使用之前，我想举一个例子，就是赵本上老师的小品，把大象放冰箱需要几步。

- 首先，我们得有一个“大象”吧，那第一步意味着我们需要得到一个大象。
- 其次，就是打开冰箱门
- 再次，把“大象”放入冰箱
- 最后，关上冰箱门

那么，在我们 Vue 中，跟上面几步其实差不多。

- 注册组件
- 引入组件
- 放入`components`中
- 使用组件

下面我们来分解一下以上步骤

#### 注册组件

根据项目规范，我们所有的页面文件都放在`src`目录下，其中创建一个`views`文件夹存放我们的页面文件，`components`文件夹用来存放我们的组件文件。一个`.vue`文件就是一个组件，所以我们可以在`components`目录下创建一个`Button.vue`，新建一个按钮的组件。那么我们可以在`Button.vue`里面放入如下代码结构:

```html
<template>
  <div class="container">
    <button>Click Me</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    components: {},
    computed: {},
    watch: {},
    methods: {
      // type your function
    },
    created() {},
    mounted() {},
    updated() {},
    destroyed() {}
  }
</script>

<style scoped></style>
```

以上就创建了一个`Button.vue`的组件。

#### 引入组件

引入组件这就涉及到了`es6`的内容，不过 如果你还没有学习，不用担心，你只需要一条指令就可以完成组件的引入，以后你再补`es6`中关于`import/export`的知识即可。

`import xxx from 'xxx'`

上面这条指令就是引入组件的命令，其中，第一个 xxx 是文件名，第二个 xxx 是这个文件对应的路径。

- 文件名比较简单，如上例的话，就是`Button`。那么，全写为`import Button from 'xxx`
- 文件路径可以有两种方式，一种是**相对路径**，另一种是基于`webpack`配置的`@(src)`的路径。
  - 相对路径，是基于当前文件的路径。假如你在`views`目录下创建了一个`index.vue`的文件，那么基于此文件的路径就是`../components/Button.vue`。全写为`import Button from '../components/Button.vue`
  - `@`或者`src`， 是通过`webpack`配置的路径，使用`@`或者`src`就代表从`src`目录下开始查找文件。全写为`import Button from '@/components/Button.vue`

以上完成了在一个“页面”中引入组件。

#### 放入 components

这一步相当于“把大象放入冰箱的步骤”，引入在一个`.vue`文件里面，只通过`import`引入组件是使用不了的，还需要在`components`里面声明一下。

`components`相当于一个容器，里面放着的是你引入的组件。其中，`components`跟`methods、computed、data、watch`是同级别的。

我们引入了`Button`组件后，需要在`components`里面声明一下：

```html
<script>
  import Button from 'xxx'
  export default {
    data() {
      return {}
    },
    computed: {},
    watch: {},
    components: {
      Button: Button
    }
  }
</script>
```

通过`Button: Button`就完成了一个组件的声明，代表着你可以在本页中使用`Button`组件了。

如果你知道`es6`对象值的简写的话，上面还可以写成：

```js
components: {
  Button
}
```

效果相同，看着简洁多了。

::: tip 提示
我记得我刚开始学习的时候，这一步经常落下，所以各位小伙伴们，千万不要把这一步落下！！！
:::

::: warning 注意

是`components`不是`component`

是`components`不是`component`

是`components`不是`component`

:::

#### 使用组件

最后一步是最轻松的了，我们只需要在需要的位置写上组件就可以了。

```js
<button></button>

// 或者

<Button></Button>
```

以上就是一个组件从注册到引入到声明到使用的步骤，看起来挺复杂，实际上，等你熟悉了之后，使用组件会非常方便。而且你注册了一次组件后，就不需要在注册组件了，只需要重复 2.3.4 步就可以了。
