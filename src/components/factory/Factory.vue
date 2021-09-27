<template>
  <div
    class="factory"
    v-for="factory in state.factorys"
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

      <div class="energyBox">
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
      factorys: [
        {
          id: 0,
          title: "티앨비",
          status: "가동중",
          electronic: true,
          heats: true,
          error: false,
          location: [126.7851598, 37.3196074]
        },
        {
          id: 1,
          title: "세광염직",
          status: "가동중",
          electronic: true,
          heats: true,
          error: false,
          location: [126.7785937, 37.3196284]
        },
        {
          id: 2,
          title: "YH교역",
          status: "가동중",
          error: true,
          electronic: false,
          heats: true,
          location: [126.7939726, 37.3044567]
        },
        {
          id: 3,
          title: "동환무역",
          status: "가동중",
          electronic: true,
          heats: true,
          error: false,
          location: [126.7933043, 37.3068236]
        },
        {
          id: 4,
          title: "선일씨앤티",
          status: "가동중",
          electronic: true,
          heats: true,
          error: false,
          location: [126.7963612, 37.3040123]
        },
        {
          id: 5,
          title: "우성염직",
          status: "가동중",
          electronic: true,
          heats: true,
          error: false,
          location: [126.7993333, 37.3054562]
        }
      ]
    });


   onMounted(() => {
      store.state.factorys = state.factorys;
    });

    const linkFactory = (target) => {
      sessionStorage.setItem("factory", JSON.stringify(target));
      store.state.selectedFac = target;
      router.push("elec");
    };

    return {
      state,
      linkFactory,
 factoryImg
    };
  }
};
</script>

<style></style>
