<template>
  <div
    class="factory"
    v-for="factory in store.state.main.factorys"
    :key="factory.id"
    @click="linkFactory(factory)"
    :class="{ errInFactory: factory.error }"
  >
    <div class="errBlurBox" v-if="!factory.err"></div>
    <div class="factoryImg">
      <img :src="factoryImg" alt="" />
        <div class="titlebox">
        <div class="title">{{ factory.title }}</div>
      </div>
    </div>

    <div class="factoryInfo">
      <div class="energyBox">
        <div class="energyname">
          전기에너지
          <div class="enerygyStatus" :class="{ errStatus: !factory.electronic }">
             <i class="fas" :class="factory.electronic ? `fa-smile` : `fa-frown`"></i>
          </div>
        </div>
      </div>

      <div class="energyBox" v-if="factory.id !== '2005007005'">
        <div class="energyname">
          열에너지
          <div class="enerygyStatus" :class="{ errStatus: !factory.heats }">
             <i class="fas" :class="factory.heats ? `fa-smile` : `fa-frown`"></i>
            <!-- {{ factory.heats ? "양호"  : "이상" }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import factoryImg from "@/assets/factory.svg";
import {
 onMounted, reactive
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();


    const state = reactive({

    });

    const linkFactory = (target) => {
      store.state.factoryID = target.id;
      store.state.selectedFac = target;
      store.state.factoryTitle = target.title;
      router.push("elec");
    };

    return {
      state,
      linkFactory,
      factoryImg,
      store
    };
  }
};
</script>

<style></style>
