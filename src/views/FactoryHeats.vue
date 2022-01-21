<template>
<div class="energy steam">
    <TopComp :title="state.title" />

  <div class="content">
    <div class="chartBox">
       <Status class="charts" />

       <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>스팀 설비 분류</div>
         <div class="toggle">
    <a-switch  v-model:checked="state.checked1" size="small" />
  </div>
         </div>
          <SteamBar v-if="state.checked1" :count="state.getCount.count" :trapType="state.getCount.trapType"/>
           <div class="table-box" v-else>
          <div class="table">
     <div class="thead">
       <div class="th">트랩명</div>
       <div class="th">개수</div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in state.getCount.trapType" :key="index">{{data}}</div>  </div>
        <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in state.getCount.count" :key="index">{{data}}</div>
        </div>
   </div>
   </div>
  </div>
       </div>
       <div class="charts chartTwo">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>스팀트랩 진단분석</div>
         <div class="toggle">
    <a-switch  v-model:checked="state.checked2" size="small" />
  </div>
         </div>
          <SteamScatterChart v-if="state.checked2" :data="store.state.steam.diagnosticData" :errData="store.state.steam.errorDiagnosticData" />
           <div class="table-box" v-else>
   <div class="table">
     <div class="thead">
       <div class="th name">설비명</div>
       <div class="th status">상태</div>
     </div>
   <div class="tbody">
     <div class="body-box">
       <div class="tr name">
       <div class="td" v-for="(data,index) in store.state.steam.diagnosticTableData.name" :key="index">{{data}}</div>
     </div>
     <div  class="tr lasttr status">
       <div class="td" :class="{errTd: data}" v-for="(data,index) in store.state.steam.diagnosticTableData.status" :key="index">{{data ? '이상' : '정상'}}</div>
     </div>
     </div>
   </div>
   </div>
  </div>
    </div>
    </div>
     <div class="steamsBox">
       <div class="title"><i class="fas fa-circle-notch"></i>설비별 상태</div>
        <a-tabs type="card" v-model:activeKey="store.state.steam.trapTap" class="trapTab" @change="clickTab">
          <a-tab-pane key="1" tab="스팀트랩">
            <div class="steams" v-if="store.state.steam.mapkey === 1">
                <Steam @clickEvent="moveSteamView"/>
              </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="전력설비">
            <div class="elecs"  v-if="store.state.steam.mapkey === 2">
               <Elec @clickEvent="moveSteamView"/>
              </div>
          </a-tab-pane>
        </a-tabs>

  </div>
  <SteamPostion @clickEvent="moveSteamView"/>

  <div class="unity-view">
      <iframe src="./SewangFactory/index.html" class="unity" id="unityIFrame"/>
  </div>
  </div>
</div>
</template>

<script>
import TopComp from "@/components/topMenu/TopComp.vue";
import Status from "@/components/chart/Status.vue";
import SteamBar from "@/components/chart/SteamLine.vue";
import SteamScatterChart from "@/components/chart/SteamScatterChart.vue";
import Steam from "@/components/steams/Steam.vue";
import Elec from "@/components/steams/Elec.vue";
import SteamPostion from "@/components/steams/SteamPosition.vue";
import {
 onMounted, reactive, computed, watch
} from "vue";
import { useStore } from "vuex";

export default {
    components: {
    TopComp,
    Status,
    SteamBar,
    SteamScatterChart,
    Elec,
 Steam,
 SteamPostion
},
  setup() {
      const store = useStore();
       const state = reactive({
        title: `${store.state.selectedFac.title} 스팀트랩 상태 대시보드`,
       checked1: true,
       checked2: true,
       checked3: true,
       getCount: computed(() => store.getters["steam/getCount"])
    });

     onMounted(() => {
       store.state.loadPage = "steam";
       store.dispatch("steam/getSteamData");
      setInterval(() => {
         store.dispatch("steam/getSteamData");
       }, (15 * 60 * 1000));
    });

    watch(() => store.state.steam.steamStatusCall,
        () => {
      const unity = document.getElementById("unityIFrame");
      const steamView = unity.contentWindow || unity.contentDocument;
      if(store.state.steam.steamStatus.length !== 0) {
        steamView.setData(store.state.steam.steamStatus);
      }
    });

     const moveSteamView = (value) => {
       console.log(value);
      const unity = document.getElementById("unityIFrame");
      const steamView = unity.contentWindow || unity.contentDocument;
         steamView.handelSteamView(value);
    };

     const moveElecView = (value) => {
      const unity = document.getElementById("unityIFrame");
      const steamView = unity.contentWindow || unity.contentDocument;
         steamView.handelElecView(value);
    };

    const clickTab = (value) => {
      const unity = document.getElementById("unityIFrame");
      const steamView = unity.contentWindow || unity.contentDocument;
      if(value === "1") {
        store.state.steam.mapkey = 1;
        steamView.ChangeTrapToElec(1000);
      }else {
        store.state.steam.mapkey = 2;
        steamView.ChangeElecToTrap(2000);
      }
    };


    return {
      state,
      moveSteamView,
      clickTab,
      store
    };
  }
};
</script>

<style>
.electronic {
  color: white;
}
</style>


