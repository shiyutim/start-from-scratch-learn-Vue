<template>
  <div>
    <button :class="color" v-text="content" @click="btnClick"></button>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      color: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    },
    methods: {
        btnClick() {
            let result = this.getColor()
            console.log('result', result)
            this.$emit('update:color', result)
        },
        getColor() {
            console.time('color')
            let value = ['success', 'error', 'primary', 'warning']
            let index = Math.random()
            let l = value.length
            let color = this.color
            index = Math.round((l - 1 ) *index)
            // if(value[index] === color) {
            //     return this.getColor()
            // }
            do {
                index = Math.round((l - 1 ) * Math.random())
            }
            while(color === value[index])

            if(index > 3) index = 3
            if(index < 0) index = 0
            console.timeEnd('color')
            return value[index]
        }
    }
  }
</script>

<style scoped>
  button {
    border: none;
    padding: 15px 20px;
    border-radius: 3px;
    cursor: pointer;
  }
  button:hover {
      opacity: .9;
  }
  .success {
    color: #fff;
    background: #27ae60;
  }
  .error {
    color: #fff;
    background: #c0392b;
  }
  .primary {
    color: #fff;
    background: #3498db;
  }
  .warning {
    color: #fff;
    background: #d35400;
  }
</style>