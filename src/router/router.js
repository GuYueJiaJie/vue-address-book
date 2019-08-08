import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home/Home.vue";
import MailLists from "./../components/AddressBook/MailLists.vue";
import Personal from "../components/AddressBook/Personal.vue";
import AddInfo from "../components/AddressBook/AddInfo.vue";

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
          component: MailLists
        },
        {
          path: "addInfo",
          name: "addInfo",
          component: AddInfo
        },
        {
          path: "personal",
          name: "personal",
          component: Personal
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  /* if (to.meta.requiresAuth) {
    // 如果需要进入的页面需要登录验证
    // TODO:判断是否登录，如果已经登录则正常跳转
    // 否则跳转到登录界面
    console.log("导航守卫有登录验证功能待完善");
  } */
  next();
});

export default router;
