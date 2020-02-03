# 其他指令

[[toc]]

## 介绍

前面已经介绍了比较重要且常用的指令，剩下的指令在这里简单的介绍一下。

## v-text

正常使用模板插值时，使用`{{}}`的方式：

```html
<span> {{msg}} </span>
```

使用`v-text`的写法：

```html
<span v-text="msg"></span>
```

这俩种方式最终的效果是一样的。

## v-html

假设在 data 有如下变量:

```js
msg: `<span style="fontSize: 20px;">Hello V-html</span>`
```

在使用`{ { msg } }`或`v-text="msg"`的时候，会原封不动的渲染出来:

```js
<span style="fontSize: 20px;">Hello V-html</span>
```

但是我们的本意是渲染出一个`<span>`标签。所以 vue 提供了`v-html`，可以识别出 html 标签。

```html
<span v-html="msg"></span>
```

<div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
    <span style="fontSize: 20px;">Hello V-html</span>
</div>

## v-clock

在加载页面的时候，页面会经过编译，然后渲染 dom。所以，如果加载过程比较慢的话，会看到模板语法的表达式，比如:

```html
<div>{{ msg }}</div>
```

然后页面加载完之后，才能看到实际的值：

```html
<div>Hello Vue!</div>
```

这样用户体验很不好。所以，vue 提供了`v-clock`，我们可以使用 css 规则来隐藏未编译的模板标签。

```html
<div v-clock>{{msg}}</div>

<style>
  [v-clock] {
    display: none;
  }
</style>
```

这样设置后，用户便不会看到未经过编译的**模板标签**，而是一片空白，然后页面渲染完成后，便会恢复回来。

## v-once

顾名思义，v-once，使用在标签上，这个元素渲染一次后，就会变成**静态内容**，并被缓存起来。

```html
<div v-once>Hello Vue</div>
```

不过，**[官方文档有如下提示](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%9A%E8%BF%87-v-once-%E5%88%9B%E5%BB%BA%E4%BD%8E%E5%BC%80%E9%94%80%E7%9A%84%E9%9D%99%E6%80%81%E7%BB%84%E4%BB%B6)**：

::: danger 警告

再说一次，试着不要过度使用这个模式。当你需要渲染大量静态内容时，极少数的情况下它会给你带来便利，除非你非常留意渲染变慢了，不然它完全是没有必要的——再加上它在后期会带来很多困惑。例如，设想另一个开发者并不熟悉 v-once 或漏看了它在模板中，他们可能会花很多个小时去找出模板为什么无法正确更新。
:::

## v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签，跳过大量没有指令的节点会加快编译。

```html
<span v-pre>{{ this will not be compiled }}</span>
```

---

<a href="javascript:history.go(-1)">返回上一页</a>
