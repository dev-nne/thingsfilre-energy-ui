import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import elec from "./module/elec";
import steam from "./module/steam";
import main from "./module/main";

const dataState = createPersistedState({
  paths: ["elec.powerData", "elec.diagnosticData", "elec.errorDiagnosticData", "steam.steamStatus", "steam.diagnosticData", "steam.errorDiagnosticData", "steam.diagnosticTableData", "factoryID", "loadPage", "selectedFac", "isLogin", "userId", "factoryTitle"],
	storage: window.sessionStorage
});

export default createStore({
  state: {
    selectedFac: "",
    loadPage: "home",
    steams: Array,
    steamsModalTitle: String,
    datas: Array,
    globalIP: window.globalIP,
    factoryID: "",
    alarm: [],
    isLogin: false,
    userId: "",
    factoryTitle: "",
    isLocal: true
  },
  mutations: {
    getAlarm(state, payload) {
      state.alarm = payload;
    },
    resetState(state) {
      state.selectedFac = "";
      state.loadPage = "home";
      state.steams = Array;
      state.datas = Array;
      state.factoryID = "";
      state.isLogin = false;
      state.userId = "";
      state.factoryTitle = "";
    }
  },
  actions: {
  },
  modules: {
    elec,
    steam,
    main
  },
  plugins: [dataState]
});
