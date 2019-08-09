const Mock = require("mockjs");

class UserData {
  constructor(username) {
    this.username = username;
    this.nickName = username;
    this.phoneNumber = "无";
    this.contactLists = Mock.mock({
      "array|4-20": [
        {
          name: "@cname",
          phone: /^1[3456789]\d{9}$/,
          id: "@guid",
          "classify|1": ["friend", "colleague", "family"]
        }
      ]
    }).array;
  }

  addContact({ name, phone, classify, id }) {
    this.contactLists.push({
      name,
      phone,
      classify,
      id
    });
  }

  deleteContact({ id }) {
    let index = this.contactLists.findIndex(item => item.id === id);
    this.contactLists.splice(index, 1);
  }

  changeContact({ name, phone, id }) {
    let contact = this.contactLists.find(item => item.id === id);
    contact.name = name;
    contact.phone = phone;
  }

  changePersonalInfo({ nickName, phoneNumber }) {
    this.nickName = nickName;
    this.phoneNumber = phoneNumber;
  }
}

module.exports = UserData;
