<template>
  <div class="wrap">
    <div class="tools">
      <button @click="status = 1">升序</button>
      <button @click="status = 2">降序</button>
    </div>
    <section class="commodity">
      <div class="item" v-for="(item, index) in new_priceList" :key="index">
        <div>
          <img :src="item.thumb" alt class="item_img" />
        </div>
        <div>
          <p>{{ item.title }}</p>
        </div>
        <div>
          <p>销量： {{ item.sales }}</p>
          <p>价格： {{ item.price }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
      status: 0 // 默认为0 即默认排序 1 为升序 2 为降序
    }
  },
  computed: {
    new_priceList() {
      if (!this.status) return this.list
      return this.list.sort((a, b) => {
        return this.status === 1 ? a.price - b.price : b.price - a.price
      })
    }
  },
  methods: {
    initData() {
      axios
        .get(
          'https://easy-mock.com/mock/5e1aa4ff7f109b0caa4d2e26/learnvue/commodity'
        )
        .then(res => {
          let data = res.data.data
          console.log(data, 'data')
          this.list = data.list
        })
    }
  },
  created() {
    setTimeout(() => {
      this.initData()
    }, 1000)
  },
  mounted() {},
  updated() {},
  destroyed() {}
}
</script>

<style scoped>
.commodity {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.item {
  margin: 10px;
  width: 200px;
}
.item_img {
  width: 100px;
  height: 100px;
}
</style>
