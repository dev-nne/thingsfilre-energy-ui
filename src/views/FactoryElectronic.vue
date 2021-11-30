<template>
<div class="energy elec">
    <TopComp :title="state.title" />

  <div class="main">
    <img :src="ElecBG" alt="" class="mainBG">
    <div class="mainContentL mainContent">
      <TotalStatus />
      <ElecTable />
    </div>
    <div class="mainContentR mainContent">
      <div class="topCon">
        <div class="content">
          <img src="@/assets/electable2.png" alt="">
          <ElecLine :data="state.lineElec" />
        </div>
        <div class="content">
          <img src="@/assets/electable2.png" alt="">
           <ElecLine2 :data="state.dailyData"/>
        </div>
      </div>
      <div class="bottom">
        <img :src="ElecChartBG2" alt="">
        <ElecScatter />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import TopComp from "@/components/topMenu/TopComp.vue";
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TotalStatus from "@/components/elec/TotalStatus.vue";
import ElecTable from "@/components/elec/ElecTable.vue";
import ElecLine from "@/components/chart/ElecLine.vue";
import ElecLine2 from "@/components/chart/ElecLine2.vue";
import ElecScatter from "@/components/chart/ElecScatter.vue";

import ElecBG from "@/assets/eneryBG.png";
import ElecChartBG2 from "@/assets/electable3.png";

export default {
    components: {
 TopComp, TotalStatus, ElecTable, ElecLine, ElecLine2, ElecScatter
},
  setup() {
      const store = useStore();
      const factory = JSON.parse(sessionStorage.getItem("factory"));

     onMounted(() => {
      sessionStorage.setItem("page", "elec");
      store.state.loadPage = "elec";
      store.dispatch("elec/getElecData");
      setInterval(() => {
         store.dispatch("elec/getElecData");
       }, (15 * 60 * 1000));
    });

    const state = reactive({
      title: `${factory.title} 전기 에너지 효율화 대시보드`,
       lineElec: computed(() => store.getters["elec/lineElec"]),
       dailyData: computed(() => store.getters["elec/dailyData"])
    });


    return {
      state, factory, ElecBG, ElecChartBG2
    };
  }
};
</script>

<style>
.electronic {
  color: white;
}
</style>
