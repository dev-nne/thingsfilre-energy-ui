<template>
  <div class="total-status">
    <div class="elec-box">
      <div class="title">
        월 평균 전력사용량
      </div>
      <div class="num">
        <div class="used">{{state.monthly.value}} <span>MW</span></div>
       <div class="variation"
      :class="{'red' : state.monthlyV , 'blue' : !state.monthlyV }">
      <i class="fas"
      :class="{ 'fa-arrow-up' : state.monthlyV , 'fa-arrow-down' : !state.monthlyV }"></i>{{Math.abs(state.monthly.value - state.monthly.prev)}}</div>
      </div>
    </div>

   <div class="elec-box">
      <div class="title">
        일 평균 전력사용량
      </div>
      <div class="num">
         <div class="used" >{{state.daily.value}} <span>MW</span> </div>
      <div class="variation"
      :class="{'red' : state.dailyV , 'blue' : !state.dailyV }">
      <i class="fas"
      :class="{ 'fa-arrow-up' : state.dailyV , 'fa-arrow-down' : !state.dailyV }"></i>
      {{Math.abs(state.daily.value - state.daily.prev)}}</div>
      </div>
    </div>

   <div class="elec-box">
      <div class="title">
        현재시간 평균 전력사용량
      </div>
      <div class="num">
        <div class="used">{{state.now.value}} <span>MW</span></div>
        <div class="variation"
      :class="{ 'red' : state.nowV, 'blue' : !state.nowV }"><i class="fas"
      :class="{ 'fa-arrow-up' : state.nowV,'fa-arrow-down' : !state.nowV }"></i>
      {{Math.abs(state.now.value - state.now.prev)}}</div>

      </div>

    </div>
  </div>
</template>

<script>
  import { computed, reactive } from "vue";

export default {
setup() {
  const state = reactive({
    monthly: {
     value: 643000,
     prev: 642000
    },
     daily: {
     value: 408946,
     prev: 442358
    },
     now: {
     value: 372206,
     prev: 371124
    },
    monthlyV: computed(() => state.monthly.value > state.monthly.prev),
    dailyV: computed(() => state.daily.value > state.daily.prev),
    nowV: computed(() => state.now.value > state.now.prev)
  });


  return{ state };
}
};
</script>

<style>

</style>
