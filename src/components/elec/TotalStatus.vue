<template>
  <div class="total-status" @click="showCostModal">
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
  <a-modal v-model:visible="state.visible" width="60vw"
    @cancel="handleOk" :footer="null" :maskClosable="false" class="ppTrendModal">
      <PowerPlantDetailsModal/>
  </a-modal>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import PowerPlantDetailsModal from "@/components/elec/PowerPlantDetailsModal";

export default {
  components: { PowerPlantDetailsModal },
  setup() {
    const store = useStore();
    const state = reactive({
      visible: false
    });

    const handleOk = (e) => {
      state.visible = false;
      store.state.elec.ppModalSelectKey = "today";
    };

    const showCostModal = () => {
      state.visible = true;
      store.dispatch("elec/getPPDetailModalData");
    };


    return{
 store, showCostModal, state, handleOk
};
  }
  };
</script>

<style>

</style>
