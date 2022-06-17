<template>
<div class="table-status">
    <img src="@/assets/electable.png" alt="">

<div class="content-box">
    <div class="title">
  <i class="fas fa-circle-notch tableIcon"></i>전력 사용 현황
  </div>

  <div class="table-box">
    <div class="thead">
      <div class="th">설비명</div>
      <div class="th ">설비전력</div>
      <div class="th">사용전력
        <span class="arrowIcon"><i class="fas fa-arrow-up arrow"  @click="listArray" :class="{rotate:state.array === 'down'}"></i></span>
      </div>
    </div>
    <div class="tbody">
      <div class="tr" v-for="(data, index) in state.powerData" :key="index" @click="clickTheDetail(data)">
            <div class="td">{{data.pointName}}</div>
            <div class="td right">{{data.maximum_wh}} <span>Wh</span></div>
            <div class="td progress">
              <a-tooltip :title="`시간 : ${data.femsTime} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 사용전력 : ${data.total_wh} Wh`" >
              <a-progress stroke-linecap="square" :percent="data.percent" strokeColor="#316fff" :strokeWidth="20"  status="active"  :stroke-color="{
        '0%': '#316fff',
        '100%': '#31c5ff',
      }" />
              </a-tooltip>
          </div>
        </div>
    </div>


 </div>
  </div>
  <a-modal v-model:visible="state.visible" width="60vw"
      @cancel="handleOk" :footer="null" :maskClosable="false" class="femsDetailModal">
        <FEMSDetailModal/>
      </a-modal>
</div>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import FEMSDetailModal from "@/components/steams/FEMSDetailModal";

export default {
   components: {
     FEMSDetailModal
  },
setup() {
  const store = useStore();
   const state = reactive({
      checked1: true,
      array: "",
      powerData: computed(() => JSON.parse(JSON.stringify(store.state.elec.powerData))),
      visible: false
    });

    const listArray = () => {
      if(state.array === "" || state.array === "up") {
          state.array = "down";
          state.powerData.sort((a, b) => a.percent - b.percent);
          return;
      }
       if(state.array === "down") {
          state.array = "up";
          state.powerData.sort((a, b) => b.percent - a.percent);
      }
    };

    const handleOk = () => {
      state.visible = false;
      store.state.steam.FEMSModalSelectKey = "today";
    };

    const clickTheDetail = (value) => {
      console.log(store.state.steam.tempModalChartData);
      state.visible = true;
      store.state.steam.searchType = "kwh";
        store.state.steam.selectFEMSDetail = value;
        store.dispatch("steam/getFEMSDetailModalData");
    };

  return {
    state, store, listArray, clickTheDetail, handleOk
};
}
};
</script>
