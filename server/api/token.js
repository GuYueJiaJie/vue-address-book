const tokenCheck = {
  setToken({ username, password, avoidLogin }) {
    if (avoidLogin) {
      return `${username}-${password}-${Date.now() + 60 * 1000 * 60 * 24 * 7}`;
    } else {
      return `${username}-${password}-${Date.now() + 60 * 1000 * 10}`;
    }
  },
  judgeTokenIsOverdue(token) {
    let deadline = token.split("-")[2];
    console.log("deadline", deadline);
    if (Date.now() > deadline) {
      // 表示已经过期
      return true;
    } else {
      // 表示还未过期
      return false;
    }
  }
};

module.exports = tokenCheck;
