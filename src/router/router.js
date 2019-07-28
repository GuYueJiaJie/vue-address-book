import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true // 表示该页面需要登录验证
      },
      children: [
        {
          path: "register",
          name: "register",
          component: () => import("../components/Home/Register.vue") // 路由懒加载
        },
        {
          path: "login",
          name: "login",
          component: () => import("../components/Home/Login.vue")
        }
      ]
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
  ]
});
