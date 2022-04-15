<template>
  <div class="login">
      <video src="@/assets/loginbg.mp4" class="bg-video" autoplay muted loop></video>

    <div class="content">
      <div class="title">AI 에너지 효율화<br/>종합 대시보드</div>
      <div class="login-box">
        <div class="input-box">
          <input type="text" placeholder="ID"  autocomplete="new-password" v-model="state.id">
          <input type="password" placeholder="PW"  autocomplete="new-password" v-model="state.pw" @keypress.enter="requestLogin">
        </div>

        <div class="login-btn" @click="requestLogin">LOGIN
          <div class="icon"><i class="fas fa-water"></i></div>
        </div>
      </div>
    </div>
      <div class="logo-box">
      <img src="@/assets/thingpirelogo.png" alt="" class="logo">
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import LoginInfo from "../../public/login.json";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      id: "",
      pw: ""
    });

  const requestLogin = () => {
    if(state.id === "" || state.pw === "") {
       message.warning("양식을 완성해 주세요");
       return;
    }
    const user = LoginInfo.loginInfo.filter((list) => list.id === state.id);
    const userPw = user.filter((list) => list.pw === state.pw);

    if(userPw.length === 0) {
      message.warning("아이디나 비밀번호를 확인해주세요");
      return;
    }
    store.state.isLogin = true;
    store.state.userId = state.id;
    if(state.id === "admin") {
      router.push("/home");
    }else{
      const factory = store.state.main.factorys.filter((list) => list.id === state.id);
      store.state.selectedFac = factory;
      store.state.factoryTitle = factory[0].title;
      store.state.factoryID = state.id;
      router.push("/elec");
    }
  };

    return{
      store,
      requestLogin,
      state
    };
  }
};
</script>

<style>

</style>
