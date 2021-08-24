import { createStore } from "vuex";

export default createStore({
  state: {
    factorys: Array,
    selectedFac: [],
    loadPage: sessionStorage.getItem("page"),
    steams: Array
  },
  mutations: {},
  actions: {},
  modules: {}
});
