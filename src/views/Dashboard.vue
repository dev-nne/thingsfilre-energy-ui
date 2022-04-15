<template>
  <div class="dashboard">
    <TopComp :title="state.title" />
    <div class="content">
      <div class="chartBox">

        <!-- 왼쪽 차트4개 -->
      <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>일별 전력 사용량 분석</div>
         </div>

          <div class="daily-box">
            <div class="daily">
              <div class="content">
                <div class="data">
                   <span class="date">
                  {{store.state.main.daily.yesterday_time}}
                  </span>

                  <div class="value">
                     {{store.state.main.daily.yesterday_elec}}
                      <span>kWh</span>
                  </div>
                </div>
                <div class="data">
                   <span class="date">
                  {{store.state.main.daily.lastweek_time}}
                  </span>

                <div class="value">
                  {{store.state.main.daily.lastweek_elec}}
                <span>kWh</span>
                </div>
                </div>

              </div>
            </div>

            <div class="daily">
              <div class="content">
                <div class="data">
                   <span class="date">
                  이번주 평균
                  </span>

                <div class="value">
                  {{store.state.main.daily.now_week_elec}}
                <span>kWh</span>
                </div>
                </div>
                <div class="data">
                   <span class="date">
                  이번달 평균
                  </span>

                <div class="value">
                  {{store.state.main.daily.now_month_elec}}
                <span>kWh</span>
                </div>
                </div>

              </div>
            </div>

          </div>

       </div>

        <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>월별 전력 사용량 분석</div>
         <div class="toggle">
       <a-switch  v-model:checked="state.checked2" size="small" />
        </div>
         </div>
          <Line v-if="state.checked2" :elecData="state.monthly.monthly_elec" :time="state.monthly.time"/>
           <div class="table-box" v-else>
          <div class="table">
     <div class="thead">
       <div class="th">월</div>
       <div class="th">전기<span>(kWh)</span></div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in store.state.main.monthly.time" :key="index">{{data}}</div>  </div>
        <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in store.state.main.monthly.change_monthly_elec" :key="index">{{data}}</div>
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
          <BarVer v-if="state.checked3" :name="state.monthlySteam.name" :max="state.monthlySteam.max" :in_out="state.monthlySteam.in_out"/>
           <div class="table-box" v-else>
          <div class="table tableThree">
     <div class="thead">
       <div class="th">공장명</div>
       <div class="th">가동률<span>(%)</span></div>
       <div class="th">효율<span>(%)</span></div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in store.state.main.monthlySteam.site_name" :key="index">{{data}}</div></div>
       <div  class="tr">
       <div class="num td" v-for="(data,index) in store.state.main.monthlySteam.site_max_avg_percent" :key="index">{{data}}</div></div>
        <div  class="tr lasttr">
       <div class="name td" v-for="(data,index) in store.state.main.monthlySteam.site_in_out_percent" :key="index">{{data}}</div>
        </div>
   </div>
   </div>
  </div>
       </div>

        <div class="charts">
         <div class="titlebox">
         <div class="title"><i class="fas fa-circle-notch"></i>전체 스팀 설비 분류</div>
         <div class="toggle">
       <a-switch  v-model:checked="state.checked4" size="small" />
        </div>
         </div>
          <BarHor v-if="state.checked4" :trapType="state.steamCount.trapType" :count="state.steamCount.count" />
           <div class="table-box" v-else>
          <div class="table">
     <div class="thead">
       <div class="th">트랩명</div>
       <div class="th">개수</div>
     </div>
   <div class="tbody">
     <div  class="tr">
       <div class="num td" v-for="(data,index) in store.state.main.steamCount.trapType" :key="index">{{data}}</div>  </div>
        <div class="tr lasttr">
       <div class="name td" v-for="(data,index) in store.state.main.steamCount.count" :key="index">{{data}}</div>
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
import Line from "@/components/chart/Line.vue";
import BarVer from "@/components/chart/BarVer.vue";
import BarHor from "@/components/chart/BarHor.vue";
import Factory from "@/components/factory/Factory.vue";
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";


export default {
  components: {
    Map,
    TopComp,
    Line,
    BarVer,
    BarHor,
    Factory
  },
  setup() {
       const store = useStore();
        const router = useRouter();

        const state = reactive({
        title: "AI 에너지 효율화 종합 대시보드",
       checked1: true,
       checked2: true,
       checked3: true,
       checked4: true,
       monthly: computed(() => store.getters["main/lineElec"]),
       monthlySteam: computed(() => store.getters["main/monthlySteam"]),
       steamCount: computed(() => store.getters["main/steamCount"])
    });

    onMounted(() => {
       store.state.loadPage = "home";
       store.state.selectedFac = [];
       store.dispatch("main/getMainData");
       setInterval(() => {
         store.dispatch("main/getMainData");
       }, (15 * 60 * 1000));
    });

    return {
      state,
      store
    };
  }
};
</script>

<style></style>
