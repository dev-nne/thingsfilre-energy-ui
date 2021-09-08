<template>
<div class="energy steam">
    <TopComp :title="state.title" />

  <div class="content">
    <div class="chartBox">
       <Status class="charts" />
        <SteamLine class="charts" />
        <SteamChart3 class="charts" />
        <BarHor class="charts" />
    </div>

     <div class="steamsBox">
     <div class="title"><i class="fas fa-circle-notch"></i>스팀트랩 별 상태</div>

     <div class="steams">
       <Steam v-on:click="moveSteamView" />
     </div>

  </div>

  <div class="unity-view">
      <iframe src="./SewangFactory/index.html" class="unity" id="unityIFrame"/>
  </div>
  </div>


</div>
</template>

<script>
import TopComp from "@/components/topMenu/TopComp.vue";
import Status from "@/components/chart/Status.vue";
import SteamLine from "@/components/chart/SteamLine.vue";
import SteamChart3 from "@/components/chart/SteamChart3.vue";
import BarHor from "@/components/chart/BarHor.vue";
import Steam from "@/components/steams/Steam.vue";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

export default {
    components: {
 TopComp,
Status,
    SteamLine,
    SteamChart3,
    BarHor,
 Steam
},
  setup() {
      const store = useStore();
       const factory = JSON.parse(sessionStorage.getItem("factory"));
         const state = reactive({
      title: `${factory.title} 스팀트랩 상태 대시보드`
    });

     onMounted(() => {
      sessionStorage.setItem("page", "steam");
    });

     const moveSteamView = (value) => {
      const unity = document.getElementById("unityIFrame");
      const steamView = unity.contentWindow || unity.contentDocument;

      steamView.handelSteamView(value);
    };


    return {
      state,
factory,
      moveSteamView
    };
  }
};
</script>

<style>
.electronic {
  color: white;
}
</style>


