<template>
  <div id="container">
    <h1>简 讯</h1>
    <h2>一个梦想翻身的咸鱼</h2>
    <div class="link-list">
      <router-link to="/home/login" class="link">登录</router-link>
      <router-link to="/home/register">注册</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
@import "../../assets/css/home.css";
</style>
