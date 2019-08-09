import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home/Home.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home/login"
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      redirect: "/home/login",
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
    },
    {
      path: "/address-book",
      name: "addressBook",
      component: () => import("../components/AddressBook/AddressBook.vue"),
      redirect: "/address-book/mailLists",
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "mailLists",
          name: "mailLists",
          component: () => import("./../components/AddressBook/MailLists.vue"),
          meta: {
            requiresAuth: true // 表示该页面需要登录验证
          }
        },
        {
          path: "addInfo",
          name: "addInfo",
          component: () => import("../components/AddressBook/AddInfo.vue"),
          meta: {
            requiresAuth: true // 表示该页面需要登录验证
          }
        },
        {
          path: "personal",
          name: "personal",
          component: () => import("../components/AddressBook/Personal.vue"),
          meta: {
            requiresAuth: true // 表示该页面需要登录验证
          }
        }
      ]
    }
  ]
});

export default router;
