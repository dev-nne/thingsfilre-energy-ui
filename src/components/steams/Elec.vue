<template>
  <div
    class="elecEquip"
    v-for="elec in store.state.steam.elecStatus" :key="elec.devId"  @click="clickTrap(elec.devId)" :class="{ selected : elec.selected }">
       <div class="titlebox">
        <div class="title">{{ elec.pointName }}</div>
      </div>

    <div class="elecInfo">
      <div class="progress">
      <a-tooltip :title="`사용전력 : ${elec.total_wh} Wh &nbsp; &nbsp;    설비전력 : ${elec.maximum_wh} Wh`" :overlayStyle="{width:'150px', fontSize: '12px'}" >
              <a-progress stroke-linecap="square" :percent="elec.percent" strokeColor="#316fff" :strokeWidth="20"  status="active"  :stroke-color="{
        '0%': '#316fff',
        '100%': '#31c5ff',
      }" />
      </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  emits: ["click-event"],
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();

    const linkFactory = (target) => {
      store.state.selectedFac = target;
      router.push("elec");
    };

    const clickTrap = (value) => {
      store.commit("steam/elecTapSelect", value);
      store.commit("steam/elecTrapMapSelect", value);
      store.commit("steam/elecTrapAlign");
      emit("click-event", value);
    };


    return {
      linkFactory,
      store,
      clickTrap
    };
  }
};
</script>

<style></style>
