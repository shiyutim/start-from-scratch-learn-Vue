<template>
  <div class="container">
    <section>
      <span
        class="item"
        :style="{color: hoverIndex === index ? '#3498db' : ''}"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = -1"
        v-for="(i, index) in 5"
      >标签{{index+1}}</span>
      <!-- :class="{active: activeIndex === index}" -->
      <!-- @click="activeIndex = index" -->
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoverIndex: -1
      //   activeIndex: 0
    }
  },
  methods: {}
}
</script>

<style scoped>
.item {
  margin-right: 7px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}
.active {
  border-bottom: 2px solid #e74c3c;
}
</style>