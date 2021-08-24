<template>
  <div>
    <div div class="titleBox">
      <div class="logobox" v-if="state.dashboard">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="menubox" v-else>
        <i class="fas fa-home home" @click="goHome"></i>
        <div class="tabBox">
          <div class="tab1 tab"
          :class="{onOff : state.elec}" @click="goElec">전기에너지</div>
          <div class="tab2 tab" :class="{onOff : state.steam}" @click="goSteam">스팀트랩</div>
        </div>
      </div>
      <div class="title">{{ title }}</div>
      <Time class="time" />
    </div>

    <div class="infoBox">
      <div class="tikerBox">
        <div class="tiker">
          <div class="title">시화산단 뉴스</div>
          <div class="content">
            <ul class="newsList">
              <li
                v-for="(searchData, index) in state.searchData"
                :key="index"
                @click="golink(searchData.url)"
                class="news"
              >
                {{ searchData.contents }}
              </li>
            </ul>
          </div>
        </div>
        <div class="tikerline"></div>
        <div class="tiker">
          <div class="title">AI 공지</div>
          <div class="content">
            씨앤티 j-014 스팀트랩의 상태가 **스팀누수**로 판단(67%)됩니다.. 티앨비전기 에너지 보고서
            생성이
          </div>
        </div>
      </div>

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
import Time from "@/components/topMenu/Time.vue";
import {
 reactive, onMounted
} from "vue";
import axios from "axios";
import gsap from "gsap";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    Time
  },
  props: ["title"],
  setup() {
       const store = useStore();
    const state = reactive({
      searchData: [],
      weatherKey: "",
      weatherDescript: "",
      weatherIcon: "",
      temp: "",
      dashboard: true,
      elec: false,
      steam: false
    });

    const router = useRouter();
    onMounted(async () => {
      await kakaoAPI();
      await dashboardView();
      await weather();
      await weatherIcon();
      await translate();
      await newsAnimation();
    });

    const dashboardView = () => {
      const linkName = sessionStorage.getItem("page");
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

    const newsAnimation = () => {
      gsap.from(".news", {
        keyframes: [
          { y: 0, duration: 1.5, ease: "circ.out" },
          {
 y: -30, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -60, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -90, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -120, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -150, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -180, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -210, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -240, duration: 1.5, delay: 2, ease: "circ.out"
},
          {
 y: -270, duration: 1.5, delay: 2, ease: "circ.out"
},
          { y: -300, ease: "circ.out", duration: 1 }
        ],
        repeat: -1,
        onComplete: newsAnimationReset()
      });
    };

    const newsAnimationReset = () => {
      gsap.set(".news", { y: 30, duration: 1 });
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
          state.searchData = res.data.documents;
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
      router.push("/");
    };

const goElec = () => {
      router.push("/elec");
    };
    const goSteam = () => {
      router.push("/steam");
    };
    return {
      kakaoAPI,
      state,
      golink,
      translate,
      goHome,
 goElec,
 goSteam,
 store
    };
  }
};
</script>

<style></style>
