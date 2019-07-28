<template>
  <div>
    <h1>简 信</h1>
    <h2>一个梦醒翻身的咸鱼</h2>
    <div>
      <router-link to="/home/login">登录</router-link>
      <router-link to="/home/register">注册</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
@import "../../assets/css/home.css";
</style>
