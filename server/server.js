const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("./CrossOrigin/cors");
const userInfo = require("./userInfo/userInfo");
const tokenCheck = require("./api/token");

const app = express();

app.use(cookieParser());

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

app.use(bodyParser.json());

app.post("/user/login", function(req, res) {
  let loginInfo = userInfo.login(req.body);
  if (loginInfo.success) {
    res.status(200).json({
      code: 1,
      message: "登陆成功",
      personalData: loginInfo.personalData,
      username: req.body.username,
      token: tokenCheck.setToken(req.body)
    });
  } else {
    res.status(200).json({
      code: 0,
      message: "用户名/密码错误"
    });
  }
});

app.post("/user/register", function(req, res) {
  if (userInfo.register(req.body)) {
    res.json({
      success: true,
      message: "注册成功"
    });
  } else {
    res.json({
      success: false,
      message: "注册失败"
    });
  }
});

// 登录状态验证，因为登录注册不需要验证，所以从这登录注册之后开始
app.use(function(req, res, next) {
  let token =
    req.get("Authorization") ||
    req.body.token ||
    req.cookies.token ||
    req.get("x-access-token");
  // 判断有没有token,存在就判断是否过期
  if (token) {
    let { passTime, payload } = tokenCheck.judgeTokenIsOverdue(token);
    if (!passTime) {
      console.log("token没有过期");
      req.userPayload = payload;
      req.userToken = token;
      next();
    } else {
      // 401表示用户视图未经授权访问一个受密码保护的页面，应答中会包含一个WWW-Authenticate头
      console.log("token过期");
      res.status(401).end();
    }
  } else {
    console.log("没有token");
    res.status(401).end();
  }
});

app.get("/api/getInfo", function(req, res) {
  let username = req.userPayload.username;
  let personalData = userInfo.searchPersonalInfo({ username });
  res.status(200).json({
    personalData: personalData,
    username: username,
    token: req.userToken
  });
});

app.post("/api/addContact", function(req, res) {
  let addInfo = req.body;
  console.log(`${addInfo.username}请求增加一个联系人${addInfo.name}`);
  userInfo.addContact(addInfo);
  res.json({
    success: true,
    message: "添加成功"
  });
});

app.post("/api/deleteContact", function(req, res) {
  // 删除一个联系人需要用户的username和联系人id
  let deleteInfo = req.body;
  console.log(
    `${deleteInfo.username}请求删除一个联系人，联系人id为${deleteInfo.id}`
  );
  userInfo.deleteContact(deleteInfo);
  res.json({
    success: true,
    message: "删除成功"
  });
});

app.post("/api/changeContact", function(req, res) {
  let changeInfo = req.body;
  console.log(
    `${changeInfo.username}请求修改一个联系人，联系人id为${changeInfo.id}`
  );
  userInfo.changeContact(changeInfo);
  res.json({
    success: true,
    message: "修改成功"
  });
});

app.post("/api/changePersonalInfo", function(req, res) {
  let changePersonalInfo = req.body;
  console.log(
    `${changePersonalInfo.username}请求修改个人信息，修改个人昵称为${
      changePersonalInfo.nickName
    }，修改个人手机号为${changePersonalInfo.phoneNumber}`
  );
  userInfo.changePersonalInfo(changePersonalInfo);
  res.json({
    success: true,
    message: "修改个人信息成功"
  });
});

app.listen(9999);

console.log("The server is running at port 9999");
