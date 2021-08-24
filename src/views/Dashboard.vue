<template>
  <div class="dashboard">
    <TopComp :title="state.title" />
    <div class="content">
      <div class="chartBox">
        <Pie class="charts" />
        <Line class="charts" />
        <BarVer class="charts" />
        <BarHor class="charts" />
      </div>

      <div class="linkBox">
        <div class="title"><i class="fas fa-circle-notch"></i>에너지 효율 현황</div>

        <div class="factoryBox">
          <Factory />
        </div>
      </div>
      <Map />
    </div>
  </div>
</template>

<script>
import Map from "@/components/map/Map.vue";
import TopComp from "@/components/topMenu/TopComp.vue";
import Pie from "@/components/chart/Pie.vue";
import Line from "@/components/chart/Line.vue";
import BarVer from "@/components/chart/BarVer.vue";
import BarHor from "@/components/chart/BarHor.vue";
import Factory from "@/components/factory/Factory.vue";
import { useStore } from "vuex";
import { onMounted } from "vue";


export default {
  components: {
    Map,
    TopComp,
    Pie,
    Line,
    BarVer,
    BarHor,
    Factory
  },
  setup() {
       const store = useStore();
    const state = {
      title: "AI 에너지 효율화 종합 대시보드"
    };

    onMounted(() => {
       sessionStorage.setItem("page", "home");
       store.state.selectedFac = [];
    });

    return {
      state
    };
  }
};
</script>

<style></style>
