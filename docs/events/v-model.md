# v-model

[[toc]]

## 介绍

v-model 用来绑定:

```html
- <input>
- <select>
- <textarea>
- components
```

前面三项都是基于表单，最后一项意思为 组件。关于组件的知识我们会在后面说明。

作用就是用来**创建双向数据绑定**，可以监听表单的输入，并自动更新数据。所以叫双向绑定。

一个最经典的例子就是：

```html
<template>
  <div class="container">
    <input type="text" v-model="message" />
    <p v-show="message">{{message}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'hello Vue~'
      }
    },
    methods: {}
  }
</script>

<style scoped lang=""></style>
```

<v-model-example1 />

随着改变 input 中的内容，下面的 p 标签里面的内容也会随之改变，这就是双向绑定。

在我们实际工作中，其应用最广泛的就是获取表单输入值，然后进行校验后，发送给后台。完整的例子将在最后给出。

### 修饰符

`v-on`可以使用修饰符，`v-model`同样可以使用修饰符，`v-model`可用的修饰符有以下三个：

- `.lazy`

默认情况下，每次监听到输入值后通过`input`事件，`v-model`都会自动同步更新，。而使用`.lazy`后，`v-model`会改为使用`change`事件，而且会变为失去焦点后，进行同步。

那么我们把上例中`<input>`的`v-model`添加上`.lazy`修饰符后：

```html
<input type="text" v-model.lazy="message" />
```

<v-model-example2 />

此刻可以看到，当你在改变 input 表单中的值时，不会马上同步更新，而当你鼠标点击别处（即失去焦点）时，下面的内容才会随之改变。

- `.number`

`.number`修饰符可以让用户输入的值转化为数值类型。同时需要注意，`.number`修饰符需要搭配`<input>`标签的 `type="number"`属性一起使用！

使用场景为：输入手机号 / 身份证号 等。

<v-model-example3 />

- `.trim`

`.trim`可以自动过滤用户输入的首尾空白字符。

使用场景为： 大部分表单验证部分都可使用。比如说，用户表单里输入

```
`    123456`
```

那么我们获取到的值是：一堆空白+123456，那么使用`.trim`后，我们获取到的值为`123456`。

## 小例子

### 一个简单的登录页

需要用户填写账号和密码，然后点击登陆按钮进行登陆。我们需要在登陆按钮这里进行一些逻辑判断，先做一层过滤，然后再发送给后台。

首先初始化一个模板：

```html
<template>
  <div class="container">
    <input type="number" />
    <input type="text" />
    <button>登录</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang=""></style>
```

然后添加表单和登陆按钮，初始化好 data 中用来存储账号和密码的变量，并使用`v-on:click`调用`login`函数:

```html
<!-- 账号默认为手机号 -->
<input type="number" v-model.number="nickname" />
<input type="text" v-model.trim="password" />
<button @click="login">登录</button>

<script>
  export default {
      data() {
        return {
          nickname: '', // 账号
          password: '' // 密码
        }
      },
      methods: {
          // es6
          login() {}

          // es5
          login: function() {}
      }
  }
</script>
```

账号为手机号，所以我们使用`.number`修饰符来进行过滤；密码我们使用`.trim`过滤空白字符；登陆按钮通过`click`调用`login`函数，剩下的就是验证输入值，并发送给后台了：

```html
<script>
  export default {
    data() {
      return {
        nickname: '', // 账号
        password: '' // 密码
      }
    },
    methods: {
      // es6
      login() {
        let params = {
          nickname: this.nickname,
          password: this.password
        }
        // 这里应该使用正则表达式验证手机号，为了简化操作，只验证位数
        if (params.nickname.toString().length !== 11) {
          return window.alert('请输入正确的手机号')
        }

        if (params.password === '') {
          return window.alert('请输入密码')
        }

        //   axios.post('xxx', params).then()   这里进行发送数据
        window.alert('登陆成功！')
      },

      // es5   里面内容大部分相同，不再做展示
      login: function() {}
    }
  }
</script>
```

<v-model-example4 />

至此，我们就完成了一个简单的校验工作，如果验证通过后，通过 axios 发送给后台即可，然后根据返回过来的状态来显示登陆成功或失败。
