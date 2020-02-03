# v-bind

[[toc]]

## 介绍

`v-bind`指令用于动态的绑定一个或多个特性。比如说表达式，还记得我们在使用`v-for`的时候，在`key`的前面添加了一个`:`了吗，这个`:`就是`v-bind:`的简写方式。`v-bind:key="index"`，简写为`:key="index"`

## v-bind

调用方法就是在一个属性前面添加`v-bind:`或者`:`。以后我们都简写为`:`。
例子：

- 绑定一个图片`src`属性：

```html
<!-- 绑定一个变量 -->
<img :src="imgSrc" />

<!-- 拼接 -->
<img :src='https://www.xxx.com/ + "imgSrc"' />

<script>
  data () {
    return {
      imgSrc: 'xxxxx'
  }}
</script>
```

- 绑定一个 a 标签的`href`链接

```html
<a :href="aHref"> 这是一个链接 </a>

<script>
  data () {
    return {
      aHref: 'xxxxx'
    }
  }
</script>
```

- 绑定一个对象

```html
<img :src="img.url" />

<a :href="img.url"> 这是一个链接 </a>

<script>
  return {
    img: {
      url: 'xxxx'
    }
  }
</script>
```

- 绑定一个数组

```html
<!-- 0 为角标 代表第一项 -->
<img :src="img[0].url" />

<a :href="img[1].url"> 这是一个链接 </a>

<script>
  return {
    img: [
      {
        url: 'imgUrl.com'
      },
      {
        url: 'a.com'
      }
    ]
  }
</script>
```

## 小例子

### 遍历渲染一组图片

一般来说，在渲染一组图片的时候，我们是通过`v-for`来进行遍历渲染的，搭配`v-bind`就能实现 动态的给`<img>`绑定 url。
这里给大家提供一组真实的图片链接，是通过我写的[小爬虫](https://github.com/shiyutim/crawler)爬取的。接口地址为: `https://easy-mock.com/mock/5e1aa4ff7f109b0caa4d2e26/learnvue/imglist`。

首先，我们进行如下初始化页面模板：

```html
<template>
  <div class="container">
    <img src class="img" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgList: []
      }
    },
    methods: {},
    mounted() {}
  }
</script>

<style scoped lang=""></style>
```

进行如上初始化后，先是通过接口获取到数据后，存入`data`里面的`imgList`，然后通过遍历`imgList`数组，把值“绑定”给 img 的 src 属性。

```html
<template>
  <div class="container">
    <img
      class="img"
      v-for="(item, index) in imgList"
      :src="item"
      :key="index"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgList: []
      }
    },
    methods: {
      initData() {
        axios
          .get(
            'https://easy-mock.com/mock/5e1aa4ff7f109b0caa4d2e26/learnvue/imglist'
          )
          .then(res => {
            console.log(res, 'res')
            this.imgList = res.data.data.imgList   {1}
          })
          .catch(err => {
            throw err
          })
      }
    },
    mounted() {
      this.initData()   // 这里为方法的调用 在生命周期一节会讲
    }
  }
</script>

<style scoped lang="">
  .img {
    width: 200px;
    height: 200px;
    margin: 5px;
  }
</style>
```

- 这里同样通过`axios`获取数据，并通过 `{1}` 处进行赋值操作。
- 通过`v-for="(item, index) in imgList"` 遍历数组。
- 通过`:src="item"` 把这个数组的每一项（即每一个 url）动态的绑定到 src 上，完整写法为`v-bind:src="item"`。
- `:key="index"`给每一个图片标识一个`key`属性，值为当前项的索引（即 0/1/2/3 ...），完整写法为`v-bind:key="index"`。

运行以上代码后，就会看到页面上出现了许多图片。

---

<a href="javascript:history.go(-1)">返回上一页</a>
