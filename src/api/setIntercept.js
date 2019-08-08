import axios from "axios";

// 请求拦截，在每个请求前加上服务器地址
export default function axiosIntercept() {
  axios.interceptors.request.use(function(config) {
    config.url = "http://localhost:9999" + config.url;
    console.log(config);
    return config;
  });
}
