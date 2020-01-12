<template>
  <div class="container">
    <input type="number" v-model.number="message" />
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
      message: ''
    }
  },
  methods: {}
}
</script>

<style scoped lang=""></style>