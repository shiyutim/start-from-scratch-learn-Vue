<template>
  <div class="wrap">
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
      list: []
    }
  },
  computed: {
    new_priceList() {
      return this.list
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
    this.initData()
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
