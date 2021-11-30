import { createStore } from "vuex";

import elec from "./module/elec";
import steam from "./module/steam";
import main from "./module/main";

export default createStore({
  state: {
    factorys: Array,
    selectedFac: [],
    loadPage: sessionStorage.getItem("page"),
    steams: Array,
    steamsModalTitle: String,
    datas: Array,
    globalIP: window.globalIP,
    factoryID: ""
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    elec,
    steam,
    main
  }
});
