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
    } else {
      console.log("sessionStorage中没有state");
      this.$http
        .get("/api/getInfo")
        .then(res => {
          this.$store.dispatch("addressBook/initState", res.data);
        })
        .catch(err => console.error(err));
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
