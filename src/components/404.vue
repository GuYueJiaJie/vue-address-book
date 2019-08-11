<template>
  <div class="not-found">
    页面找不到了呀亲爱的，要不要试一下
    <a @click.prevent="backToHome">点我</a>
    回到主页呢？
  </div>
</template>

<script>
export default {
  methods: {
    backToHome() {
      this.$router.replace({ name: "addressBook" });
    }
  }
};
</script>

<style scoped>
.not-found {
  width: 100%;
  height: 100vh;
  text-align: center;
  line-height: 100vh;
  font-size: 5rem;
  color: red;
}
.not-found a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
