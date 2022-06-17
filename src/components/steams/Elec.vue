<template>
  <div
    class="elecEquip"
    v-for="elec in store.state.steam.elecStatus" :key="elec.devId"  :class="{ selected : elec.selected }">
       <div class="titlebox" @click="clickTrap(elec.devId)" >
        <div class="title">{{ elec.pointName }}</div>
      </div>

    <div class="elecInfo">
      <div class="progress" @click="showInfoModal(elec)">
      <a-tooltip :title="`사용전력 : ${elec.total_wh} Wh &nbsp; &nbsp;    설비전력 : ${elec.maximum_wh} Wh`" :overlayStyle="{width:'150px', fontSize: '12px'}" >
              <a-progress stroke-linecap="square" :percent="elec.percent" strokeColor="#316fff" :strokeWidth="20"  status="active"  :stroke-color="{
        '0%': '#316fff',
        '100%': '#31c5ff',
      }" />
      </a-tooltip>
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
  emits: ["click-event"],
    components: { FEMSDetailModal },
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      visible: false
    });

    const linkFactory = (target) => {
      store.state.selectedFac = target;
      router.push("elec");
    };

    const clickTrap = (value) => {
      store.commit("steam/elecTapSelect", value);
      store.commit("steam/elecTrapMapSelect", value);
      store.commit("steam/elecTrapAlign");
      emit("click-event", value);
    };

      const handleOk = (e) => {
      state.visible = false;
      store.state.steam.FEMSModalSelectKey = "today";
      };
      const showInfoModal = (value) => {
      state.visible = true;
      store.state.steam.selectFEMSDetail = value;
      store.state.steam.searchType = "kwh";
      store.dispatch("steam/getFEMSDetailModalData");
    };



    return {
      linkFactory,
      store,
      state,
      clickTrap,
      handleOk,
      showInfoModal
    };
  }
};
</script>

<style></style>
