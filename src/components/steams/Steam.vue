<template>
  <div
    class="steam"
    v-for="steam in store.state.steam.steamStatus"
    :key="steam.devId"
  >
      <!-- :class="[{ errInSteam: steam.error },{warnInSteam: steam.warn }]" -->
    <!-- <div class="errBlurBox" v-if="steam.error"></div>
    <div class="warnBlurBox" v-if="steam.warn"></div> -->
    <div class="steamImgbox" @click="$emit('click', steam.devId)">
      <img :src="require(`@/assets/steamTrap${steam.trapType}.png`)" alt="" class="steamImg"/>
       <div class="titlebox">
        <div class="title">{{ steam.pointName }}</div>
      </div>
    </div>


    <div class="steamInfo">
      <div class="energyBox tempClick">
        <div class="energyname">
        In/Out
          <div class="enerygyStatus" >
         {{steam.inTemp}}<span>°C</span>{{steam.outTemp}}<span>°C</span>
          </div>
        </div>
      </div>


      <div class="energyBox">
        <div class="energyname">
          동작상태
          <div class="enerygyStatus nameColor" >
          <i class="fas"
          :class="[{ 'fa-smile': steam.steamStatus === '정상'},
          { 'fa-frown': steam.steamStatus === '이상'},
          { 'fa-dizzy': steam.steamStatus === '고장'}]"></i>
          </div>
        </div>
      </div>
    </div>

  </div>

  <a-modal dialogClass="Modal"
  v-model:visible="visible"
  @ok="handleOk" :footer="null">
  <EX />
  </a-modal>

</template>

<script>
import {
 onMounted, reactive, ref
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import EX from "@/components/chart/ex.vue";

export default {
  components: { EX },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
     steams: [
        {
          id: 0,
          num: "0401",
          title: "R-04",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam1",
          error: true,
          warn: false,
          value: 3,
          steamStatus: "고장"
        },
        {
          id: 1,
          num: "0402",
          title: "V-14",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam2",
          error: false,
          warn: true,
          value: 3,
          steamStatus: "이상"
        },
        {
          id: 2,
          num: "0403",
          title: "V-20",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam3",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "정상"
        },
        {
           id: 3,
           num: "0404",
          title: "V-25",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam4",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "정상"
        },
        {
          id: 4,
          num: "0405",
          title: "V-30",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam5",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "정상"
        },
        {
         id: 5,
         num: "0406",
          title: "텀블러 03",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam6",
          error: false,
          warn: false,
          value: 2,
          steamStatus: "정상"
        }, {
          id: 6,
          num: "0407",
          title: "VR-01",
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
          num: "0408",
          title: "VR-06",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam2",
          error: false,
          warn: true,
          value: 3,
          steamStatus: "이상"
        },
        {
          id: 8,
          num: "0409",
          title: "VR-07",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam3",
          error: false,
          warn: false,
          value: 1,
          steamStatus: "정상"
        },
        {
           id: 9,
           num: "0410",
          title: "VR-08",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam4",
          error: false,
          warn: false,
          value: 1,
          steamStatus: "정상"
        },
        {
          id: 10,
          num: "0411",
          title: "염색기 12",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam5",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "정상"
        },
        {
         id: 11,
         num: "0412",
          title: "염색기 16",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam6",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "정상"
        },
        {
         id: 12,
         num: "0413",
          title: "염색기 17",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam6",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "정상"
        },
        {
         id: 13,
         num: "0414",
          title: "염색기 19",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam6",
          error: false,
          warn: false,
          value: 3,
          steamStatus: "정상"
        }, {
         id: 14,
         num: "0415",
          title: "텀블러 01",
          status: "가동중",
          temp: "110℃/53℃",
          link: "steam6",
          error: false,
          warn: false,
          value: 1,
          steamStatus: "정상"
        }
      ]
    });


   onMounted(() => {
    steamSorting();
      store.state.steams = state.steams;
    });

    const steamSorting = () => {
     const error = state.steams.filter((steam) => steam.error);
     const warn = state.steams.filter((steam) => steam.warn);
     const normal = state.steams.filter((steam) => !steam.error && !steam.warn);
      state.steams = [];
     for(let i = 0; i < error.length; i++) {
       state.steams.push(error[i]);
     }

     for(let i = 0; i < warn.length; i++) {
       state.steams.push(warn[i]);
     }

     for(let i = 0; i < normal.length; i++) {
       state.steams.push(normal[i]);
     }
    };

    const linkFactory = (target) => {
      sessionStorage.setItem("factory", JSON.stringify(target));
      store.state.selectedFac = target;
      router.push("elec");
    };

    // 스팀트랩별 온도 그래프 모달
    const visible = ref(false);

    const showModal = (value) => {
      const modal = document.querySelector(".steamModal");
      console.log(modal);
      store.state.steamsModalTitle = value;
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };



    return {
      state,
      linkFactory,
       showModal,
      handleOk,
      visible,
      store
    };
  }
};
</script>

<style></style>
