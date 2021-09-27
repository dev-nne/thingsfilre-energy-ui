<template>
  <div>
    <div div class="titleBox">
      <div class="logobox" v-if="state.dashboard">
        <img :src="logoImg" alt="" />
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
            <ul class="newsList ticker">
              <li
                v-for="(searchData, index) in state.searchData"
                :key="index"
                @click="golink(searchData.url)"
                class="news"
              >
                {{ searchData.title }}
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
            <ul class="newsList ticker2">
              <li
                v-for="(ai, index) in AIdata"
                :key="index"
                @click="goAlertPage(ai.location, ai.id)"
                class="news"
              >
                {{ ai.title }}
              </li>
            </ul>
          </div>

        </div>
      </div>

      <a-modal v-model:visible="visible" title="AI 공지" @ok="handleOk" :footer="null" dialogClass="Modal">
        <ul>
                  <li
                v-for="(ai, index) in AIdata"
                :key="index"
                @click="goAlertPage(ai.location, ai.id)"
                class="news"
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
 reactive, onMounted, ref
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
      await newsAnimation2();
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
      gsap.registerEffect({
    	name: "ticker",
	    effect(targets, config) {
		  const master = gsap.timeline();
		  buildTickers(targets, config);

	  	function clone(el) {
			const clone = el.cloneNode(true);
			el.parentNode.insertBefore(clone, el);
			clone.style.position = "absolute";
			return clone;
		  }
	  	function nestChildren(el, className) {
			const div = document.createElement("div");
			while (el.firstChild) {
				div.appendChild(el.firstChild);
			}
			el.appendChild(div);
			className && div.setAttribute("class", className);
			div.style.display = "inline-block";
			div.style.boxSizing = "border-box";
			return div;
	  	}
		function buildTickers(targets, config, isResize) {
			if (isResize) {
				targets.clones.forEach((el) => el && el.parentNode && el.parentNode.removeChild(el));
				gsap.set(targets.chunks, { x: 0 });
			} else {
				targets.clones = [];
				targets.chunks = [];
			}
			master.clear();
			const { clones } = targets;
				const { chunks } = targets;
			targets.forEach((el, index) => {
				const chunk = chunks[index] || (chunks[index] = nestChildren(el, config.className));
					const chunkWidth = chunk.offsetWidth + (config.padding || 0);
					const cloneCount = Math.ceil(el.offsetWidth / chunkWidth);
					const chunkBounds = chunk.getBoundingClientRect();
					const elBounds = el.getBoundingClientRect();
					const right = (el.dataset.direction || config.direction) === "right";
					const tl = gsap.timeline();
					const speed = parseFloat(el.dataset.speed) || config.speed || 100;
					let i; let offsetX; let offsetY; let bounds; let cloneChunk; let all;
			  	el.style.overflow = "hidden";
				  gsap.getProperty(el, "position") !== "absolute" && (el.style.position = "relative"); // avoid scrollbars
			    for (i = 0; i < cloneCount; i++) {
					cloneChunk = clones[i] = clone(chunk);
					if (!i) {
						bounds = cloneChunk.getBoundingClientRect();
						offsetX = bounds.left - chunkBounds.left;
						offsetY = bounds.top - chunkBounds.top;
					}
					gsap.set(cloneChunk, { x: offsetX + (right ? -chunkWidth : chunkWidth) * (i + 1), y: offsetY });
			  	}
			  	all = clones.slice(0);
				  all.unshift(chunk);
				  tl.fromTo(all, {
					x: right ? `-=${chunkBounds.right - elBounds.left}` : `+=${elBounds.right - chunkBounds.left}`
				}, {
					x: (right ? "+=" : "-=") + elBounds.width,
					ease: "none",
					duration: elBounds.width / speed,
					overwrite: "auto"
				}).to(all, {
					x: (right ? "+=" : "-=") + chunkWidth,
					ease: "none",
					duration: chunkWidth / speed,
					repeat: -1
				});
				master.add(tl, 0);
			});
			// rerun on window resizes, otherwise there could be gaps if the user makes the window bigger.
			isResize || window.addEventListener("resize", () => buildTickers(targets, config, true));
		}
		return master;
	}
});

const tl = gsap.effects.ticker(".ticker", {
  speed: 80,
  className: "ticker-content"
  // direction: "right"
});


const container = document.querySelector(".ticker");
container.addEventListener("mouseenter", () => gsap.to(tl, { timeScale: 0, overwrite: true }));
container.addEventListener("mouseleave", () => gsap.to(tl, { timeScale: 1, overwrite: true }));

//       gsap.from(".news", {
//         keyframes: [
//           { y: 0, duration: 1.5, ease: "circ.out" },
//           {
//  y: -30, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -60, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -90, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -120, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -150, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -180, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -210, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -240, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           {
//  y: -270, duration: 1.5, delay: 2, ease: "circ.out"
// },
//           { y: -300, ease: "circ.out", duration: 1 }
//         ],
//         repeat: -1,
//         onComplete: newsAnimationReset()
//       });
    };

     const newsAnimation2 = () => {
      gsap.registerEffect({
    	name: "ticker2",
	    effect(targets, config) {
		  const master = gsap.timeline();
		  buildTickers(targets, config);

	  	function clone(el) {
			const clone = el.cloneNode(true);
			el.parentNode.insertBefore(clone, el);
			clone.style.position = "absolute";
			return clone;
		  }
	  	function nestChildren(el, className) {
			const div = document.createElement("div");
			while (el.firstChild) {
				div.appendChild(el.firstChild);
			}
			el.appendChild(div);
			className && div.setAttribute("class", className);
			div.style.display = "inline-block";
			div.style.boxSizing = "border-box";
			return div;
	  	}
		function buildTickers(targets, config, isResize) {
			if (isResize) {
				targets.clones.forEach((el) => el && el.parentNode && el.parentNode.removeChild(el));
				gsap.set(targets.chunks, { x: 0 });
			} else {
				targets.clones = [];
				targets.chunks = [];
			}
			master.clear();
			const { clones } = targets;
				const { chunks } = targets;
			targets.forEach((el, index) => {
				const chunk = chunks[index] || (chunks[index] = nestChildren(el, config.className));
					const chunkWidth = chunk.offsetWidth + (config.padding || 0);
					const cloneCount = Math.ceil(el.offsetWidth / chunkWidth);
					const chunkBounds = chunk.getBoundingClientRect();
					const elBounds = el.getBoundingClientRect();
					const right = (el.dataset.direction || config.direction) === "right";
					const tl = gsap.timeline();
					const speed = parseFloat(el.dataset.speed) || config.speed || 100;
					let i; let offsetX; let offsetY; let bounds; let cloneChunk; let all;
			  	el.style.overflow = "hidden";
				  gsap.getProperty(el, "position") !== "absolute" && (el.style.position = "relative"); // avoid scrollbars
			    for (i = 0; i < cloneCount; i++) {
					cloneChunk = clones[i] = clone(chunk);
					if (!i) {
						bounds = cloneChunk.getBoundingClientRect();
						offsetX = bounds.left - chunkBounds.left;
						offsetY = bounds.top - chunkBounds.top;
					}
					gsap.set(cloneChunk, { x: offsetX + (right ? -chunkWidth : chunkWidth) * (i + 1), y: offsetY });
			  	}
			  	all = clones.slice(0);
				  all.unshift(chunk);
				  tl.fromTo(all, {
					x: right ? `-=${chunkBounds.right - elBounds.left}` : `+=${elBounds.right - chunkBounds.left}`
				}, {
					x: (right ? "+=" : "-=") + elBounds.width,
					ease: "none",
					duration: elBounds.width / speed,
					overwrite: "auto"
				}).to(all, {
					x: (right ? "+=" : "-=") + chunkWidth,
					ease: "none",
					duration: chunkWidth / speed,
					repeat: -1
				});
				master.add(tl, 0);
			});
			// rerun on window resizes, otherwise there could be gaps if the user makes the window bigger.
			isResize || window.addEventListener("resize", () => buildTickers(targets, config, true));
		}
		return master;
	}
});

const tl = gsap.effects.ticker(".ticker2", {
  speed: 80,
  className: "ticker-content"
  // direction: "right"
});


const container = document.querySelector(".ticker2");
container.addEventListener("mouseenter", () => gsap.to(tl, { timeScale: 0, overwrite: true }));
container.addEventListener("mouseleave", () => gsap.to(tl, { timeScale: 1, overwrite: true }));
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

    // AI공지 가라데이터
    const AIdata = [
      { title: "세광염직공장에서 스팀알람발생", location: "steam", id: 1 },
      { title: "티앨비공장에서 전기알람발생", location: "elec", id: 0 },
      { title: "YH교역공장에서 전기알람발생", location: "elec", id: 2 },
      { title: "동환무역공장에서 전기알람발생", location: "elec", id: 3 },
      { title: "우성염직공장에서 스팀알람발생", location: "steam", id: 5 }
    ];

    const goAlertPage = (link, id) => {
      console.log(id);
       const select = store.state.factorys.filter((x) => x.id === id);

       sessionStorage.setItem("factory", JSON.stringify(select[0]));
       store.state.selectedFac = select[0];
       router.push(link);
    };


    // AI뉴스공지 모달
    const visible = ref(false);

    const showModal = () => {
      console.log(visible);
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
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
 AIdata,
 goAlertPage
    };
  }
};
</script>

<style></style>
