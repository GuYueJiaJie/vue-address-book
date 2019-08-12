const jwt = require("jwt-simple");

const secret = "whateveritis";

const tokenCheck = {
  setToken({ username, avoidLogin }) {
    if (avoidLogin) {
      return jwt.encode({
        username: username,
        // jwt-simple验证的时候，是将Date.now与exp*1000作对比，所以此处应该设置为秒
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
      });
    } else {
      // 没有点击7天免登录则过期时间为5分钟
      return jwt.encode(
        {
          username: username,
          exp: Math.floor(Date.now() / 1000) + 60 * 5
        },
        secret
      );
    }
  },
  judgeTokenIsOverdue(token) {
    let realToken = token.split(" ")[1];
    try {
      // decode没有抛出错误就表示合法性验证通过
      console.log("jwt验证登录状态");
      jwt.decode(realToken, secret);
      return false;
    } catch (err) {
      // 表示已经过期
      return true;
    }
  }
};

module.exports = tokenCheck;
