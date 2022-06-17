import axios from "axios";
import { computed } from "vue";
import moment from "moment";
import "url-search-params-polyfill";


const steam = {
  namespaced: true,
  state: {
    steamStatusCall: 0,
    trapTab: 1,
    steamStatus: [],
    elecStatus: [],
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
    status: {
      normal: 0,
      anomaly: 0,
      diagnosis: 0
    },
    mapkey: 1,
    steamMapbox: [
      {
        id: 401,
        select: false,
        title: "V-13번",
        key: 401,
        status: "정상"
      },
      {
        id: 402,
        select: false,
        title: "V-14번",
        key: 402,
        status: "정상"
      },
      {
        id: 403,
        select: false,
        title: "V-20번",
        key: 403,
        status: "정상"
      },
      {
        id: 404,
        select: false,
        title: "V-25번",
        key: 404,
        status: "정상"
      },
      {
        id: 405,
        select: false,
        title: "V-30번",
        key: 405,
        status: "정상"
      },
      {
        id: 406,
        select: false,
        title: "V-31번",
        key: 415,
        status: "정상"
      },
      {
        id: 407,
        select: false,
        title: "VR-01번",
        key: 410,
        status: "정상"
      },
      {
        id: 408,
        select: false,
        title: "VR-06번",
        key: 414,
        status: "정상"
      },
      {
        id: 409,
        select: false,
        title: "VR-07번",
        key: 411,
        status: "정상"
      },
      {
        id: 410,
        select: false,
        title: "VR-08번",
        key: 412,
        status: "정상"
      },
      {
        id: 411,
        select: false,
        title: "염색기 11번",
        key: 409,
        status: "정상"
      },
      {
        id: 412,
        select: false,
        title: "염색기 16번",
        key: 408,
        status: "정상"
      },
      {
        id: 413,
        select: false,
        title: "염색기 17번",
        key: 407,
        status: "정상"
      },
      {
        id: 414,
        select: false,
        title: "염색기 19번",
        key: 406,
        status: "정상"
      },
      {
        id: 415,
        select: false,
        title: "텀블러 01번",
        key: 413,
        status: "정상"
      }
    ],
    elecMapbox: [
      {
        id: "MT0000000023",
        select: false,
        title: "냉수펌프(부스터)",
        key: "mt1"
      },
      {
        id: "MT0000000009",
        select: false,
        title: "온수펌프(부스터)",
        key: "mt2"
      },
      {
        id: "MT0000000013",
        select: false,
        title: "콤퓨레샤",
        key: "mt3"
      },
      {
        id: "MT0000000019",
        select: false,
        title: "염색기#23",
        key: "mt4"
      },
      {
        id: "MT0000000014",
        select: false,
        title: "염색기#25",
        key: "mt5"
      },
      {
        id: "MT0000000005",
        select: false,
        title: "염색기#26",
        key: "mt6"
      },
      {
        id: "MT0000000011",
        select: false,
        title: "염색기#28",
        key: "mt7"
      },
      {
        id: "MT0000000003",
        select: false,
        title: "염색기#9",
        key: "mt8"
      },
      {
        id: "MT0000000012",
        select: false,
        title: "염색기#8",
        key: "mt9"
      },
      {
        id: "MT0000000007",
        select: false,
        title: "염색기#5",
        key: "mt10"
      },
      {
        id: "MT0000000016",
        select: false,
        title: "염색기#7",
        key: "mt11"
      },
      {
        id: "MT0000000024",
        select: false,
        title: "염색기#2",
        key: "mt12"
      },
      {
        id: "MT0000000020",
        select: false,
        title: "염색기#1",
        key: "mt13"
      },
      {
        id: "MT0000000001",
        select: false,
        title: "염색기#18",
        key: "mt14"
      },
      {
        id: "MT0000000010",
        select: false,
        title: "염색기#17",
        key: "mt15"
      },
      {
        id: "MT0000000022",
        select: false,
        title: "염색기#16",
        key: "mt16"
      },
      {
        id: "MT0000000018",
        select: false,
        title: "워싱덤블집진기",
        key: "mt17"
      },
      {
        id: "MT0000000002",
        select: false,
        title: "텐더5집진기",
        key: "mt18"
      },
      {
        id: "MT0000000025",
        select: false,
        title: "건조기",
        key: "mt19"
      },
      {
        id: "MT0000000017",
        select: false,
        title: "텐더1집진기",
        key: "mt20"
      },
      {
        id: "MT0000000006",
        select: false,
        title: "텐더2집진기",
        key: "mt21"
      },
      {
        id: "MT0000000008",
        select: false,
        title: "텐더3집진기",
        key: "mt22"
      }

    ],
    selectFEMSDetail: "",
    FEMSModalSelectKey: "today",
    FEMSModalSelectOptions: [
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
        tempModalChartData: [],
        searchType: "temp"
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
    resetSelect(state) {
      state.steamStatus.map((list) => list.selected = false);
      state.elecStatus.map((list) => list.selected = false);
      state.steamMapbox.map((list) => list.select = false);
      state.elecMapbox.map((list) => list.select = false);
    },
    steamTrapStatus(state, data) {
      const datas = [];
      for(let i = 0; i < data.length; i++) {
        let status = "정상";
        if(data[i].status === 1.0) {
          status = "이상";
        }
        if(data[i].status === 2.0) {
          status = "고장";
        }
        const item = {
          devId: data[i].devId,
          inTemp: data[i].inTemp,
          outTemp: data[i].outTemp,
          pointName: data[i].pointName,
          status,
          trapType: computed(() => {
            let j = 1;
            if(data[i].trapType.indexOf("플로트")) j = 3;
            if(data[i].trapType.indexOf("버켓")) j = 1;
            if(data[i].trapType.indexOf("디스크")) j = 2;
            return j;
          }),
          id: computed(() => {
                    if(i === 0) return 0;
                    if(i === 1) return 1;
                    return 2;
        }),
        selected: false
        };
          datas.push(item);
        }
        state.steamStatusCall++;
      state.steamStatus = datas;

      // 맵 상태
       const statusWarn = state.steamStatus.filter((list) => list.status === "이상");
       const statusErr = state.steamStatus.filter((list) => list.status === "고장");

       for(let i = 0; i < statusWarn.length; i++) {
        state.steamMapbox.filter((list) => {
          if(list.id === statusWarn[i].devId) {
            list.status = "이상";
          }
        });
      }

        for(let i = 0; i < statusErr.length; i++) {
          state.steamMapbox.filter((list) => {
            if(list.id === statusWarn[i].devId) {
              list.status = "고장";
            }
          });
       }
    },
    elecTrapStatus(state, data) {
      const datas = [];
      for(let i = 0; i < data.length; i++) {
        const item = {
          devId: data[i].devId,
          total_wh: data[i].total_wh,
          maximum_wh: data[i].maximum_wh,
          pointName: data[i].pointName,
          percent: Math.floor((data[i].percent * 100).toFixed(0)),
          femsTime: data[i].femsTime,
          selected: false
        };
          datas.push(item);
        }
      state.elecStatus = datas;
    },
    steamTrapAlign(state) {
      const selectItem = state.steamStatus.filter((list, i) => list.selected);
      const unSelectItem = state.steamStatus.filter((list, i) => !list.selected);
      const itemArr = selectItem.concat(unSelectItem);
      state.steamStatus = itemArr;
    },
    steamTapSelect(state, value) {
      state.steamStatus.filter((list) => {
        list.selected = false;
        if(list.devId === value) {
          list.selected = true;
        }
     });
    },
    steamTrapMapSelect(state, value) {
      state.steamMapbox.filter((list) => {
        list.select = false;
        if(list.id === value) {
          list.select = true;
        }
      });
    },
    elecTrapAlign(state) {
      const selectItem = state.elecStatus.filter((list, i) => list.selected);
      const unSelectItem = state.elecStatus.filter((list, i) => !list.selected);
      const itemArr = selectItem.concat(unSelectItem);
      state.elecStatus = itemArr;
    },
    elecTapSelect(state, value) {
      state.elecStatus.filter((list) => {
        list.selected = false;
        if(list.devId === value) {
          list.selected = true;
        }
     });
    },
    elecTrapMapSelect(state, value) {
      state.elecMapbox.filter((list) => {
        list.select = false;
        if(list.id === value) {
          list.select = true;
        }
      });
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
    },
    getSteamStatus(state, datas) {
      state.status = {
        normal: datas[0].normal,
        anomaly: datas[0].anomaly,
        diagnosis: datas[0].diagnosis
      };
    },
    getTempModalChartData(state, datas) {
      state.tempModalChartData = datas;
    }
  },
  actions: {
    getSteamData({ rootState, commit }) {
      const siteid = rootState.factoryID;
      axios.post(`${rootState.globalIP}/sub/steam/trap-condition`, { siteid }).then((data) => {
        commit("steamTrapStatus", data.data);
      });

      axios.post(`${rootState.globalIP}/sub/elec/power_plant_details`, { siteid }).then((data) => {
        commit("elecTrapStatus", data.data);
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
        commit("getAlarm", dataArr, { root: true });
      });

      axios.post(`${rootState.globalIP}/sub/steam/status_table`, { siteid }).then((data) => {
        commit("getSteamStatus", data.data);
      });
    },
    getFEMSDetailModalData({ rootState, state, commit }) {
      const siteid = rootState.factoryID;
      axios.post(`${rootState.globalIP}/sub/fems_trend_graph`, {
      siteid, devid: state.selectFEMSDetail.devId, search_period: state.FEMSModalSelectKey, search_type: state.searchType
        }).then((res) => {
          commit("getTempModalChartData", res.data);
            });
          },
      getFEMScsvDownload({ rootState, state, commit }) {
        const siteid = rootState.factoryID;
        const time = moment().format("YYMMDD");
        axios.post(`${rootState.globalIP}/sub/fems_trend_csv`, {
        siteid, devid: state.selectFEMSDetail.devId, search_period: state.FEMSModalSelectKey, search_type: state.searchType
          }).then((res) => {
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", `${time}_${state.selectFEMSDetail.devId}.csv`);
            document.body.appendChild(fileLink);

            fileLink.click();
          });
        }
  }
};

export default steam;
