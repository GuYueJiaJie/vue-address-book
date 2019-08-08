module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        let userInfos = [
          { username: "jianxun1", password: "123456" },
          { username: "jianxun2", password: "123456" }
        ];
        // let tokenKey = "jianxun";
        app.post("/api/login", function(req, res) {
          // console.log("用户请求登录");
          // const { username } = req.query;
          // let userInfo = userInfos.filter(x => x.username === username);
          // if (userInfo.length === 1) {
          //   // code为1表示登陆成功，code为0表示登陆失败
          //   res.json({
          //     message: "登陆成功",
          //     code: 1,
          //     token:
          //       tokenKey + "-" + username + "-" + (Date.now() + 10 * 60 * 100)
          //   });
          // } else {
          //   res.json({
          //     code: 0,
          //     message: "登录失败"
          //   });
          // }
          res.json({
            code: 1,
            message: "登录成功"
          });
        });
        // app.post("/api/contact", function (req, res) {

        // })
      }
    }
  }
};
