<template>
  <div class="main">
    <div class="header">
      <div class="title">简讯</div>
      <div class="header-right">
        <span>你好，{{nickName}}</span>
        <img src="./../../assets/logo.png" alt="这里是头像" />
      </div>
    </div>
    <!-- 下面这块其实可以拆成组件 -->
    <div class="side-bar">
      <ul>
        <li :class="{active: chooseLi===1}" @click="chooseLi=1">
          <router-link :to="{name: 'mailLists'}" replace class="side-bar-button">
            <i class="fa fa-address-book-o"></i>通讯录
          </router-link>
        </li>
        <li :class="{active: chooseLi===2}" @click="chooseLi=2">
          <router-link :to="{name: 'addInfo'}" replace class="side-bar-button">
            <i class="fa fa-reorder"></i>添加信息
          </router-link>
        </li>
        <li :class="{active: chooseLi===3}" @click="chooseLi=3">
          <router-link :to="{name: 'personal'}" replace class="side-bar-button">
            <i class="fa fa-user-o"></i>个人中心
          </router-link>
        </li>
      </ul>
      <div class="log-out" @click="logOut">
        <i class="fa fa-hand-o-right" aria-hidden="true"></i> 退出登录
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      chooseLi: 1
    };
  },
  computed: {
    ...mapState("addressBook", ["nickName"])
  },
  methods: {
    logOut() {
      this.$router.replace({ path: "/home/login" });
    }
  },
  mounted() {
    switch (this.$route.path) {
      case "/address-book/personal":
        this.chooseLi = 3;
        break;
      case "/address-book/addInfo":
        this.chooseLi = 2;
        break;
      default:
        this.chooseLi = 1;
        break;
    }
  }
};
</script>

<style scoped>
.main {
  height: 100vh;
}
.header {
  width: 100%;
  height: 12vh;
  background-image: url(../../../static/picture/homeBackground.png);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header .title {
  color: rgb(28, 130, 226);
  margin-left: 2%;
  font-size: 4rem;
}
.header .header-right {
  margin-right: 2%;
}
.header .header-right span {
  font-size: 2rem;
  margin-right: 1rem;
}
.header .header-right img {
  width: 4rem;
  border-radius: 2rem;
  border: 1px solid black;
}
.side-bar {
  position: fixed;
  width: 25%;
  left: 0;
  top: 12vh;
  height: 90%;
  background-color: #eee;
  padding: 3px;
  box-sizing: border-box;
}

.side-bar li {
  height: 5rem;
  line-height: 5rem;
  font-size: 2rem;
  width: 100%;
  background: #fff;
  margin: 0 0 3px 0;
  text-align: left;
  box-sizing: border-box;
  /* padding-left: 30px; */
}

.side-bar li a {
  opacity: 1;
  color: rgb(31, 29, 29);
  height: 100%;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  padding-left: 20px;
}
.side-bar li i {
  margin-right: 10px;
}

.side-bar li.active {
  background-color: #0f88eb;
}

.side-bar li.active a {
  color: white;
  opacity: 1;
}

.content {
  position: fixed;
  top: 12vh;
  right: 0;
  width: 75%;
  height: 90%;
}
.log-out {
  position: absolute;
  bottom: 5rem;
  right: 5rem;
  font-size: 2.5rem;
  cursor: pointer;
}
</style>
