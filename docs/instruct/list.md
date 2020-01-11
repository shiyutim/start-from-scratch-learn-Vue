# 列表渲染

[[toc]]

## 渲染数组

[v-for](https://cn.vuejs.org/v2/guide/list.html)是用来遍历渲染一组数据的。以`<child> in <parent>`的形式，`child`为数组的每一项子元素，也就是要被遍历的每一项；`parent`为数组本身。如：`item in list`，那么，`list`就是一个数组，而`item`就是`list`数组里面的每一个子元素。`item` = `list[0]/list[1]/list[2]/list[n]`。下面看个例子：

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

同时，`v-for`还提供了`index`属性，即当前遍历项的索引:

```html
<ul>
  <li v-for="(item, index) in list" :key="index">
    {{item.name}} --- {{item.age}}
  </li>
</ul>
```

`index`跟`item`一起，放在一个括号里面，用`,`分隔。同时，我们可以把`key`属性换为`index`。 那么这个`key`是干什么用的呢？[官网文档](https://cn.vuejs.org/v2/api/#key)里面指出，`key`是在 Vue 的 dom 算法的时候，用来对比新旧`vnodes`的。因为 vue 采用虚拟 dom，当页面发生改变时，不会把所有的 html 元素全都改变，只会改变 发生改动的部分。
同时还能够看到在 key 的前面有一个`:`，这个是`v-bind:`指令的简写形式。稍后会介绍`v-bind`。

继续上面的例子，假设我们有一组数据，存放在`data`里面的`list`中，在页面上，我们通过`ul`的形式展现出来，因为我们要得到的是一个展现用户名字和年龄的列表，所以`v-for`指令要添加在`<li>`标签上，这样我们能够得到一个`<ul>`和一堆`<li>`，这也是我们需要的页面布局，如果我们把`v-for`指令放在`<ul>`上面呢？我们来看看:

```html
<ul v-for="item in list" :key="item.age">
  <li>{{item.name}} --- {{item.age}}</li>
</ul>
```

<div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
<ul><li>tim --- 10</li></ul><ul><li>sam --- 15</li></ul><ul><li>colin --- 20</li></ul>
</div>

比较明显的是每个`<li>`之间的缝隙变大了，而在看页面结构能看出我们最终渲染出来的是一堆`<ul>`标签和一个`<li>`，这说明`v-for`放在哪里，那么就遍历哪里。而我们需要的不过是一个展现列表而已，所以，第二种方式是错误的，我们**应该把`v-for`指令放在`<li>`标签上**！

## 渲染对象

还记得上一节中的小例子吗，我们这里把`userInfo`的数据拿过来，然后使用`v-for`渲染出来：

```html
<template>
  <div class="container">
    <div v-if="userInfo.isMember" class="member">
      <!-- change -->
      <p v-for="(value, name, index) in userInfo" :key="index">
        {{name}}: {{value}}
      </p>
      <!-- end -->
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
    },
    methods: {},
    mounted() {}
  }
</script>

<style scoped lang=""></style>
```

这里把渲染方式进行了修改，不是在手动写出每一项的内容，而是通过`v-for`进行了渲染。在`v-for`里面，我使用了`value, name, index`，这三个属性分别代表：

- value 当前项的值，对于`userInfo`来说，就是`tim/10/1/0`
- name 当前项的 key，对于`userInfo`来说，就是`name/age/sex/isMember`
- index 当前项的索引，也就是`0/1/2/3`

通过以上分析，我们应该知道，我们以`name: value`的形式写出来，那么结果应该是这样的：

<div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
 <div data-v-e2779f08="" class="member"><p data-v-e2779f08="">name: tim</p><p data-v-e2779f08="">age: 10</p><p data-v-e2779f08="">sex: 1</p><p data-v-e2779f08="">isMember: 1</p></div>
</div>

以上就是关于`v-for`的介绍了，可能有些人还对`:key`属性有些不解，没关系，我们将在下一小节讲解`v-bind:`的使用。不过在此之前，我们还是要通过几个例子来更直观的学习`v-for`的使用。

## 小例子

### 展示表格数据

```javascript
;[
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]
```

现在假设我们有一组数据，然后使用`table`进行展示，我们当然不可能每一项都手动写出来，所以这时候可以使用`v-for`来渲染:

```html
<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>data</th>
          <th>name</th>
          <th>address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.date}}</td>
          <td>{{item.name}}</td>
          <td>{{item.address}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  }
</script>

<style scoped lang=""></style>
```

在所有的例子里面，为了给大家展示业务逻辑和代码使用，我并不会美化页面也不会使用其他 ui 框架。

在上面的代码中，我们使用`v-for`来遍历渲染一组数据 `list`，本身没有什么难点，但在实际项目中，我们需要在`data`里面定义`list`，然后在请求到数据后，把数据赋值给`list`，之后页面就会自动渲染。

为了给大家更真实的“游戏”体验，我给大家`Mock`了一组数据，并创建了一个使用`get`请求访问的接口，地址为：`https://easy-mock.com/mock/5e1980617f109b0caa4d2d5e/listExample`

那么，使用真实的接口后，代码为：

```html
<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>data</th>
          <th>name</th>
          <th>address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.date }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [] // 初始化好一个`list`空数组
      }
    },
    methods: {
      initData() {
        axios
          .get(
            'https://easy-mock.com/mock/5e1980617f109b0caa4d2d5e/listExample'
          )
          .then(res => {
            console.log(res, 'res')

            this.list = res.data.data.list // 这条代码最重要 是赋值代码
          })
          .catch(err => {
            throw err
          })
      }
    },
    mounted() {
      this.initData() // 这里是调用代码 在本文的生命周期一节中会讲解
    }
  }
</script>

<style scoped lang=""></style>
```

::: warning 注意
这里使用了项目中用于 Http 请求的`axios`，为了给大家“开箱即用”的体验，这里是用`axios`的 CDN，需要在`index.html`的`<head>`标签中放入如下 cdn:`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`。真实的项目里面，应该通过`npm install axios -S`的方式安装`axios`的 npm 包，然后在项目引用。
:::

关于 axios 在本文的最后会进行讲解，这里不多做介绍，大家只需要关注一下几点：

1. 在写代码的时候，需要在`data`里面初始化一个`list: []`，这里的意思为，初始化一个 list 变量，并赋值为一个空数组。
2. 在 js 代码里面访问`data`**里面的变量**，比如`list`，我们需要以`this.xxx`的形式，在本例中是`this.list`。（在某些情况下需要使用 let \_this = this;）!!!
3. `res.data.data.list`这条代码就是我们通过接口获取到真实的数据。（可以通过 F12 控制台查看数据）
4. 我们通过`this.list` = `res.data.data.list` 把获取到的数据**赋值**给本地的`list`，然后页面就会自动渲染了。
5. 如果 A 页面有 list 变量，B 页面也有 list 变量，那么会不会冲突呢？答案是**不会**，因为我们使用的是`data(){}`函数，上面也讲过，每个组件之间不会互相影响。

上面的代码我使用的 es6 语法，那么如果使用 es5 呢？代码应该如下：

```html
<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      initData: function() {
        console.log(this, '外部的this') // {1}
        var _this = this
        axios
          .get(
            'https://easy-mock.com/mock/5e1980617f109b0caa4d2d5e/listExample'
          )
          .then(function(res) {
            console.log(res, 'res')
            console.log(this, '内部的this') // {2}
            console.log(_this, '_this')

            _this.list = res.data.data.list
          })
          .catch(function(err) {
            throw err
          })
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>
```

因为使用 es5 语法，出现了 this 指向问题，所以，我们需要在函数的开始位置把 this 储存起来，然后才可以在函数内部，使得我们依然能获取到 vue 实例。 也就是说，在`{1}`的时候，this 指向 vue 实例，而在`{2}`的时候，`this`指向`undefined`。

至于为什么使用 es6 语法的**箭头函数**能够使用`this`访问 vue 实例，而是用`es5`传统的函数方式不能够访问 vue 实例，大家可以在网上查找一下关于：**箭头函数 this 作用域** 的文章。
