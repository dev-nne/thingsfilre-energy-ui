<template>
<div class="energy elec">
    <TopComp :title="state.title" /></div>
</template>

<script>
import TopComp from "@/components/topMenu/TopComp.vue";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

export default {
    components: { TopComp },
  setup() {
      const store = useStore();
       const factory = JSON.parse(sessionStorage.getItem("factory"));
         const state = reactive({
      title: `${factory.title} 전기 에너지 효율화 대시보드`
    });

     onMounted(() => {
        console.log(`dd${JSON.stringify(store.state.selectedFac)}`);
      sessionStorage.setItem("page", "elec");
    });


    return {
      state, factory
    };
  }
};
</script>

<style>
.electronic {
  color: white;
}
</style>
