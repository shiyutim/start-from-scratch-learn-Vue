<template>
  <div class="container">
    <input type="text" v-model.lazy="message" />
    <p v-show="message">{{message}}</p>
    <p v-show="!message">
      <br />
    </p>
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