# v-bind

[[toc]]

## 介绍

`v-bind`命令用于动态的绑定一个或多个特性。比如说表达式，还记得我们在使用`v-for`的时候，在`key`的前面添加了一个`:`了吗，这个`:`就是`v-bind:`的简写方式。`v-bind:key="index"`，简写为`:key="index"`

## 调用方法

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
