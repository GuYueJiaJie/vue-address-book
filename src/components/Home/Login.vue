<template>
  <div class="container">
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
          @click="loginFail = false"
        />
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
          @click="loginFail = false"
        />
      </label>
      <div class="loginFail" :class="{isActive: !loginFail}">用户名/密码错误</div>
      <button class="button" @click.prevent="login">
        登 录
        <i class="fa fa-spinner fa-spin" v-show="showIcon"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
      loginFailMessage: ""
    };
  },
  methods: {
    ...mapMutations("addressBook", [
      "setItems",
      "setUsername",
      "changePersonalInfo"
    ]),
    async login(e) {
      try {
        this.showIcon = true;
        // axios返回的是Promise
        let result = await this.$http.post("/user/login", {
          username: this.userParams.username,
          password: this.userParams.password
        });
        console.log(result);
        if (result.data.code === 1) {
          this.showIcon = false;
          this.setItems(result.data.personalData.contactLists);
          this.changePersonalInfo({
            nickName: result.data.personalData.nickName,
            phoneNumber: result.data.personalData.phoneNumber
          });
          this.setUsername(result.data.username);
          this.$router.replace({ path: "/address-book" });
        } else {
          this.showIcon = false;
          this.loginFail = true;
          this.loginFailMessage = result.data.message;
        }
      } catch (err) {
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
  margin: 10px auto;
  font-size: 2rem;
}
.isActive {
  visibility: hidden;
}
</style>
