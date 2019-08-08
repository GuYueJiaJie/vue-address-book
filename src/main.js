import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/store.js";
import axios from "axios";
import axiosIntercept from "./api/setIntercept";

Vue.config.productionTip = false;
axiosIntercept();
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
