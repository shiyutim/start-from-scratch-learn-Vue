<template>
  <div class="container">
    <div v-if="userInfo.isMember" class="member">
      <p>姓名： {{userInfo.name}}</p>
      <p>年龄： {{userInfo.age}}</p>
      <p>性别： {{userInfo.sex === 1 ? '男' : '女'}}</p>
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
        sex: 1, // 1 男 2 女
        isMember: 0 // 0 为非会员 1 为会员
      }
    }
  }
}
</script>

<style scoped></style>