# 前言

学习一门语言一个框架只看不写是永远学不会的，自己动手去写永远都是最好的学习方式，没有之一。

这个项目用来练手，熟练一下自己对 vue 的使用。

学习 vue 最好的地方：[官方文档，没有之一。](https://cn.vuejs.org/v2/guide/installation.html)

# 技术栈

**Vue 2.6.x** + **vue cli 3.x** + **vuex** + **vue-router** + **axios** + **mockjs**.

顺便说一句，项目其实很小，没有必要上 vuex，但是出于练手的目的，还是有啥上啥，一切为了熟练为主。

# 编码习惯

修改了 ESLint 配置：

1. **`quotes: [1, "double"]`**：我喜欢用双引号。

2. **`semi: [1, "always", { omitLastInOneLineBlock: true }]`**：我喜欢让语句后面加分号，但忽略花括号在同一行（内容也就在同一行了）的语句块中的最后一个分号   
3. **`"space-before-function-paren": ["off", "always"]`**：关掉了函数名前的空格

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
4. 打开新的命令行，安装服务的依赖，并启动服务

    ```
    cd server
    npm install
    node server.js 或者 npm run serve
    ```
# 项目介绍   

这是一个练习项目，可能会有不完善的地方，欢迎指出。  

这是一个实现了与后台交互的有关通讯录的项目，实现了登录、注册、退出登录、鉴权处理、增加联系人、修改联系人、删除联系人、七天免登陆等功能。

与后台的通信使用的是axios，组件之间的传值用的是vueX，路由用的是vue-router中的hash模式，后台是我自己完成的，比较简单，用的是express，初始联系人数据是用mockjs生成的随机数据，鉴权处理用的是jwt-simple中间件。   

项目比较简陋，没有使用数据库，把用户的信息都维护在一个对象里，用户的账号密码用一个对象数组保存，用户的个人信息用一个数组保存。

## 功能实现

**具体功能**实现比较简单，大概就是：   

首页就是一个登录注册页面，如果已经有账号的话就可以直接进行登录，没有账号的话就要进行注册。这里就会遇到第一个问题，就是跨域问题（下一节第一个问题），跨域问题用的是CORS去解决。   

当用户注册成功后进行登录，登录的话，可以选择是否是七天之内免登录，如果是首次登录，后台数据会利用mockjs生成4-20个随机的联系人数据（生成方式见下面第二个问题），然后这里会涉及到一个鉴权问题（下面第三个问题），鉴权问题是用JWT去进行处理的。   

登录进系统之后可以修改个人信息，也可以增加、删除、修改联系人信息，项目内的传值的话，用的是vueX,每次有数据操作的话会向后台请求，同时会用mutation修改vueX内的state数据，但是用vuex的话有一个问题就是页面刷新，vuex的数据重置的问题，这里我使用的是beforeunload事件配合sessionStorage去处理的（下面第四个问题）。   

最后就是退出登录，退出登录的话就清除localStorage中的token和sessionStorage中的state数据，如果再次登录的话，后台就会根据用户信息来返回对应的在后台存储的信息数据，同时存储到VueX中。

如果用户在未登录的情况下，直接访问某个需要登录权限的页面，会直接跳转到登录界面，这里是对vue-router中的路由加了一些权限控制（下面第五个问题）。

功能不多，文笔也不好，大概就是这些内容，纯手撸的，不会的就去网上搜，然后自己写，要比看别人的视频写项目效果好了不止一倍。

感叹一句：github真是个好地方，以后可以多看点别人的东西，自己手撸一下，一定收获颇丰。

## 遇到的问题和解决方式

### 1. **跨域问题**   

因为项目开启的端口一般都在8080，但服务器监听的端口设置的是9999，因此要处理跨域问题，这里是CORS问题，CORS跨域前端的部分基本上都是浏览器在处理，不用做什么特殊的操作，所以主要的任务都在服务端。

这里关于前台请求地址，我在前端代码里请求的都是相对路径，所以设置了axios的请求拦截，给每个请求加上了服务器地址。   

服务器处理CORS要分为两种情况，简单请求和非简单请求。

**简单请求**比较好处理，简单请求浏览器会在头信息中加入一个`Origin`字段，然后直接发出`CORS`请求，所以服务器只需要判断这个`Origin`在不在自己允许请求的范围内即可。   

如果Origin不在许可的范围内，这里我返回的是一个`403 Forbidden`状态码，当然也可以返回一个正常的状态码，浏览器如果发现返回响应里没有`Access-Control-Allow-Origin`头字段的话，就会报错表示

```
Access to XMLHttpRequest at 'http://localhost:9999/user/login' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

然后抛出一个错误，错误会被`XMLHttpRequest`的`onerror`回调函数捕获。  

如果origin在许可范围内的话,服务器返回的响应里会多几个头字段信息：`Access-Control-Allow-Origin`（必须）、`Access-Control-Allow-Credentials`（可选）和`Access-Control-Expose-Headers`。

**非简单请求**会在正式通信之前发出一次预检请求，这是由浏览器自动进行的，不需要进行前端操作，预检请求会带上`Access-Control-Request-Method`和`Access-Control-Request-Headers`，这两个字段都是必须，表示CORS请求会用到哪种方法和额外发送哪些头信息。  

服务器收到预检请求后，如果允许跨域请求，就会做出回应，可能会有`Access-Control-Allow-Origin`、`Access-Control-Allow-Credentials`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`和`Access-Control-Max-Age`几个头字段。

如果否定了预检请求，这里我返回的也是403状态码，也可以返回一个正常请求，浏览器会进行认定，如果没有通过预检请求，浏览器会报错。

具体关于CORS跨域问题请参考：[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html).

```javascript
// server.js
app.use(function(req, res, next) {
  // 处理来自非简单请求的预检请求
  if (req.method.toLowerCase() === "options") {
    let origin = req.get("Origin");
    let customHeader = req.get("Access-Control-Request-Headers");
    if (cors.isTrustyOrigin(origin)) {
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": customHeader,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Max-Age": 600
      });
      res.end();
    } else {
      res.status(403).end();
    }
  } else {
    let origin = req.get("Origin");
    if (cors.isTrustyOrigin(origin)) {
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": true
      });
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  }
});
```

### 2. Mockjs  

`package.json`中已经引入了`mockjs`，直接安装依赖即可，具体使用方法可以参照[`Mock.js`文档](http://mockjs.com/)。

```javascript
// 生成4-20个随机的联系人数据
Mock.mock({
  "array|4-20": [
    {
      name: "@cname",
      phone: /^1[3456789]\d{9}$/,
      id: "@guid",
      "classify|1": ["friend", "colleague", "family"]
    }
  ]
})
```

### 3. JWT认证   
关于JWT的介绍可以参考阮老师的[JWT介绍](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)，理解一下JWT的作用、组成和整个流程，这个项目中使用了`jwt-simple`中间件来生成和解码token，登录注册路由不需要鉴权。
1. 首次登录的时候，后台判断用户的账号密码正确之后，根据用户的id，用户名、定义好的秘钥和过期时间等信息生成一个token，返回给前端。   
2. 前端拿到返回的token，存进localStorage和vueX里。   
3. 然后在每次请求后台接口的时候，带上token发送给服务端。这里用axios拦截请求，判断localStorage里有没有token，如果有的话就在`Authorization`头里带上token，这里使用的是`Bearer`类型的token，所以前面要加上`Bearer`。   
4. 服务器对token解码，判断有效性，并判断token有没有过期（没有勾选七天免登陆情况下，本项目的过期时间为五分钟），如果无效或者过期则返回`401 Unauthorized`状态码；有效且没有过期就正常返回200状态码。   
5. axios对响应进行拦截，如果响应码为401，则跳转到登录界面。

axios拦截在[`/src/api/setIntercept.js`](src/api/setIntercept.js)文件，token验证在[`/server/api/token.js`](server/api/token.js)文件。

### 4. VueX刷新数据重置问题   

刷新数据会重置是因为js代码是运行在内存的，代码中所有的变量，函数也都是保存在内存中的。刷新页面，以前申请的内存释放，重新加载脚本代码，变量重新赋值，所以要解决这个问题就要考虑把想存储的数据存储在外部。这个项目里我是在页面刷新前将它存进`sessionStorage`，但只有在已经登陆的情况下刷新才会存储，然后在`created`钩子函数中读取。  

文件在[`App.vue`。](src/App.vue)

```javascript
created() {
    const _this = this;
    if (sessionStorage.getItem("state")) {
      this.$store.replaceState(JSON.parse(sessionStorage.getItem("state")));
    }
    window.addEventListener("beforeunload", event => {
      if (this.$store.state.addressBook.isLogining) {
        console.log(this.$store.state.addressBook.isLogining);
        sessionStorage.setItem("state", JSON.stringify(_this.$store.state));
      }
    });
  }
```

### 5. 权限控制   

对于一个系统而言，是存在有些页面是需要登录才能访问的，比如联系人列表界面；也存在一些页眉无需登录即可访问，比如登录注册页面。  

所以就需要对路由做权限控制，在定义路由的时候，对于需要登录权限才能访问的路由组件配置一个meta属性，内部标记`requiresAuth`（这个字段可以自定义），然后设置全局路由守卫对要进入的路由进行判断即可。  

```javascript
// main.js
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ name: "login", replace: true });
    }
  } else {
    next();
  }
});
```