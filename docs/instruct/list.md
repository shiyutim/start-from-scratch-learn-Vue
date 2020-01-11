# 列表渲染

[v-for](https://cn.vuejs.org/v2/guide/list.html)是用来遍历渲染一组数据的，这组数据必须为一个**数组**。以`<child> in <parent>`的形式，`child`为数组的每一项子元素，也就是要被遍历的每一项；`parent`为数组本身。如：`item in list`，那么，`list`就是一个数组，而`item`就是`list`数组里面的每一个子元素。`item` = `list[0]/list[1]/list[2]/list[n]`。下面看个例子：

```html
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.age">
        {{item.name}} --- {{item.age}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            name: 'tim',
            age: 10
          },
          {
            name: 'sam',
            age: 15
          },
          {
            name: 'colin',
            age: 20
          }
        ]
      }
    }
  }
</script>

<style></style>
```

<div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
    <ul>
        <li>tim --- 10</li>
        <li>sam --- 15</li>
        <li>colin --- 20</li>
    </ul>
</div>

假设我们有一组数据，存放在`data`里面的`list`中，在页面上，我们通过`ul`的形式展现出来，因为我们要得到的是一个展现用户名字和年龄的列表，所以`v-for`指令要添加在`<li>`标签上，这样我们能够得到一个`<ul>`和一堆`<li>`，这也是我们需要的页面布局，如果我们把`v-for`指令放在`<ul>`上面呢？我们来看看:

```html
<ul v-for="item in list" :key="item.age">
  <li>{{item.name}} --- {{item.age}}</li>
</ul>
```

<div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
<ul><li>tim --- 10</li></ul><ul><li>sam --- 15</li></ul><ul><li>colin --- 20</li></ul>
</div>

比较明显的是每个`<li>`之间的缝隙变大了，而在看页面结构能看出我们最终渲染出来的是一堆`<ul>`标签和一个`<li>`，这说明`v-for`放在哪里，那么就遍历哪里。而我们需要的不过是一个展现列表而已，所以，第二种方式是错误的，我们**应该把`v-for`指令放在`<li>`标签上**！

我们还能看到页面上有一个`:key`属性
