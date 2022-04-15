<template>
  <div
    class="steam"
    v-for="steam in store.state.steam.steamStatus"
    :key="steam.devId" :class="[{ errInSteam: steam.status === '고장' },{warnInSteam: steam.status === '이상' },{ selected : steam.selected }]"
  >
    <div class="errBlurBox" v-if="steam.status === '고장'"></div>
    <div class="warnBlurBox" v-if="steam.status === '이상'"></div>
    <div class="steamImgbox" @click="clickTrap(steam.devId)" >
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
          :class="[{ 'fa-smile': steam.status === '정상'},
          { 'fa-frown': steam.status === '이상'},
          { 'fa-dizzy': steam.status === '고장'}]"></i>
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
  emits: ["click-event"],
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();

    const linkFactory = (target) => {
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
      visible.value = false;
    };

    const clickTrap = (value) => {
      emit("click-event", value);

      store.commit("steam/steamTapSelect", value);
      store.commit("steam/steamTrapMapSelect", value);
      store.commit("steam/steamTrapAlign");
    };


    return {
      linkFactory,
       showModal,
      handleOk,
      visible,
      store,
      clickTrap
    };
  }
};
</script>

<style></style>
