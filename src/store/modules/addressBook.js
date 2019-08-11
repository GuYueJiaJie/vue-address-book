import axios from "axios";

const state = {
  items: [],
  username: "",
  nickName: "",
  phoneNumber: "无",
  token: "",
  isLogining: "" // true表示已经登陆
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
    state.nickName = item.nickName;
    state.phoneNumber = item.phoneNumber;
  },
  setToken(state, token) {
    state.token = token;
  },
  changeLoginState(state, flag) {
    state.isLogining = flag;
  }
};

const actions = {
  async addItemAsync({ state, commit }, item) {
    try {
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
    } catch (err) {
      console.error(err);
    }
  },
  async deleteItemAsync({ state, commit }, item) {
    try {
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
    } catch (err) {
      console.error("删除联系人出错,错误信息为： ", err);
    }
  },
  async changeItemAsync({ state, commit }, item) {
    try {
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
    } catch (err) {
      console.error(err);
    }
  },
  async changePersonalInfoAsync({ state, commit }, item) {
    try {
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
    } catch (err) {
      console.error(err);
    }
  },
  initState({ commit }, item) {
    commit("setItems", item.personalData.contactLists);
    commit("changePersonalInfo", {
      nickName: item.personalData.nickName,
      phoneNumber: item.personalData.phoneNumber
    });
    commit("setUsername", item.username);
    commit("setToken", item.token);
    commit("changeLoginState", true);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
