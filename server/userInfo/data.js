class UserData {
  constructor(username) {
    this.username = username;
    this.nickName = "无名氏";
    this.phoneNumber = "无";
    this.contactLists = [
      { name: "妈妈", phone: "12345678901", id: 0, classify: "family" },
      { name: "爸爸", phone: "98765432101", id: 1, classify: "family" },
      { name: "王甲", phone: "17652437976", id: 2, classify: "friend" },
      { name: "赵乙", phone: "98765375458", id: 3, classify: "friend" },
      { name: "李三", phone: "12345678901", id: 4, classify: "colleague" },
      { name: "朱六", phone: "98765432101", id: 5, classify: "colleague" },
      { name: "王麻子", phone: "17652437976", id: 6, classify: "colleague" }
    ];
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
