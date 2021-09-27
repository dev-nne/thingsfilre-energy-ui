<template>
<div class="energy steam">
    <TopComp :title="state.title" />

  <div class="content">
    <div class="chartBox">
       <Status class="charts" />

       <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>스팀스랩 상태이력</div>
         <div class="toggle">
    <a-switch  v-model:checked="state.checked1" size="small" />
  </div>
         </div>
          <SteamLine v-if="state.checked1"/>
           <div class="table-box" v-else>
          <div class="table">
     <div class="thead">
       <div class="th">시간</div>
       <div class="th">사용량</div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in data.chartOne.time" :key="index">{{data}}</div>  </div>
        <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in data.chartOne.mount" :key="index">{{data}}</div>
        </div>
   </div>
   </div>
  </div>
       </div>


       <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>스팀스랩 진단분석</div>
         <div class="toggle">
    <a-switch  v-model:checked="state.checked2" size="small" />
  </div>
         </div>
          <SteamChart3 v-if="state.checked2"/>
           <div class="table-box" v-else>
   <div class="table">
     <div class="thead">
       <div class="th">시간</div>
       <div class="th">사용량</div>
     </div>
   <div class="tbody">
     <div class="tr">
       <div class="num td" v-for="(data,index) in data.chartTwo.time" :key="index">{{data}}</div>
     </div>  <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in data.chartTwo.mount" :key="index">{{data}}</div>
     </div>
   </div>
   </div>
  </div>
       </div>


       <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>월별 스팀 상태 분석</div>
         <div class="toggle">
    <a-switch  v-model:checked="state.checked3" size="small" />
  </div>
         </div>
          <BarHor v-if="state.checked3"/>
           <div class="table-box" v-else>
   <div class="table">
     <div class="thead">
       <div class="th">시간</div>
       <div class="th">사용량</div>
     </div>
   <div class="tbody">
     <div class="tr">
       <div class="num td"  v-for="(data,index) in data.chartThree.time" :key="index">{{data}}</div></div>  <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in data.chartThree.mount" :key="index">{{data}}</div>
     </div>
   </div>
   </div>
  </div>
       </div>
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
      title: `${factory.title} 스팀트랩 상태 대시보드`,
       checked1: true,
       checked2: true,
       checked3: true
    });

     onMounted(() => {
       console.log(factory.title);
      sessionStorage.setItem("page", "steam");
    });

     const moveSteamView = (value) => {
      const unity = document.getElementById("unityIFrame");
      const steamView = unity.contentWindow || unity.contentDocument;

      steamView.handelSteamView(value);
    };

    const data = reactive({
chartOne: {
    key: "1",
    time: ["01", "03", "05", "07", "09", "11", "13", "15"],
    mount: [100, 85, 270, 360, 230, 160, 85, 135]
  },
  chartTwo: {
    key: "2",
    time: ["01", "03", "05", "07", "09", "11", "13", "15"],
    mount: [100, 85, 270, 360, 230, 160, 85, 135]
  },
  chartThree: {
    key: "3",
    time: ["01", "03", "05", "07", "09", "11", "13", "15"],
    mount: [100, 85, 270, 360, 230, 160, 85, 135]
  }
});


    return {
      state,
factory,
      moveSteamView,
      data
    };
  }
};
</script>

<style>
.electronic {
  color: white;
}
</style>


