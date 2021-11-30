import axios from "axios";
import { computed } from "vue";
import moment from "moment";

const steam = {
  namespaced: true,
  state: {
    steamStatus: [],
    count: {
      trapType: [],
      count: []
    },
    diagnosticData: {
      inOut: [],
      time: [],
      site_name: [],
      point_Name: []
    },
    errorDiagnosticData: {
      inOut: [],
      time: [],
      site_name: [],
      point_Name: []
    },
    diagnosticTableData: {
      name: [],
      status: []
    },
    alarm: []
  },
  getters: {
    getCount: (state) => {
      const data = {
        trapType: JSON.parse(JSON.stringify(state.count.trapType)),
        count: JSON.parse(JSON.stringify(state.count.count))
      };
      return data;
    },
    diagnosticData: (state) => {
      const data = {
        inOut: JSON.parse(JSON.stringify(state.diagnosticData.inOut)),
        time: JSON.parse(JSON.stringify(state.diagnosticData.time)),
        site_name: JSON.parse(JSON.stringify(state.diagnosticData.site_name)),
        point_Name: JSON.parse(JSON.stringify(state.diagnosticData.point_Name))
      };
      return data;
    },
    errorDiagnosticData: (state) => {
      const data = {
        inOut: JSON.parse(JSON.stringify(state.errorDiagnosticData.inOut)),
        time: JSON.parse(JSON.stringify(state.errorDiagnosticData.time)),
        site_name: JSON.parse(JSON.stringify(state.errorDiagnosticData.site_name)),
        point_Name: JSON.parse(JSON.stringify(state.errorDiagnosticData.point_Name))
      };
      return data;
    }
  },
  mutations: {
    steamTrapStatus(state, data) {
      const datas = [];
      for(let i = 0; i < data.length; i++) {
        const item = {
          devId: data[i].devId,
          inTemp: data[i].inTemp,
          outTemp: data[i].outTemp,
          pointName: data[i].pointName,
          trapType: computed(() => {
            let j = 1;
            if(data[i].trapType.indexOf("플로트")) j = 3;
            if(data[i].trapType.indexOf("버켓")) j = 1;
            if(data[i].trapType.indexOf("디스크")) j = 2;
            return j;
          })
        };
          datas.push(item);
      }
      state.steamStatus = datas;
    },
    steamCount(state, { trapType, count }) {
      state.count = {
        trapType: [],
        count: []
      };
      state.count.trapType = trapType;
      state.count.count = count;
    },
    diagnosticChartData(state, datas) {
      state.diagnosticData = {
        inOut: [],
        time: [],
        site_name: [],
        point_Name: []
      };
      for(let i = 0; i < datas.length; i++) {
        state.diagnosticData.inOut.push([datas[i].in_temp, datas[i].out_temp]);
        state.diagnosticData.time.push(datas[i].time);
        state.diagnosticData.site_name.push(datas[i].site_name);
        state.diagnosticData.point_Name.push(datas[i].point_name);
      }
    },
    errorDiagnosticChartData(state, datas) {
      state.errorDiagnosticData = {
        inOut: [],
        time: [],
        site_name: [],
        point_Name: []
      };
      for(let i = 0; i < datas.length; i++) {
        state.errorDiagnosticData.inOut.push([datas[i].in_temp, datas[i].out_temp]);
        state.errorDiagnosticData.time.push(datas[i].time);
        state.errorDiagnosticData.site_name.push(datas[i].site_name);
        state.errorDiagnosticData.point_Name.push(datas[i].point_name);
      }
    },
    diagnosticTableData(state, datas) {
      state.diagnosticTableData = {
        name: [],
        status: []
      };

      for(let i = 0; i < datas.length; i++) {
        state.diagnosticTableData.name.push(datas[i].point_name);
        state.diagnosticTableData.status.push(datas[i].anomaly_labels);
      }
    },
    getAlarm(state, datas) {
      state.alarm = datas;
    }
  },
  actions: {
    getSteamData({ rootState, commit }) {
      const siteid = rootState.factoryID;
      axios.post(`${rootState.globalIP}/sub/steam/trap-condition`, { siteid }).then((data) => {
        commit("steamTrapStatus", data.data);
      });
      axios.post(`${rootState.globalIP}/sub/steam/steam_dev_count`, { siteid }).then((data) => {
        const datas = data.data;
        const known = [];
        const unknown = [];
        for(let i = 0; i < datas.length; i++) {
          if(datas[i].trapType === "Unknown") {
           unknown.push(datas[i]);
          }else{
            known.push(datas[i]);
          }
        }
        const dataArr = [
          ...known,
          ...unknown
        ];

        const trapType = [];
        const count = [];

        for(let i = 0; i < dataArr.length; i++) {
          trapType.push(dataArr[i].trapType);
          count.push(dataArr[i].count);
          }
        commit("steamCount", { trapType, count });
      });

      axios.post(`${rootState.globalIP}/sub/steam/diagnostic_plane`, { siteid }).then((data) => {
        const datas = data.data;
        const normalData = [];
        const errorData = [];
        for(let i = 0; i < datas.length; i++) {
          if(!datas[i].anomaly_labels) {
            normalData.push(datas[i]);
          }else{
            errorData.push(datas[i]);
          }
        }
        commit("diagnosticChartData", normalData);
        commit("errorDiagnosticChartData", errorData);
        commit("diagnosticTableData", datas);
      });

      axios.post(`${rootState.globalIP}/main/alarm`, { siteid }).then((data) => {
        const datas = data.data;
        const dataArr = [];

        for(let i = 0; i < datas.length; i++) {
          const api_contents = datas[i].api_contents.split(",");
          const alarm = {
            title: datas[i].api_title,
            time: moment(new Date(datas[i].time * 1000)).format("YYYY년 MM월 DD일 HH분 mm분"),
            devId: api_contents[1].split("_")[1]
          };
          dataArr.push(alarm);
        }
        commit("getAlarm", dataArr);
      });
    }
  }
  };

export default steam;
