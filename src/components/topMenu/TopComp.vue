<template>
  <div>
    <div div class="titleBox">
      <div class="logobox" v-if="state.dashboard">
        <img :src="logoImg" alt="" />
      </div>
      <div class="menubox" v-else >
        <i class="fas fa-home home" @click="goHome" v-if="store.state.userId === 'admin'"></i>
        <div class="tabBox" v-if="store.state.factoryID !== '2005007005' && !state.dashboard">
          <div class="tab1 tab"
          :class="{onOff : state.elec}" @click="goElec">전기에너지</div>
          <div class="tab2 tab" :class="{onOff : state.steam}" @click="goSteam" >스팀트랩</div>
        </div>
      </div>
      <div class="title">{{ title }}</div>
      <div class="right-box">
        <div class="logout-btn" @click="clickLogout">Log Out</div>
        <Time class="time" />
      </div>
    </div>

    <div class="infoBox">
      <div class="tikerBox">
        <div class="tiker">
          <div class="title">시화산단 뉴스</div>
          <div class="content">
              <ul class="newsList list1">
              <li
                v-for="(searchData, index) in state.searchData"
                :key="index"
                @click="golink(searchData.url)"
                class="news"
                v-html="searchData.title"
              >
              </li>
              </ul>
          </div>
        </div>
        <div class="tikerline"></div>
        <div class="tiker">
          <div class="title">AI 공지
            <i class="fas fa-list-alt" @click="showModal"></i>
          </div>
          <div class="content">
              <ul class="newsList list2">
                  <li
                  v-for="(ai, index) in state.aiData"
                  :key="index"
                  class="news"
                  @mouseenter="handleTickerEnter(index)"
                  @mouseleave="handleTickerLeave"
                >
                {{ ai.title }}
                </li>
              </ul>
          </div>

        </div>
      </div>

      <div class="tickerPopover">
        <div class="item">
          <div class="label">발생 시간 :</div>
          <div class="value" >{{ state.time }}</div>
        </div>
        <div class="item" v-if="store.state.loadPage === 'home'">
          <div class="label">발생 장소 :</div>
          <div class="value" >{{ state.site }}</div>
        </div>
        <div class="item">
          <div class="label">발생 장치 :</div>
          <div class="value" >{{ state.devId }}</div>
        </div>
      </div>

      <a-modal v-model:visible="visible" title="AI 공지" @ok="handleOk" :footer="null" dialogClass="Modal" :width="650">
        <ul>
                <li
                v-for="(ai, index) in state.aiData"
                :key="index"
                class="news"
                @mouseenter="handleTickerEnter(index)"
                @mouseleave="handleTickerLeave"
              >
                {{ ai.title }}
              </li>
        </ul>
    </a-modal>

      <div class="weatherBox">
        <div class="title">오늘 날씨</div>
        <div class="weatherContent">
          <div class="weather"></div>
          <div class="weatherInfo">
            <span class="temp">{{ state.temp + "°" }}</span>
            <span>{{ state.weatherDescript }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logoImg from "@/assets/logo.png";
import Time from "@/components/topMenu/Time.vue";
import {
 reactive, onMounted, ref, createVNode, watch
} from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Modal } from "ant-design-vue";


export default {
  components: {
    Time
  },
  props: ["title"],
  setup() {
       const store = useStore();
        const router = useRouter();

    const state = reactive({
      searchData: [],
      weatherKey: "",
      weatherDescript: "",
      weatherIcon: "",
      temp: "",
      dashboard: true,
      elec: false,
      steam: false,
      time: "",
      site: "",
      devId: "",
      aiData: store.state.alarm,
      idx: 0,
      mount: ""
    });

    watch(() => store.state.alarm,
      () => {
        state.aiData = store.state.alarm;
        const listDuration = document.querySelector(".list2").style;
        const num = state.aiData.length;
        if(num > 4) {
          listDuration.animationDuration = `${7 * num}s`;
        }else{
          listDuration.animationDuration = `${12 * num}s`;
        }
      });

    onMounted(async () => {
      await kakaoAPI();
      await dashboardView();
      await weather();
      await weatherIcon();
      state.mount = "watch";
    });

    const dashboardView = () => {
      const linkName = store.state.loadPage;
      if (linkName === "home") {
        state.dashboard = true;
      } else {
        state.dashboard = false;
      }

      if(linkName === "elec") {
        state.elec = true;
        state.steam = false;
      } else if(linkName === "steam") {
        state.elec = false;
        state.steam = true;
      }else{
        state.elec = false;
        state.steam = false;
      }
    };

    // 뉴스 API
    const kakaoAPI = () => {
      const options = {
        method: "get",
        baseURL: "https://dapi.kakao.com/v2/search/web",
        headers: {
          Authorization: "KakaoAK fe8c8bee6578199c763e75d4141faac5"
        },
        params: {
          query: "시화공단"
        }
      };

      axios(options)
        .then((res) => {
          const datas = res.data.documents;
          const dataArr = [];
          for(let i = 0; i < datas.length; i++) {
            const data = {
              contents: datas[i].contents,
              datetime: datas[i].datetime,
              title: datas[i].title,
              url: datas[i].url
            };
            dataArr.push(data);
          }

          state.searchData = dataArr;
        })
        .catch((err) => console.log(err));
    };

    // 뉴스 하이퍼링크
    const golink = (x) => {
      window.open(x);
    };

    // 뉴스제목 체인지
    const translate = () => {
      const news = document.getElementsByClassName("news");
      for (let i = 0; i < news.length; i++) {
        news[i].innerHTML = news[i].innerText;
      }
    };

    const changeText = (value) => {
      let text = "";
      //  text = value.replaceAll("<b>", "");
      //  text = text.replaceAll("</b>", "");
       text = new DOMParser().parseFromString(value, "text/html");
       return text.body;
    };

    // 날씨 API
    const weather = async () => {
      const lat = 37;
      const lon = 126;
      const API_key = "3d7c079d731118bcb85b162888fd3e67";
      await axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        )
        .then((res) => {
          state.weatherKey = res.data.weather[0].icon;
          state.weatherDescript = res.data.weather[0].main;
          state.temp = Math.floor(res.data.main.temp);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 날씨 이미지 추가
    const weatherIcon = () => {
      const weatherImg = document.getElementsByClassName("weather")[0];

      switch (state.weatherKey) {
        case "01d" || "01n":
          state.weatherIcon = "<i class=\"fas fa-sun\"></i>";
          break;
        case "02d" || "02n":
          state.weatherIcon = "<i class=\"fas fa-cloud-sun\"></i>";
          break;
        case "03d" || "03n":
          state.weatherIcon = "<i class=\"fas fa-cloud\"></i>";
          break;
        case "04d" || "04n":
          state.weatherIcon = "<i class=\"fas fa-cloud\"></i>";
          break;
        case "09d" || "09n":
          state.weatherIcon = "<i class=\"fas fa-cloud-showers-heavy\"></i>";
          break;
        case "10d" || "10n":
          state.weatherIcon = "<i class=\"fas fa-cloud-sun-rain\"></i>";
          break;
        case "11d" || "11n":
          state.weatherIcon = "<i class=\"fas fa-bolt\"></i>";
          break;
        case "13d" || "13n":
          state.weatherIcon = "<i class=\"fas fa-snowflake\"></i>";
          break;
        case "50d" || "50n":
          state.weatherIcon = "<i class=\"fas fa-smog\"></i>";
          break;
        default:
          state.weatherIcon = "<i class=\"fas fa-sun\"></i>";
          break;
      }

      weatherImg.innerHTML = state.weatherIcon;
    };

    const goHome = () => {
      router.push("/home");
    };

const goElec = () => {
      router.push("/elec");
    };
    const goSteam = () => {
      router.push("/steam");
    };

    const goAlertPage = (link, id) => {
       const select = store.state.factorys.filter((x) => x.id === id);

       store.state.selectedFac = select[0];
       router.push(link);
    };

    // AI뉴스공지 모달
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    // ticker popover
    const handleTickerEnter = (index) => {
      state.time = state.aiData[index].time;
      state.site = state.aiData[index].site;
      state.devId = state.aiData[index].devId;
      const popover = document.querySelector(".tickerPopover");
      popover.classList.add("showPop");
      const positionX = event.clientX;
      const positionY = event.clientY;
      popover.style.top = `${positionY + 10}px`;
      popover.style.left = `${positionX + 10}px`;
    };

    const handleTickerLeave = () => {
      const popover = document.querySelector(".tickerPopover");
      popover.classList.remove("showPop");
    };

    const clickLogout = () => {
      Modal.confirm({
              title: "로그아웃 하시겠습니까?",
              onOk() {
                store.commit("resetState");
                router.push("/");
                sessionStorage.clear();
              },
              class: "logoutModal"
            });
    };
    return {
      kakaoAPI,
      state,
      golink,
      translate,
      goHome,
 goElec,
 goSteam,
 store,
  showModal,
      handleOk,
 visible,
 logoImg,
 goAlertPage,
 handleTickerEnter,
 handleTickerLeave,
 changeText,
 clickLogout
    };
  }
};
</script>

<style></style>
