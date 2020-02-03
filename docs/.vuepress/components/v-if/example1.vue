<template>
  <div>
    <h1 v-if="count < 0">count 小于0</h1>
    <h1 v-else-if="count == 0">count 等于0</h1>
    <h1 v-else>count 大于0</h1>

    <input type="number" v-model="count" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>