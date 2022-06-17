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
      <div class="energyBox tempClick" @click="showInfoModal(steam)">
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
      <a-modal v-model:visible="state.visible" width="60vw"
      @cancel="handleOk" :footer="null" :maskClosable="false" class="femsDetailModal">
        <FEMSDetailModal/>
      </a-modal>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FEMSDetailModal from "@/components/steams/FEMSDetailModal";

export default {
  components: { FEMSDetailModal },
  emits: ["click-event"],
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();

    const linkFactory = (target) => {
      store.state.selectedFac = target;
      router.push("elec");
    };

    // 스팀트랩별 온도 그래프 모달
    const state = reactive({
      visible: false
    });

    const handleOk = (e) => {
      state.visible = false;
      store.state.steam.FEMSModalSelectKey = "today";
    };

    const clickTrap = (value) => {
      emit("click-event", value);
      store.commit("steam/steamTapSelect", value);
      store.commit("steam/steamTrapMapSelect", value);
      store.commit("steam/steamTrapAlign");
    };

    const showInfoModal = (value) => {
      state.visible = true;
      store.state.steam.selectFEMSDetail = value;
       store.state.steam.searchType = "temp";
      store.dispatch("steam/getFEMSDetailModalData");
    };


    return {
      linkFactory,
      handleOk,
      state,
      store,
      clickTrap,
      showInfoModal
    };
  }
};
</script>

<style></style>
