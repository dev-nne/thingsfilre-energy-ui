<template>
  <div class="modal-inner">
   <div class="top-box">
      <div class="title">
    {{store.state.steam.selectFEMSDetail.pointName}}
    </div>

    <div class="selectTime-box">
        <div class="label">조회기간</div>
        <div class="select">
          <a-select
            v-model:value="store.state.steam.FEMSModalSelectKey"
            size="middle"
            style="width: 200px"
            :options="store.state.steam.FEMSModalSelectOptions"
          ></a-select>
        </div>
      <div class="btn" @click="showFEMSDetail">조회</div>
      </div>
   </div>
      <div class="chart-conent">
        <a-empty :image="simpleImage" v-if="store.state.steam.tempModalChartData.length === 0"/>
        <div class="chart" v-else>
          <SteamModalLineChart v-if="store.state.steam.searchType ==='temp'"/>
        <ElecModalLineChart v-else/>
        </div>
      </div>
      <div class="downloadBtn" @click="downloadCSVdata" v-if="store.state.steam.tempModalChartData.length !== 0">다운로드</div>
  </div>
</template>

<script>
import { Empty } from "ant-design-vue";
import { useStore } from "vuex";
import SteamModalLineChart from "@/components/chart/SteamModalLineChart";
import ElecModalLineChart from "@/components/chart/ElecModalLineChart";

export default {
  components: { SteamModalLineChart, ElecModalLineChart },
setup() {
  const store = useStore();

  const showFEMSDetail = () => {
     store.dispatch("steam/getFEMSDetailModalData");
  };
  const downloadCSVdata = () => {
     store.dispatch("steam/getFEMScsvDownload");
  };

  return{
 store, showFEMSDetail, downloadCSVdata, simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
};
}
};
</script>

<style>

</style>
