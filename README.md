# 前言

学习一门语言一个框架只看不写是永远学不会的，自己动手去写永远都是最好的学习方式，没有之一。

这个项目用来练手，熟练一下自己对 vue 的使用。

这里是参照 [windlany](https://github.com/windlany) 小姐姐的项目来改的，在原有项目的基础上也增加了一些小功能，因为自己临时下手也不知道写啥好，所以就在 github 上找到了这个项目，决定自己也动手实现一个简单的通讯录，也算是加深一下自己对 vue 全家桶的认识。

学习 vue 最好的地方：[官方文档，没有之一。](https://cn.vuejs.org/v2/guide/installation.html)

# 技术栈

**Vue 2.6.x** + **vue cli 3.x** + **vuex** + **vue-router**.

顺便说一句，项目其实很小，没有必要上 vuex，但是出于练手的目的，还是有啥上啥，一切为了熟练为主。

# 编码习惯

修改了 ESLint 配置：

1. **`quotes: [1, "double"]`**：我喜欢用双引号。

2. **`semi: [1, "always", { omitLastInOneLineBlock: true }]`**：我喜欢让语句后面加分号，但忽略花括号在同一行（内容也就在同一行了）的语句块中的最后一个分号

# 运行项目

1. 克隆项目

   ```
   git clone git@github.com:GuYueJiaJie/vue-address-book.git
   ```

2. 安装依赖

   ```
   npm install
   ```

3. 运行项目，默认部署在 localhost:8080，在浏览器打开对应地址即可

   ```
   npm run serve
   ```
