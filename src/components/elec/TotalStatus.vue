<template>
  <div class="total-status">
    <div class="elec-box">
      <div class="title">
        실시간 사용량
      </div>
      <div class="num">
        <div class="used">{{store.state.elec.usage.now_kwh}}<span>kWh</span></div>
      </div>
    </div>

   <div class="elec-box">
      <div class="title">
        실시간 요금
      </div>
      <div class="num">
         <div class="used" >{{store.state.elec.usage.now_cost}}<span>원</span></div>
      </div>
    </div>

   <div class="elec-box">
      <div class="title">
        예상 사용량
      </div>
      <div class="num">
        <div class="used">{{store.state.elec.usage.future_kwh}}<span>kWh</span> </div>
      </div>

    </div>
    <div class="elec-box">
      <div class="title">
        예상 요금
      </div>
      <div class="num">
        <div class="used">{{store.state.elec.usage.future_cost}}<span>원</span></div>
      </div>

    </div>
  </div>
</template>

<script>
  import { computed, reactive } from "vue";
  import { useStore } from "vuex";

export default {
setup() {
         const store = useStore();




  return{ store };
}
};
</script>

<style>

</style>
