<template>
  <div class="container" style="padding: 20px 0;">
    <input type="number" v-model.number="nickname" />
    <!-- 账号默认为手机号 -->
    <input type="text" v-model.trim="password" />
    <button @click="login">登录</button>
  </div>
</template>

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
      if (params.nickname.toString().length !== 11) {
        return window.alert('请输入正确的手机号')
      }

      if (params.password === '') {
        return window.alert('请输入密码')
      }

      //   axios.post('xxx', params).then()   这里进行发送数据
      window.alert('登陆成功！')
    },

    // es5
    login2: function() {
      var params = {
        nickname: this.nickname,
        password: this.password
      }
      if (params.nickname.toString().length !== 11) {
        return window.alert('请输入正确的手机号')
      }

      if (params.passowrd === '') {
        return window.alert('请输入密码')
      }

      //   axios.post('xxx', params).then()   这里进行发送数据
      window.alert('登陆成功！')
    }
  }
}
</script>

<style scoped lang="">
</style>