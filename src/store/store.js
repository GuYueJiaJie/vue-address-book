import Vue from "vue";
import Vuex from "vuex";
import addressBook from "./modules/addressBook";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    addressBook
  }
});
