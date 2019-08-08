const UserData = require("./data");

const testusername1Data = new UserData("testusername1");
const testusername2Data = new UserData("testusername2");
const guyueData = new UserData("guyue");

const userInfo = {
  // 存储用户名和密码
  userInfos: [
    { username: "testusername1", password: "5211314" },
    { username: "testusername2", password: "5211314" },
    { username: "guyue", password: "123456" }
  ],
  // 存储用户和对应的数据信息
  userData: [
    { username: "testusername1", personalData: testusername1Data },
    { username: "testusername2", personalData: testusername2Data },
    { username: "guyue", personalData: guyueData }
  ],
  register({ username, password }) {
    let _this = this;
    let hasSameUser = _this.userInfos.some(item => item.username === username);
    if (hasSameUser) {
      // 已经存在相同的用户名，注册失败
      return false;
    } else {
      _this.userInfos.push({ username, password });
      console.log(`-----注册了新用户${username}-----`);
      let personalData = new UserData(username);
      _this.userData.push({
        username: username,
        personalData: personalData
      });
      return true;
    }
  },
  login({ username, password }) {
    let _this = this;
    let hasUser = _this.userInfos.some(
      item => item.username === username && item.password === password
    );
    let personalData = _this.userData.find(item => item.username === username)
      .personalData;
    if (hasUser) {
      console.log(`-----登录了新用户${username}-----`);
      return {
        success: true,
        personalData: personalData
      };
    } else {
      return {
        success: false
      };
    }
  },
  /*
   * @param userInfo Object
   */
  addContact({ username, name, phone, id, classify }) {
    const _this = this;
    let personalData = _this.userData.find(item => item.username === username)
      .personalData;
    personalData.addContact({
      name,
      phone,
      id,
      classify
    });
  },
  deleteContact({ username, id }) {
    const _this = this;
    let personalData = _this.userData.find(item => item.username === username)
      .personalData;
    personalData.deleteContact({ id });
  },
  changeContact({ username, name, phone, id }) {
    const _this = this;
    let personalData = _this.userData.find(item => item.username === username)
      .personalData;
    personalData.changeContact({ name, phone, id });
  },
  changePersonalInfo({ username, nickName, phoneNumber }) {
    const _this = this;
    let personalData = _this.userData.find(item => item.username === username)
      .personalData;
    personalData.changePersonalInfo({ nickName, phoneNumber });
  }
};

module.exports = userInfo;
