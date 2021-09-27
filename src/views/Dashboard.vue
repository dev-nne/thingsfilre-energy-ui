<template>
  <div class="dashboard">
    <TopComp :title="state.title" />
    <div class="content">
      <div class="chartBox">

        <!-- 왼쪽 차트4개 -->
      <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>에너지 효율 현황</div>
         <div class="toggle">
       <a-switch  v-model:checked="state.checked1" size="small" />
        </div>
         </div>
          <Pie v-if="state.checked1"/>
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
         <div class="title"><i class="fas fa-circle-notch"></i>월별 에너지 사용량 분석</div>
         <div class="toggle">
       <a-switch  v-model:checked="state.checked2" size="small" />
        </div>
         </div>
          <Line v-if="state.checked2"/>
           <div class="table-box" v-else>
          <div class="table">
     <div class="thead">
       <div class="th">시간</div>
       <div class="th">사용량</div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in data.chartTwo.time" :key="index">{{data}}</div>  </div>
        <div  class="tr lasttr">
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
          <BarVer v-if="state.checked3"/>
           <div class="table-box" v-else>
          <div class="table">
     <div class="thead">
       <div class="th">시간</div>
       <div class="th">사용량</div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in data.chartThree.time" :key="index">{{data}}</div>  </div>
        <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in data.chartThree.mount" :key="index">{{data}}</div>
        </div>
   </div>
   </div>
  </div>
       </div>

        <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>에너지 효율 현황</div>
         <div class="toggle">
       <a-switch  v-model:checked="state.checked4" size="small" />
        </div>
         </div>
          <BarHor v-if="state.checked4"/>
           <div class="table-box" v-else>
          <div class="table">
     <div class="thead">
       <div class="th">시간</div>
       <div class="th">사용량</div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in data.chartFour.time" :key="index">{{data}}</div>  </div>
        <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in data.chartFour.mount" :key="index">{{data}}</div>
        </div>
   </div>
   </div>
  </div>
       </div>

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
import { onMounted, reactive } from "vue";


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

        const state = reactive({
     title: "AI 에너지 효율화 종합 대시보드",
       checked1: true,
       checked2: true,
       checked3: true,
       checked4: true
    });

    onMounted(() => {
       sessionStorage.setItem("page", "home");
       store.state.selectedFac = [];
    });

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
  },
   chartFour: {
    key: "4",
    time: ["01", "03", "05", "07", "09", "11", "13", "15"],
    mount: [100, 85, 270, 360, 230, 160, 85, 135]
  }
});

    return {
      state, data
    };
  }
};
</script>

<style></style>
