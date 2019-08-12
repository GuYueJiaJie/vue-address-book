import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import axios from "axios";
import axiosIntercept from "./api/setIntercept";

Vue.config.productionTip = false;
axiosIntercept();
Vue.prototype.$http = axios;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ name: "login", replace: true });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
