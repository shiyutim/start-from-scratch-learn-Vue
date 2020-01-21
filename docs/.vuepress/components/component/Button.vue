<template>
  <div class='container'>
      <button :class="color" v-text="content" @click="$emit('btn-handler')"></button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  },
  components: {
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
  // type your function
    
  },
  created () {
    
  },
  mounted () {
    
  },
  updated () {
    
  },
  destroyed () {
    
  },
  filters: {   
  },
}
</script>

<style scoped>
  button {
    border: none;
  }
  .success {
    color: #fff;
    background: forestgreen;
  }
  .error {
    color: #fff;
    background: #ff0000;
  }
  .primary {
    color: #fff;
    background: blue;
  }
  .warning {
    color: #fff;
    background: yellow;
  }
</style>
