<template>
  <div class="container">
    <div class="loginFail" :class="{isActive: !loginFail}">用户名/密码错误</div>
    <form class="login-form">
      <label for="username">
        <input
          class="input"
          type="text"
          name="username"
          id="username"
          placeholder="请输入用户名(5-20位)"
          required
          size="20"
          v-model="userParams.username"
          @click="clickUsername"
        />
        <em v-show="showmessage.username">*用户名格式不对</em>
      </label>
      <label for="password">
        <input
          class="input last"
          type="password"
          name="password"
          id="password"
          placeholder="请输入密码(5-20位)"
          required
          size="20"
          v-model="userParams.password"
          @click="clickPassword"
        />
        <em v-show="showmessage.password">*密码格式不对</em>
      </label>
      <label for="avoidLogin" class="avoidLogin">
        <input type="checkbox" name="avoidLogin" id="avoidLogin" v-model="avoidLogin" />
        七天之内免登录
      </label>
      <button class="button" @click.prevent="login">
        登 录
        <i class="fa fa-spinner fa-spin" v-show="showIcon"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: function() {
    return {
      showIcon: false,
      userParams: {
        username: "",
        password: ""
      },
      loginFail: false,
      loginFailMessage: "",
      showmessage: {
        username: false,
        password: false
      },
      avoidLogin: false
    };
  },
  methods: {
    ...mapActions("addressBook", ["initState"]),
    verifyUsername() {
      let isRight = /\w{5,20}/.test(this.userParams.username);
      this.showmessage.username = !isRight;
    },
    verifyPawword() {
      let isRight = /\w{5,20}/.test(this.userParams.password);
      this.showmessage.password = !isRight;
    },
    clickUsername() {
      this.loginFail = false;
      this.loginFail = false;
      this.showmessage.username = false;
    },
    clickPassword() {
      this.loginFail = false;
      this.showmessage.password = false;
    },
    async login(e) {
      try {
        this.showIcon = true;
        this.verifyUsername();
        this.verifyPawword();
        if (!this.showmessage.username && !this.showmessage.password) {
          // axios返回的是Promise
          let result = await this.$http.post("/user/login", {
            username: this.userParams.username,
            password: this.userParams.password,
            avoidLogin: this.avoidLogin
          });
          if (result.data.code === 1) {
            this.showIcon = false;
            this.initState(result.data);
            localStorage.setItem("token", result.data.token);
            this.$router.replace({ path: "/address-book" });
          } else {
            this.showIcon = false;
            this.loginFail = true;
            this.loginFailMessage = result.data.message;
          }
        } else {
          this.showIcon = false;
        }
      } catch (err) {
        console.log("捕获到了错误");
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/login.css";
.loginFail {
  color: red;
  font-size: 2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  /* top: -3.5rem; */
}
.isActive {
  visibility: hidden;
}
.avoidLogin {
  margin: 1rem auto;
}
</style>
