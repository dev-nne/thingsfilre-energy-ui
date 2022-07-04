import axios from "axios";
import moment from "moment";
import elecData from "@/components/data/elec.json";

const elec = {
  namespaced: true,
  state: {
    usage: {
      future_cost: "",
      future_kwh: "",
      now_cost: "",
      now_kwh: ""
    },
    monthlyData: {
      time: [],
      real_value: [],
      predict_value: [],
      sum_value: [],
      limit: [],
      sum_real: [],
      sum_predict: []
    },
    dailyData: {
      time: [],
      real_value: [],
      predict_value: [],
      limit: []
    },
    powerData: [],
    errorDiagnosticData: {
      inOut: [],
      time: [],
      site_name: [],
      point_Name: []
    },
    diagnosticData: {
      inOut: [],
      time: [],
      site_name: [],
      point_Name: []
    },
    selectPowerPlantDetail: "",
    ppModalSelectKey: "today",
    ppModalSelectOptions: [
        {
        value: "today",
        label: "오늘"
        },
        {
          value: "yesterday",
          label: "어제"
          },
        {
        value: "last_week",
        label: "지난 주"
        },
        {
          value: "last_month",
          label: "지난 달"
          },
        {
        value: "last_7days",
        label: "최근 7일"
        },
        {
          value: "last_30days",
          label: "최근 30일"
        }],
        elecModalChartData: []
  },
  getters: {
    lineElec: (state) => {
      const data = {
        time: JSON.parse(JSON.stringify(state.monthlyData.time)),
        real_value: JSON.parse(JSON.stringify(state.monthlyData.real_value)),
        predict_value: JSON.parse(JSON.stringify(state.monthlyData.predict_value)),
        sum_real: JSON.parse(JSON.stringify(state.monthlyData.sum_real)),
        sum_predict: JSON.parse(JSON.stringify(state.monthlyData.sum_predict)),
        sum_value: JSON.parse(JSON.stringify(state.monthlyData.sum_value)),
        limit: JSON.parse(JSON.stringify(state.monthlyData.limit))
      };
      return data;
    },
    dailyData: (state) => {
      const data = {
        time: JSON.parse(JSON.stringify(state.dailyData.time)),
        real_value: JSON.parse(JSON.stringify(state.dailyData.real_value)),
        predict_value: JSON.parse(JSON.stringify(state.dailyData.predict_value)),
        limit: JSON.parse(JSON.stringify(state.dailyData.limit))
      };
      return data;
    }
  },
  mutations: {
    getUsageChargeData(state, data) {
      state.usage = {
        future_cost: "",
      future_kwh: "",
      now_cost: "",
      now_kwh: ""
      };

      state.usage.future_cost = data.future_cost;
      state.usage.future_kwh = data.future_kwh;
      state.usage.now_cost = data.now_cost;
      state.usage.now_kwh = data.now_kwh;
    },
    monthlyElecChart(state, data) {
      state.monthlyData = {
        time: [],
        real_value: [],
        predict_value: [],
        sum_value: [],
        limit: [],
        sum_real: [],
        sum_predict: []
      };
      for(let i = 0; i < data.length; i++) {
        const date = new Date(data[i].time * 1000);

        state.monthlyData.time.push(`${date.getMonth() + 1}/${date.getDate()}`);

        state.monthlyData.real_value.push(data[i].real_value);
        state.monthlyData.predict_value.push(data[i].predict_value);
        state.monthlyData.sum_value.push(data[i].sum_value);
        state.monthlyData.limit.push(data[i].limit);
      }
      const num = state.monthlyData.real_value.indexOf(null);
      for(let i = 0; i < data.length; i++) {
        if(i <= num) {
          state.monthlyData.sum_real.push(data[i].sum_value);
        }else{
          state.monthlyData.sum_real.push(null);
        }
      }

      for(let i = 0; i < data.length; i++) {
        if(i >= num) {
          state.monthlyData.sum_predict.push(data[i].sum_value);
        }else{
          state.monthlyData.sum_predict.push(null);
        }
      }
    },
    dailyElecChart(state, data) {
      state.dailyData = {
        time: [],
        real_value: [],
        predict_value: [],
        limit: []
      };
      for(let i = 0; i < data.length; i++) {
        const date = new Date(data[i].time * 1000);

        state.dailyData.time.push(`${date.getHours() + 1 < 10 ? `0${date.getHours() + 1}` : date.getHours() + 1}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`);

        state.dailyData.real_value.push(data[i].real_value);
        state.dailyData.predict_value.push(data[i].predict_value);
        state.dailyData.limit.push(data[i].limit);
      }
    },
    powerPlantDetails(state, data) {
      const datas = [];
      for(let i = 0; i < data.length; i++) {
        const item = {
          devId: data[i].devId,
          femsTime: data[i].femsTime,
          maximum_wh: Math.floor(data[i].maximum_wh).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          pointName: data[i].pointName,
          total_wh: data[i].total_wh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          percent: Math.floor(data[i].percent * 100)
        };
          datas.push(item);
      }
      state.powerData = datas;
    },
    getAlarm(state, datas) {
      state.alarm = datas;
    },
    errorDiagnosticChartData(state, datas) {
      state.errorDiagnosticData = {
        inOut: [],
        time: [],
        site_name: [],
        point_Name: []
      };
      for(let i = 0; i < datas.length; i++) {
        state.errorDiagnosticData.inOut.push([datas[i].act_kwh, datas[i].react_kwh]);
        state.errorDiagnosticData.time.push(moment.unix(datas[i].time * 0.001).format("YYYY-MM-DD HH:mm:ss"));
        state.errorDiagnosticData.site_name.push(datas[i].site_name);
        state.errorDiagnosticData.point_Name.push(datas[i].point_name);
      }
    },
    diagnosticChartData(state, datas) {
      state.diagnosticData = {
        inOut: [],
        time: [],
        site_name: [],
        point_Name: []
      };

      for(let i = 0; i < datas.length; i++) {
        state.diagnosticData.inOut.push([datas[i].act_kwh, datas[i].react_kwh]);
        state.diagnosticData.time.push(moment.unix(datas[i].time * 0.001).format("YYYY-MM-DD HH:mm:ss"));
        state.diagnosticData.site_name.push(datas[i].site_name);
        state.diagnosticData.point_Name.push(datas[i].point_name);
      }
    },
    getElecModalChartData(state, datas) {
      state.elecModalChartData = datas;
    }
  },
  actions: {
    getElecData({ rootState, commit }) {
      if(rootState.isLocal) {
        commit("getUsageChargeData", elecData["usage-charge"][0]);
        commit("monthlyElecChart", elecData["monthly-predict"]);
        commit("dailyElecChart", elecData["daily-predict"]);
        commit("powerPlantDetails", elecData.power_plant_details);
        const alarmData = elecData.alarm;
        const dataArr = [];

        for(let i = 0; i < alarmData.length; i++) {
          const api_contents = alarmData[i].api_contents.split(",");
          const alarm = {
            title: alarmData[i].api_title,
            time: moment(new Date(alarmData[i].time * 1000)).format("YYYY년 MM월 DD일 HH분 mm분"),
            devId: api_contents[1].split("_")[1]
          };
          dataArr.push(alarm);
        }
        commit("getAlarm", dataArr, { root: true });

        const diagnostic = elecData.diagnostic_plane;
        const normalData = [];
        const errorData = [];
        for(let i = 0; i < diagnostic.length; i++) {
          if(!diagnostic[i].anomaly_labels) {
            normalData.push(diagnostic[i]);
          }else{
            errorData.push(diagnostic[i]);
          }
        }
        commit("diagnosticChartData", normalData);
        commit("errorDiagnosticChartData", errorData);

        return;
      }
      const siteid = rootState.factoryID;

      axios.post(`${rootState.globalIP}/sub/elec/usage-charge`, { siteid }).then((data) => {
        const datas = data.data[0];
        commit("getUsageChargeData", datas);
      });

      axios.post(`${rootState.globalIP}/sub/elec/monthly-predict`, { siteid }).then((data) => {
        commit("monthlyElecChart", data.data);
      });

      axios.post(`${rootState.globalIP}/sub/elec/daily-predict`, { siteid }).then((data) => {
        commit("dailyElecChart", data.data);
      });

      axios.post(`${rootState.globalIP}/sub/elec/power_plant_details`, { siteid }).then((data) => {
        commit("powerPlantDetails", data.data);
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
        commit("getAlarm", dataArr, { root: true });
      });

      axios.post(`${rootState.globalIP}/sub/elec/diagnostic_plane`, { siteid }).then((data) => {
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
      });
    },
    getPowerPlantDetailsModal({ rootState, commit }) {
      if(rootState.isLocal) {
        return;
      }
      const siteid = rootState.factoryID;

      axios.post(`${rootState.globalIP}/sub/elec/usage-charge`, { siteid }).then((data) => {
        const datas = data.data[0];
        commit("getUsageChargeData", datas);
      });
    },
    getPPDetailModalData({ rootState, state, commit }) {
      if(rootState.isLocal) {
        commit("getElecModalChartData", elecData.pp_trend_graph);
        return;
      }
    const siteid = rootState.factoryID;
    axios.post(`${rootState.globalIP}/sub/pp_trend_graph`, {
      siteid, search_period: state.ppModalSelectKey
        }).then((res) => {
        commit("getElecModalChartData", res.data);
          });
    },
    getPPcsvDownload({ rootState, state }) {
      if(rootState.isLocal) {
        return;
      }
      const siteid = rootState.factoryID;
      const time = moment().format("YYMMDD");

      axios.post(`${rootState.globalIP}/sub/pp_trend_csv`, {
      siteid, search_period: state.ppModalSelectKey
        }).then((res) => {
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          const fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", `${time}_${siteid}.csv`);
          document.body.appendChild(fileLink);

          fileLink.click();
        });
      }
    }
};

export default elec;
