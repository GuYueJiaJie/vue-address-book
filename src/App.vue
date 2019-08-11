<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const _this = this;
    if (sessionStorage.getItem("state")) {
      this.$store.replaceState(JSON.parse(sessionStorage.getItem("state")));
    }
    window.addEventListener("beforeunload", event => {
      if (this.$store.state.addressBook.isLogining) {
        console.log(this.$store.state.addressBook.isLogining);
        sessionStorage.setItem("state", JSON.stringify(_this.$store.state));
      }
    });
  }
};
</script>
