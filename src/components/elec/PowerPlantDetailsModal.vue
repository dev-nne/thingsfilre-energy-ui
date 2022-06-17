<template>
  <div class="modal-inner">
    <div class="top-box">
      <div class="title">
        {{store.state.factoryTitle}} 전력사용량
      </div>
      <div class="selectTime-box">
          <div class="label">조회기간</div>
          <div class="select">
            <a-select
              v-model:value="store.state.elec.ppModalSelectKey"
              size="middle"
              style="width: 200px"
              :options="store.state.elec.ppModalSelectOptions"
            ></a-select>
          </div>
        <div class="btn" @click="showPPDetail">조회</div>
      </div>
    </div>
    <div class="chart-conent">
      <a-empty :image="simpleImage" v-if="store.state.elec.elecModalChartData.length === 0"/>
      <div class="chart" v-else>
        <PPTrendChart />
      </div>
    </div>
    <div class="downloadBtn" @click="downloadCSVdata" v-if="store.state.elec.elecModalChartData.length !== 0">다운로드</div>
  </div>
</template>

<script>
import { Empty } from "ant-design-vue";
import { useStore } from "vuex";
import PPTrendChart from "@/components/chart/PPTrendChart";

export default {
  components: { PPTrendChart },
setup() {
  const store = useStore();
   const showPPDetail = () => {
     store.dispatch("elec/getPPDetailModalData");
  };
  const downloadCSVdata = () => {
     store.dispatch("elec/getPPcsvDownload");
  };

  return{
 store, showPPDetail, downloadCSVdata, simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
};
}
};
</script>

<style>

</style>
