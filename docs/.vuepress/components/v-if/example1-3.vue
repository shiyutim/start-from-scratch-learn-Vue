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