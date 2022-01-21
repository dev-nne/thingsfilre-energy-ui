import axios from "axios";
import moment from "moment";

const main = {
  namespaced: true,
  state: {
    factoryReload: false,
    factorys: [
      {
        id: "2005007001",
        title: "티엘비",
        status: "가동중",
        electronic: true,
        heats: true,
        error: false,
        location: [126.7851598, 37.3196074]
      },
      {
        id: "2005007002",
        title: "우성염직",
        status: "가동중",
        electronic: true,
        heats: true,
        error: false,
        location: [126.7993333, 37.3054562]
      },
      {
        id: "2005007003",
        title: "YH교역",
        status: "가동중",
        electronic: true,
        heats: true,
        error: false,
        location: [126.7939726, 37.3044567]
      },
      {
        id: "2005007004",
        title: "세왕섬유",
        status: "가동중",
        electronic: true,
        heats: true,
        error: false,
        location: [126.7785937, 37.3196284]
      },
      {
        id: "2005007005",
        title: "유트로닉스",
        status: "가동중",
        electronic: true,
        heats: true,
        error: false,
        location: [126.7963612, 37.3040123]
      },
      {
        id: "2005007006",
        title: "화백엔지니어링",
        status: "가동중",
        electronic: true,
        heats: true,
        error: false,
        location: [126.7933043, 37.3068236]
      }
    ],
    daily: {
      lastweek_elec: "",
      lastweek_time: "",
      yesterday_elec: "",
      yesterday_time: "",
      now_week_elec: "",
      now_month_elec: ""
    },
    monthly: {
        time: [],
        monthly_elec: [],
        change_monthly_elec: []
    },
    monthlySteam: {
      site_name: [],
      site_max_avg_percent: [],
      site_in_out_percent: []
    },
    steamCount: {
      trapType: [],
      count: []
    },
    alarm: []
  },
  getters: {
    lineElec: (state) => {
      const data = {
        time: JSON.parse(JSON.stringify(state.monthly.time)),
        monthly_elec: JSON.parse(JSON.stringify(state.monthly.monthly_elec))
      };
      return data;
    },
    monthlySteam: (state) => {
      const data = {
        name: JSON.parse(JSON.stringify(state.monthlySteam.site_name)),
        max: JSON.parse(JSON.stringify(state.monthlySteam.site_max_avg_percent)),
        in_out: JSON.parse(JSON.stringify(state.monthlySteam.site_in_out_percent))
      };
      return data;
    },
    steamCount: (state) => {
      const trapType = [...state.steamCount.trapType];
      const count = [...state.steamCount.count];
      const data = {
        trapType: JSON.parse(JSON.stringify(trapType.reverse())),
        count: JSON.parse(JSON.stringify(count.reverse()))
      };

      return data;
    }
  },
  mutations: {
    getDailyDatas(state, datas) {
      const lastweek = `${new Date(datas.lastweek_time * 1000).getMonth() + 1}/${new Date(datas.lastweek_time * 1000).getDate()}`;
      const yesterday = `${new Date(datas.yesterday_time * 1000).getMonth() + 1}/${new Date(datas.yesterday_time * 1000).getDate()}`;

      state.daily.lastweek_elec = datas.lastweek_elec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      state.daily.yesterday_elec = datas.yesterday_elec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      state.daily.now_week_elec = datas.now_week_elec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      state.daily.now_month_elec = datas.now_month_elec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      state.daily.lastweek_time = lastweek;
      state.daily.yesterday_time = yesterday;
    },
    monthlyUsage(state, { time, monthly_elec }) {
      state.monthly = {
        time: [],
        monthly_elec: [],
        change_monthly_elec: []
      };
      for(let i = 0; i < time.length; i++) {
        const tim = time[i] < 10 ? `0${time[i]}` : time[i];
        const elec = monthly_elec[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        state.monthly.time.push(tim);
        state.monthly.change_monthly_elec.push(elec);
      }

      state.monthly.monthly_elec = monthly_elec;
    },
    getMonthlySteam(state, { site_name, site_max_avg_percent, site_in_out_percent }) {
      state.monthlySteam = {
        site_name: [],
        site_max_avg_percent: [],
        site_in_out_percent: []
      };
      state.monthlySteam.site_name = site_name;
      state.monthlySteam.site_max_avg_percent = site_max_avg_percent;
      state.monthlySteam.site_in_out_percent = site_in_out_percent;
    },
    getSteamCount(state, { trapType, count }) {
      state.steamCount = {
        trapType: [],
        count: []
      };

      state.steamCount.trapType = trapType;
      state.steamCount.count = count;
    },
    getAlarm(state, datas) {
      state.alarm = datas;
    },
    getEnergyList(state, datas) {
      state.factoryReload = true;
      for(let i = 0; i < datas.length; i++) {
        state.factorys.forEach((list) => {
          const id = datas[i].siteid.toString();
          if(list.id === id && datas[i].class === "steam") {
            list.error = true;
            list.heats = false;
          }
          if(list.id === id && datas[i].class === "elec") {
            list.error = true;
            list.electronic = false;
          }
        });
      }
    }
  },
  actions: {
    getMainData({ rootState, state, commit }) {
      axios.post(`${rootState.globalIP}/main/elec/daily-usage`).then((data) => {
        const datas = data.data;

        commit("getDailyDatas", datas[0]);
      });

      axios.post(`${rootState.globalIP}/main/elec/monthly-usage`).then((data) => {
        const datas = data.data;
        const time = [];
        const monthly_elec = [];

        for(let i = 0; i < datas.length; i++) {
          time.push(new Date(datas[i].time * 1000).getMonth() + 1);
          monthly_elec.push(datas[i].monthly_elec);
        }
        commit("monthlyUsage", { time, monthly_elec });
      });

      axios.post(`${rootState.globalIP}/main/steam_percent`).then((data) => {
        const datas = data.data;
        const site_name = [];
        const site_max_avg_percent = [];
        const site_in_out_percent = [];

        for(let i = 0; i < datas.length; i++) {
          const max = datas[i].site_max_avg_percent * 100;
          const inOut = datas[i].site_in_out_percent * 100;
          site_name.push(datas[i].site_name);
          site_max_avg_percent.push(Math.floor(max));
          site_in_out_percent.push(Math.floor(inOut));
          }

        commit("getMonthlySteam", { site_name, site_max_avg_percent, site_in_out_percent });
      });

      axios.post(`${rootState.globalIP}/main/steam_dev_count`).then((data) => {
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

        commit("getSteamCount", { trapType, count });
      });

      axios.post(`${rootState.globalIP}/main/alarm`, { siteid: "ALL" }).then((data) => {
        const datas = data.data;
        const dataArr = [];

        for(let i = 0; i < datas.length; i++) {
          const api_contents = datas[i].api_contents.split(",");
          const siteId = api_contents[0].split("_")[1];
          let siteName = "";
          switch(siteId) {
            case "2005007001":
              siteName = "티엘비"; break;
            case "2005007002":
              siteName = "우성염직"; break;
              case "2005007003":
                siteName = "YH교역"; break;
                case "2005007004":
                  siteName = "세왕섬유"; break;
              case "2005007005":
                siteName = "유트로닉스"; break;
              case "2005007006":
                siteName = "화백엔지니어링"; break;
              default:
                siteName = "알수없음"; break;
          }
          const alarm = {
            title: datas[i].api_title,
            time: moment(new Date(datas[i].time * 1000)).format("YYYY년 MM월 DD일 HH분 mm분"),
            site: siteName,
            devId: api_contents[1].split("_")[1]
          };
          dataArr.push(alarm);
        }
        commit("getAlarm", dataArr);
      });

      // 에너지효율현황
      axios.post(`${rootState.globalIP}/main/current_status`).then((data) => {
        state.factoryReload = false;
        commit("getEnergyList", data.data);
      });
    }
  }
};

export default main;
