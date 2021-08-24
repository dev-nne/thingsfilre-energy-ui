<template>
  <div
    class="steam"
    v-for="steam in state.steams"
    :key="steam.id"
    :class="[{ errInSteam: steam.error },{warnInSteam: steam.warn }]"
  >
    <div class="errBlurBox" v-if="steam.error"></div>
    <div class="warnBlurBox" v-if="steam.warn"></div>
    <div class="steamImgbox">
      <img :src="require(`@/assets/steamTrap${steam.value}.png`)" alt="" class="steamImg"/>
    </div>

    <div class="steamInfo">
      <div class="titlebox">
        <div class="title">{{ steam.title }}</div>
        <div class="status">
          <div class="circle"></div>
          <span>{{ steam.status }}</span>
        </div>
      </div>

      <div class="energyBox">
        <div class="energyname">
        In/Out
        </div>
          <div class="enerygyStatus" >
         {{steam.temp}}
          </div>
      </div>

      <div class="energyBox">
        <div class="energyname">
          동작상태
        </div>
          <div class="enerygyStatus nameColor" >
           {{ steam.steamStatus}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
 onMounted, reactive
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();


    const state = reactive({
     steams: [
        {
          id: 0,
          title: "AA-01",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam1",
          error: true,
          warn: false,
          value: 1,
          steamStatus: "고장"
        },
        {
          id: 1,
          title: "AA-02",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam2",
          error: false,
          warn: true,
          value: 2,
          steamStatus: "이상"
        },
        {
          id: 2,
          title: "AD-07",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam3",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "양호"
        },
        {
           id: 3,
          title: "AJ-08",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam4",
          error: false,
          warn: false,
          value: 1,
          steamStatus: "양호"
        },
        {
          id: 4,
          title: "AA-01",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam5",
          error: false,
          warn: false,
          value: 2,
          steamStatus: "양호"
        },
        {
         id: 5,
          title: "AD-10",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam6",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "양호"
        }, {
          id: 6,
          title: "AA-01",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam1",
          error: true,
          warn: false,
          value: 1,
          steamStatus: "고장"
        },
        {
          id: 7,
          title: "AA-02",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam2",
          error: false,
          warn: true,
          value: 2,
          steamStatus: "이상"
        },
        {
          id: 8,
          title: "AD-07",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam3",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "양호"
        },
        {
           id: 9,
          title: "AJ-08",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam4",
          error: false,
          warn: false,
          value: 1,
          steamStatus: "양호"
        },
        {
          id: 10,
          title: "AA-01",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam5",
          error: false,
          warn: false,
          value: 2,
          steamStatus: "양호"
        },
        {
         id: 11,
          title: "AD-10",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam6",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "양호"
        }
      ]
    });


   onMounted(() => {
      store.state.steams = state.steams;
    });

    const linkFactory = (target) => {
      sessionStorage.setItem("factory", JSON.stringify(target));
      store.state.selectedFac = target;
      router.push("elec");
    };

    return {
      state,
      linkFactory
    };
  }
};
</script>

<style></style>
