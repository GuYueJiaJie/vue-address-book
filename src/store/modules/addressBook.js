import axios from "axios";

const state = {
  items: [],
  username: "",
  nickName: "",
  phoneNumber: "无"
};

const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  setUsername(state, username) {
    state.username = username;
  },
  changeItem(state, item) {
    let temp = state.items.find(x => x.id === item.id);
    temp.name = item.name;
    temp.phone = item.phone;
  },
  deleteItem(state, item) {
    let temp = state.items.findIndex(x => x.id === item.id);
    state.items.splice(temp, 1);
  },
  addItem(state, item) {
    state.items.push(item);
  },
  changePersonalInfo(state, item) {
    console.log("修改了个人信息");
    state.nickName = item.nickName;
    state.phoneNumber = item.phoneNumber;
  }
};

const actions = {
  async addItemAsync({ state, commit }, item) {
    const result = await axios.post("/api/addContact", {
      username: state.username,
      ...item
    });
    console.log("result", result);
    if (result.data.success) {
      commit("addItem", item);
    } else {
      console.error("添加联系人出错");
    }
  },
  async deleteItemAsync({ state, commit }, item) {
    const result = await axios.post("/api/deleteContact", {
      username: state.username,
      id: item.id
    });
    console.log("delete result", result);
    if (result.data.success) {
      commit("deleteItem", item);
    } else {
      console.error("删除联系人出错");
    }
  },
  async changeItemAsync({ state, commit }, item) {
    const result = await axios.post("/api/changeContact", {
      username: state.username,
      ...item
    });
    console.log("change result", result);
    if (result.data.success) {
      commit("changeItem", item);
    } else {
      console.error("删除联系人出错");
    }
  },
  async changePersonalInfoAsync({ state, commit }, item) {
    const result = await axios.post("/api/changePersonalInfo", {
      username: state.username,
      ...item
    });
    console.log("change personal info", result);
    if (result.data.success) {
      commit("changePersonalInfo", item);
    } else {
      console.error("修改个人信息出错");
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
