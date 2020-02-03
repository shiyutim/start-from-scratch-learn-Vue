# axios

[[toc]]

## 介绍

axios 是 Vue 官方推荐的 http 库，所以，我们都是通过 axios 进行发送 http 请求。axios 有[中文版官方文档](http://www.axios-js.com/docs/)，不过这个文档很不中文，如果你英文不好，可以看这个[中文版文档](https://www.kancloud.cn/yunye/axios/234845)。

## 使用

使用方式有两种，一种方式通过`npm install axios`进行安装包。另一种方式通过 cdn 进行使用`<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`。

如果你使用 vue-cli 构建的项目，输入`npm install axios -S`安装包进`package.json`文件的`dependencies`中。`dependencies`为我们开发和上线后需要使用的包。`devDependencies`为我们开发时需要使用的包。

使用 axios 发送 get 和 post 请求非常简单，不过，再次之前你可能需要了解一下`Promise`。如果你不了解也没关系，只需要照着格式写就可以了，不过，`Promise`是非常重要的异步处理方式，必须要会的哦。

同时，axios 的中文文档真是简单明了，所以应该都能看懂，其实就是照葫芦画瓢，唯一有问题的地方可能就是**跨域处理**了吧。

## get 请求

发送 get 请求

```js
import axios from 'axios'

axios
  .get('/user?ID=12345') // {1}
  .then(function(response) {
    // {2}
    console.log(response)
  })
  .catch(function(error) {
    // {3}
    console.log(error)
  })
```

使用`axios.get`发送 get 请求，`{1}`处为 url，`{2}`处为成功的回调，`{3}`为错误的回调

如果要传递参数，可以添加可选的`params`：

```js
import axios from 'axios'

axios
  .get('/user', {
    params: {
      Id: 12345
    }
  })
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })
```

## post 请求

发送 post 请求

```js
import axios from 'axios'

axios
  .post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })
```
