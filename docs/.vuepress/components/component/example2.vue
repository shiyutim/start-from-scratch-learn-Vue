<template>
  <div>
        <component-Button2 :color="color" content="change color" @btn-handler="changeColor" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        color: 'primary'
      }
    },
    methods: {
      changeColor(event) {
        console.log(event)
        this.color = event
      }
    }
  }
</script>

<style scoped>

</style>