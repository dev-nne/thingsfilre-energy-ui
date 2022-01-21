import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import elec from "./module/elec";
import steam from "./module/steam";
import main from "./module/main";

const dataState = createPersistedState({
  paths: ["elec.powerData", "elec.diagnosticData", "elec.errorDiagnosticData", "steam.steamStatus", "steam.diagnosticData", "steam.errorDiagnosticData", "steam.diagnosticTableData", "factoryID", "loadPage", "selectedFac"],
	storage: window.sessionStorage
});

export default createStore({
  state: {
    selectedFac: [],
    loadPage: "home",
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
  },
  plugins: [dataState]
});
