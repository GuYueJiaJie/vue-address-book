<template>
  <div class="container">
    <form autocomplete="off">
      <label for="username">
        <input
          type="text"
          class="input"
          name="username"
          id="username"
          placeholder="请输入用户名(5-20位)"
          v-model="userParams.username"
          size="20"
          @blur="verifyUsername"
          autocomplete="off"
          autofocus
        />
        <em v-show="showmessage.username">*用户名格式不对</em>
      </label>
      <label for="password">
        <input
          type="password"
          class="input"
          name="password"
          id="password"
          placeholder="请输入密码(5-20位)"
          size="20"
          v-model="userParams.password"
          @blur="verifyPawword"
          autocomplete="off"
        />
        <em v-show="showmessage.password">*密码格式不对</em>
      </label>
      <label for="confirm-password">
        <input
          class="input last"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="请确认密码"
          autocomplete="off"
          size="20"
          v-model="userParams.confirmPassword"
          @blur="verifyConfirmPassword"
          autofocus="off"
        />
        <em v-show="showmessage.confirmPassword">*两次密码不一致</em>
      </label>
      <button class="button register-button" @click.prevent="register">
        <span>注册</span>
        <!-- <i class="fa fa-spinner fa-spin"></i> -->
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userParams: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      showmessage: {
        username: false,
        password: false,
        confirmPassword: false
      }
    };
  },
  methods: {
    verifyUsername() {
      let isRight = /\w{5,20}/.test(this.userParams.username);
      this.showmessage.username = !isRight;
    },
    verifyPawword() {
      let isRight = /\w{5,20}/.test(this.userParams.password);
      this.showmessage.password = !isRight;
    },
    verifyConfirmPassword() {
      let isRight =
        this.userParams.password === this.userParams.confirmPassword;
      this.showmessage.confirmPassword = !isRight;
    },
    async register() {
      try {
        this.verifyUsername();
        this.verifyPawword();
        this.verifyConfirmPassword();
        if (
          !this.showmessage.username &&
          !this.showmessage.password &&
          !this.showmessage.confirmPassword
        ) {
          const result = await this.$http.post("/user/register", {
            username: this.userParams.username,
            password: this.userParams.password
          });
          if (result.data.success) {
            alert(result.data.message);
            this.$router.replace({ name: "login" });
          } else {
            alert(result.data.message);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/login.css";
.register-button {
  margin-top: 2rem;
}
</style>
