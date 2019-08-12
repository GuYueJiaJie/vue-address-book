import axios from "axios";
import router from "../router/router";

// 请求拦截，在每个请求前加上服务器地址
export default function axiosIntercept() {
  axios.interceptors.request.use(
    function(config) {
      config.url = "http://localhost:9999" + config.url;
      if (localStorage.getItem("token")) {
        config.headers.Authorization =
          "Bearer " + localStorage.getItem("token");
      }
      console.log("request", config);
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    function(response) {
      console.log("response", response);
      return response;
    },
    function(err) {
      console.log("响应拦截里的error", err.response);
      if (err.response && err.response.status === 401) {
        console.log("token过期,请重新登陆,删除token");
        localStorage.removeItem("token");
        // 因为重新登录会重新从服务器获取信息并重新设置vuex，所以在这里删除sessionStorage中的state
        sessionStorage.removeItem("state");
        alert("登录状态过期，请重新登陆");
        router.push({ name: "login" });
      }
      console.log("err", err.response);
      return Promise.reject(err);
    }
  );
}
