# 计算属性

[[toc]]

## 介绍

computed 是 Vue 提供用来处理复杂逻辑，可以像绑定普通属性一样绑定计算属性，并且计算属性的值会被缓存，除非依赖的值更新。

首先解释一下`像绑定普通属性一样绑定计算属性`：绑定普通属性的方式为在`data`里面进行绑定

```js
{{message}}

data () {
    return {
        message: 'hello Vue'
    }
}

```

绑定**计算属性**为：

```js

{{reverseMessage}}

computed: {
    // es6
    reverseMessage() {
        return this.message.split('').reverse().join('')
    }

    // es5
    reverseMessage: () {
        return this.message.split('').reverse().join('')
    }
}

```

可以看到，使用方式是相同的，都是使用模板语法`{{}}`。唯一不同的是，计算属性需要在`computed:{}`里面声明，并且是一个函数。

同时注意，计算属性是一个函数，想要函数返回一个值需要使用`return`关键字，如果不使用`return`，会发现这个计算属性不会返回任何值，需要注意。

计算属性的值也会被放入 Vue 实例里面，所以，你依然可以通过`this.reverseMessage`来访问对应的计算属性。

> 计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter

计算属性默认只有 getter，意思是我们访问计算属性的时候，默认只返回值，不可以设置值。

不过在需要时你也可以提供一个 setter，意思是可以设置一个 setter，可以改变计算属性的值。方式为：

```js
computed: {
    // es6
    reverseMessage: {
        get() {
            return this.message.split('').reverse().join('')
        },
        set(value) {
            this.message = this.message + value
        }
    }

    // es5
    reverseMessage: {
        get: function() {
            return this.message.split('').reverse().join('')
        },
        set: function(value) {
            this.message = this.message + value
        }
    }
}
```

可以看到，`reverseMessage`改变了声明方式，使用了`get(){}`和`set(){}`。

- `get`就是返回值，跟声明的时候一样。
- `set`是设置值，接收一个`value`，`value`为我们设置的值。比如说，`this.reverseMessage = '哈哈哈'`，那么`value`就是`哈哈哈`。

## 小例子

计算属性应用来说相对比较多，下面我们分别看几个例子来理解一下计算属性的应用。一般情况下，使用计算属性的`getter`即可。

### 商品排序

大家看购物网站的时候，一般都会有排序的功能，比如说，按照价格排序，按照销量排序等。下面我们就来实现以下这个功能。同时为了真实的体验，我提供了一个简单的商品数据列表，接口地址为：`https://easy-mock.com/mock/5e1aa4ff7f109b0caa4d2e26/learnvue/commodity`（接口为 mock 数据（模拟数据），意味着每次请求的数据结果都不一样）。

```html
<template>
  <div class="container">
    <section class="commodity">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div>
          <img :src="item.thumb" alt class="item_img" />
        </div>
        <div>
          <p class="title">{{item.title}}</p>
        </div>
        <div>
          <p>销量： {{item.sales}}</p>
          <p>价格： {{item.price}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    computed: {},
    methods: {
      initData() {
        axios
          .get(
            'https://easy-mock.com/mock/5e1aa4ff7f109b0caa4d2e26/learnvue/commodity'
          )
          .then(res => {
            let data = res.data.data
            console.log(data, 'data')
            this.list = data.list
          })
      }
    },
    created() {
      this.initData()
    },
    mounted() {},
    updated() {},
    destroyed() {}
  }
</script>

<style scoped>
  .commodity {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .item {
    margin: 10px;
    width: 200px;
  }
  .item_img {
    width: 100px;
    height: 100px;
  }
</style>
```

<computeds-example1-1 />

如果你复制上去后，发现页面渲染出来数据了，很棒是不是，这就是真实的接口+数据渲染方式。除了没有完善的错误处理和样式等:hugs:，不过暂时先不考虑。

为了大家更好的理解计算属性，我准备把以上内容复习一下。

- 获取数据

这里使用`axios`获取数据（axios 最后会讲怎么使用），并在`created`里面调用（`created/mounted`都可以）。可以看到函数里面使用了`let data = res.data.data`，因为嵌套的层级比较深，为了下面代码更好的使用，所以声明了一个`data`变量。如果你认为没必要的话，请看：

```js
// 不使用变量
this.list = res.data.data.list
if (!res.data.data.list.length) return
res.data.data.xxx // 操作其他值

// 使用变量
let data = res.data.data

this.list = data.list
if (!data.list) return
data.xxx // 操作其他值
```

- 渲染操作

`list`获取到对应的值后，`v-for`会自动进行渲染，`(item, index)` ，`item`代表被遍历的数组的每一项，即`list[0]/list[1]...list[n]`。`index`为当前遍历的索引值，也就是`0/1/n`。`:key=index`为`v-bind:key=index`，就是把当前的索引项的值绑定到`key`上。

此时，通过`item.xxx`就能获取到对应的数据了，那么我们通过`{{}}`模板语法渲染数据即可。

下面开始写具体的排序逻辑，我们选择写按照**价格排序**。具体的逻辑就是使用计算属性对每个商品的价格，使用`sort`进行排序，然后排序好了后，`v-for`会自动渲染。

首先我们先声明一个计算属性，叫`new_priceList`：

```js
computed: {
    new_priceList() {
        return this.list
    }
}

```

首先声明了一个计算属性`new_priceList`，不过目前我只写了返回`list`。那么意味着我们把`v-for`的`list`替换成`new_priceList`，页面还是正常渲染，不会有任何问题和报错。那么我们来试一下：

```html
<div class="item" v-for="(item, index) in new_priceList" :key="index"></div>
```

进行替换后，发现页面还是能够正常渲染的，这是我们使用计算属性的第一步。**学会这一步**，因为这可能是你以后经常使用计算属性的第一步。

::: tip 提示

记住，计算属性同样是响应式的，也就是说，如果`list`里面的内容变化了（[官网文档](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)有明确指出什么操作是响应式的），那么`new_priceList`里面的值同样会变化，如果`list`不变，那么`new_priceList`会被缓存起来，每次访问会直接返回。

:::

接下来就是排序的逻辑了，javaScript 提供了`sort`方法，用来排序。不过，大家可能知道，这个方法并不完美。所以我们需要改进一下：

```js
new_priceList() {
    return this.list.sort((a, b) => {
        return a.price - b.price
    })
}
```

`sort`方法可以接收一个函数，如果返回值为负数，说明第一个值应该在第二个值前面，即第一个值小于第二个值。所以，返回后的数组为升序。

<computeds-example1-2 />

可以看到，现在的新数组已经是排序后的数组了。不过，我们需要的智能排序，需要我们手动点击升序或降序。那么就需要一个**值**来控制一下，到底是升序还是降序。

```html
<div class="tools">
  <button @click="status = 1">升序</button>
  <button @click="status = 2">降序</button>
</div>
```

```js
data () {
    return {
      list: [],
      status: 0 // 默认为0 即默认排序 1 为升序 2 为降序
    }
}

computed: {
    new_priceList() {
      if (!this.status) return this.list
      return this.list.sort((a, b) => {
        return this.status === 1 ? a.price - b.price : b.price - a.price
      })
    }
  },

```

<computeds-example1-3 />

现在我们可以点击升序或降序按钮，可以控制商品的排序了。那么我们来解释一下最后一步的操作：

` 添加控制升序或降序的值

本例为`status`，为 0 说明默认排序，为 1 说明为升序，为 2 说明为降序。（这里的 0/1/2 是由自己定义的，你可以定义任何你想定义的值）

- 添加按钮来改变`status`的状态
  使用`v-on:click`来改变状态，升序按钮为`status = 1`，降序按钮为`status = 2`

- 计算属性逻辑

  - `if (!this.status) return this.list`

    这里表示，如果为 0 的情况下，就返回默认的`list`数组。`!this.status`表示取 0 的反值。

  - `return this.status === 1 ? a.price - b.price : b.price - a.price`

    这里使用三元表达式对当前的状态进行求值。如果为 1，则说明为**升序**，那么就返回`a.price - b.price`；如果为其他的值，就说明为**降序**，那么就返回`b.price - a.price`。

    **注意嗷**，`status`还有为 0 的情况，所以我们在进入函数之前就判断了，如果为 0，那么就返回默认的`list`数组，而不会走到三元表达式这里。

到这里基本就讲完了一个排序小例子，看完后，记得自己重新实践一下。如果还没有理解到位，那么请看下面的另一个小例子。

### 商品搜索

一般来说，搜索是通过 http 请求，来跟后台进行交互，然后只渲染后台返回过来筛选后的数据就可以了。不过，我们通过计算属性也可以做到筛选功能，而且更快，更高效。唯一的缺点就是，如果有分页，那么搜索只会搜索到当前页的数据，而通过 http 请求，后台会把所有关于搜索的数据发送过来。

商品搜索，那么需要通过商品标题进行搜索，返回标题中带有搜索关键字的商品就可以了。我们通过`includes`或者`indexOf`实现这个功能。还需要一个方法来遍历数组，并返回一个新数组，大家可以先思考一下使用哪个方法。

```html
<template>
  <div class="wrap">
    <div class="tools">
      <input type="text" v-model="search" />
    </div>
    <section class="commodity">
      <div class="item" v-for="(item, index) in new_titleList" :key="index">
        <div>
          <img :src="item.thumb" alt class="item_img" />
        </div>
        <div>
          <p>{{ item.title }}</p>
        </div>
        <div>
          <p>销量： {{ item.sales }}</p>
          <p>价格： {{ item.price }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        search: ''
      }
    },
    computed: {
      new_titleList() {
        return this.list
      }
    },
    methods: {
      initData() {
        axios
          .get(
            'https://easy-mock.com/mock/5e1aa4ff7f109b0caa4d2e26/learnvue/commodity'
          )
          .then(res => {
            let data = res.data.data
            console.log(data, 'data')
            this.list = data.list
          })
      }
    },
    created() {
      this.initData()
    },
    mounted() {},
    updated() {},
    destroyed() {}
  }
</script>

<style scoped>
  .commodity {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .item {
    margin: 10px;
    width: 200px;
  }
  .item_img {
    width: 100px;
    height: 100px;
  }
</style>
```

<computeds-example2-1 />

还记得`v-model`吗？本例就通过`v-model`把`input`绑定到变量`search`上。那么，我们输入的任何值，都在`search`变量上找到。

还是跟以前一样，第一步先初始化一个`new_titleList`的计算属性，表示这是一个新的数组。并把`v-for`里面的`list`替换为`new_titleList`。接着，我们就开始具体的搜索逻辑

```js
  computed: {
    new_titleList() {
      if (this.search === '') {
        return this.list
      }

      let arr = this.list.filter(item => {
        return item.title.indexOf(this.search) > -1
      })
      return arr
    }
  },
```

- `if (this.search === '') { return this.list }`

  这一步什么意思呢，它表示，如果搜索内容为空的话，就返回默认的数组。可以写成这种形式：

  ```js
  if (!this.search) return this.list
  ```

- 接下来就是遍历数组，然后返回标题中带有搜索关键字的商品了，这里我们选择`filter`，因为`filter`能够**返回一个新数组**。所以，`arr`就代表着过滤后的数组，返回它即可。下面我们来看具体的过滤逻辑

  ```js
  this.list.filter(item => {
    return item.title.includes(this.search)
  })
  ```

  - 上面的`item`同样代表 list 里面的每一项
  - `item.title`就是我们要过滤的标题了
  - `this.search`就是用户输入过滤的关键字
  - 我们通过 js 的`includes`方法对标题进行过滤，表示**如果标题中含有搜索关键字，那么就返回这一项**。这一步可以写成

    ```js
    return item.title.includes(this.search)
    ```

  - 还有一点，我们可以完善一下，就是`let arr`这一步，因为我们知道，`arr`里面存放的就是过滤后的数组，那么我们为何不省略这一步把`let arr`换成 `return`呢

经过以上分析，我们可以把上面代码优化成：

```js
  computed: {
    new_titleList() {
        if(!this.search )return this.list

        return this.list.filter(item => {
            return item.title.includes(this.search)
        })
    }
  },
```

相信大家经过以上两个小例子能够对计算属性有了一个深入的了解，计算属性应用非常广泛，大家应该重点掌握。
