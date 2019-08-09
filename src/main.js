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
  /* if (to.meta.requiresAuth) {
    // 如果需要进入的页面需要登录验证
    // TODO:判断是否登录，如果已经登录则正常跳转
    // 否则跳转到登录界面
    console.log("导航守卫有登录验证功能待完善");
  } */
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
