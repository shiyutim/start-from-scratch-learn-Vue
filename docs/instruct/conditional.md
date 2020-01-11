# 条件渲染

[[toc]]

## v-if

[v-if](https://cn.vuejs.org/v2/guide/conditional.html)指令可以控制一个元素是否渲染。只有`v-if`的值为 truthy 的之后，才被渲染。关于 truthy 的解释可以查看[这篇文档](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)。其实简单的说就是为“真值”的时候才渲染。

接下来看一个例子，还记得最开始的那个例子吗？我们把他改变一下：

```html
<template>
  <!-- change -->
  <div v-if="message">{{message}}</div>
  <!-- end -->
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }
</script>

<style></style>
```

<div style="background: #fff; border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
    Hello Vue!
</div>

上面代码标记出了改变的部分，我们使用`v-if`指令来控制`<div>`标签的显示与否。表示，当`message`为 truthy 时，`<div>`标签显示，否则隐藏。

所以，变量`message`的值为: `hello Vue!`，转换后为**真值**，所以，这个`<div>`标签能够显示出来。

如果我们给值取个反呢？来看看，我们使用`!`进行取反操作：

```html
<template>
  <!-- change -->
  <div v-if="!message">{{message}}</div>
  <!-- end -->
</template>
```

<div style="background: #fff;  border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
 
</div>

为了简化篇幅，没有改动的部分不做展示。 那我们进行了取反操作后，果然！页面上原本的`hello Vue!`不见了。

vue 还提供了`v-else`，用来当`v-if`为“假值”时，显示的元素。就跟 JavaScript 的`if/else`一样。

```html
<!-- 根据页面只能有一个根元素的原则，这里改变一下结构 -->
<div>
  <h1 v-if="!message">{{message}}</h1>
  <h1 v-else>Message 被隐藏了</h1>
</div>
```

<div style="background: #fff;  border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
Message 被隐藏了 
</div>

通过上面例子可以看到，页面上展示了`Message 被隐藏了`。同时需要注意，`v-else`不需要提供任何值，只能作为`v-if`的补充。

> v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。

如果你想要在判断另一个条件呢？ vue 又提供了`v-else-if`，用来充当`v-if`的下一个判断条件：

```html
<div>
  <h1 v-if="count < 0">count 小于0</h1>
  <h1 v-else-if="count == 0">count 等于0</h1>
  <h1 v-else>count 大于0</h1>

  <input type="number" v-model="count" />
</div>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    }
  }
</script>
```

<div style="background: #fff;  border: 1px solid #eee;padding: 25px 35px; margin-top: 10px; margin-bottom: 40px;">
count 等于0
</div>

这里为了更直观的展示`v-else-if`的操作，更换了一下例子中的值，把变量`message`更换为`count`，同时，分别把 count 与 0 进行了三次比较，每次比较显示对应的值。而且在下方添加了一个`<input>`，是为了展示一下 vue 中的**双向绑定**。现在你不需要搞懂`<input>`标签里面`v-model`的意思，复制代码到自己的项目中，直观的感受一下。

::: warning 注意
在代码中`<h1 v-else-if="count==0">count 等于0</h1>` 进行比较时，我使用了`==`，相信大家应该知道`==`和`===`的区别。为了保证一致性推荐大家使用`===`。本例使用`==`是因为`<input>`输出的值为**字符串**，所以为了更直观的展示而使用`==`进行比较。
:::

## v-show

`v-show`指令跟`v-if`指令一样，都是用来条件展示元素。不过`v-show`没有`v-else`，只能单一的判断条件。而且`v-show`和`v-if`的渲染方式也有些区别，我们看下例子，进行如下修改：

```html
<h1 v-show="count < 0">count 小于0</h1>
<h1 v-show="count == 0">count 等于0</h1>
<h1 v-show="count > 0">count 大于0</h1>
```

首先我们先把每个判断条件都改为`v-show`，同时把最后一个判断条件改为`count > 0`，因为`v-show`不支持`v-else`，只有`v-if`才能写`v-else`！

进行了如上修改后，大家可能发现这两个例子看起来没有什么区别，比较之后的效果和之前的一样。但是本质上有很大的区别，大家可以打开 F12 控制台，然后选择`Elements`选项，观察`<h1>`标签的显示和隐藏。为了更直观的显示区别，大家可以复制一下如下代码：

```html
<template>
  <div>
    <h1 v-if="count1 < 0">count1 小于0</h1>
    <h1 v-else-if="count1==0">count1 等于0</h1>
    <h1 v-else>count1 大于0</h1>

    <input type="number" v-model="count1" />

    <h1 v-show="count2 < 0">count2 小于0</h1>
    <h1 v-show="count2==0">count2 等于0</h1>
    <h1 v-show="count2 > 0">count2 大于0</h1>

    <input type="number" v-model="count2" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count1: 0,
        count2: 0
      }
    }
  }
</script>

<style></style>
```

对应的**控制台 Elements 选项卡页面显示应该如下**：

```html
<div>
  <h1>count1 等于0</h1>
  <input type="number" />
  <h1 style="display: none;">count2 小于0</h1>
  <h1>count2 等于0</h1>
  <h1 style="display: none;">count2 大于0</h1>
  <input type="number" />
</div>
```

从上面可以看出，`v-if`指令控制的选项，隐藏的元素并没有在页面上显示出来。而`v-show`隐藏的元素是通过`css`属性`display: none`进行隐藏的。

> 不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS 属性 display。

所以，想给大家说的意思就是，`v-if`如果为真的情况下，**才会被渲染在页面上**，而`v-show`则是不管什么情况下，都会渲染，只不过会**通过 css 来进行隐藏**。

那么引申出来的就是性能问题。现在大家思考一下上面的例子，是使用`v-if`比较好呢，还是使用`v-show`比较好呢？答案是：使用`v-show`比较好。

因为我们在一个表单里面可以随意的输入任意数值，而只要输入的数值等于 0 或小于 0，对应的`<h1>`标签就需要从新计算，`v-show`只需要简单的切换一下 css 属性就可以切换了。而如果使用`v-if`的话，就需要切换来从新渲染元素了。

那么给出一个官网的话语就是，如果你需要频繁的切换的话，则使用`v-show`比较好；如果很少改变条件的话，使用`v-if`则比较好。

> 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

## 小例子

### 根据用户信息来给用户展示不同的界面

一般来说，在一个前后端分离的项目中，前端负责接收后端传过来的数据，然后展示页面。在 vue 中，一般都是使用`axios`来发送 http 请求。我们接收到数据后，进行渲染。（在最后会提及`axios`的使用）

假设有一个**会员中心**页面，只有当用户为会员时，才展示对应的信息，否则展示申请会员界面。

```html
<template>
  <div class="container">
    <!-- 会员展示用户信息 -->
    <div class="member">
      <p>姓名： {{userInfo.name}}</p>
      <p>年龄： {{userInfo.age}}</p>
      <p>性别： {{userInfo.sex === 1 ? '男' : '女'}}</p>
    </div>

    <!-- 非会员展示申请页面 -->
    <div class="noMember">
      <h1>你现在不是会员哦！</h1>
      <button>点击申请</button>
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
          sex: 1, // 1 男 2 女
          isMember: 0 // 0 为非会员 1 为会员
        }
      }
    }
  }
</script>

<style scoped lang=""></style>
```

我们进行如上初始化页面，`data`里面的`userInfo`就是我们请求到的数据，一般我们都会使用`1或2`等 数字来表示`是或否`，比如说，`性别sex`，我们不会接收为`sex: '男'`，只会接收到`sex: 1`这样的形式。

好，当我们请求到数据并写好页面后，就轮到判断是否是会员了。大家想一下，在页面初始化的时候，我们获取数据，接着进行判断，最后页面进行相对应的渲染。之后，渲染一次后，页面不会再切换了，只会展示一次，要么你是会员，就显示会员信息，要么你不是会员，则显示申请会员。 这么分析后，大家应该知道我们是使用`v-if`还是`v-show`了吧。我们把剩下的补上。

```html
<template>
  <div class="container">
    <div v-if="userInfo.isMember" class="member">
      <p>姓名： {{userInfo.name}}</p>
      <p>年龄： {{userInfo.age}}</p>
      <p>性别： {{userInfo.sex === 1 ? '男' : '女'}}</p>
    </div>
    <div v-else class="noMember">
      <h1>你现在不是会员哦！</h1>
      <button>点击申请</button>
    </div>
  </div>
</template>
```

我们选择使用`v-if`来进行判断，因为这里不需要频繁的切换状态。这里有一点需要说明一下，`v-if="userInfo.isMember"`这里我进行了简写，实际上为`v-if="userInfo.isMember === 1"`。
::: tip 提示
在 JavaScript 中，truthy（真值）指的是在布尔值上下文中，转换后的值为真的值。所有值都是真值，除非它们被定义为 假值（即除 false、0、""、null、undefined 和 NaN 以外皆为真值）。
:::

那我们换个思路来想，`if(1)`返回`true`，`if(0)`返回`false`，所以，`v-if="userInfo.isMember"`会自动判断，如果为`1`就显示，为`0`就隐藏。 所以最终表达式返回`0` ，则显示会员申请页面。

这里还有一点没有提及，就是**模板语法**可以使用表达式，因为官网有提及，比较简单，就没有细说。上例我们使用**三元表达式** 进行判断，如果为`1`说明性别为男，我们就展示为男，否则展示为女。

好了，我们已经学会了根据用户信息，来判断展示不同的界面。 我们在拓展一下，展示一下 vue 自动更新数据的魅力。在上例的基础上，给申请按钮添加一个真实的点击事件:

```html
<button @click="userInfo.isMember = 1">点击申请</button>
```

我们把**申请按钮**进行如下修改，现在你看不懂没关系，下面我们会介绍。我们只是简单的设置一个 click 事件，点击后把`isMember`的值设置为 1。

::: warning 注意
这里为了展示效果，只是在`data`里面把值改变了，在真实的项目是需要发送`http`请求的！
:::

现在，点击 `点击申请` 按钮后， 页面会马上展示 会员的界面，同时把申请界面进行隐藏。这里面的工作全是`vue`在背后进行的，我们只需要改变一下对应的值即可。
