import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/elec",
    name: "Electronic",
    component: () => import("@/views/FactoryElectronic.vue"),
    meta: { requiresAuth: true }
 },
  {
      path: "/steam",
      name: "Heats",
      component: () => import("@/views/FactoryHeats.vue"),
      meta: { requiresAuth: true }
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/LoginView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



router.beforeEach((to, from, next) => {
  if (!store.state.isLogin) {
    if (to.path === "/") {
      next();
		} else {
      next("/");
		}
    window.history.forward();
	} else if (to.path === "/" && store.state.isLogin) {
      window.history.forward();
      next("/home");
		}else if(to.path === "/home" && store.state.userId !== "admin") {
      router.go(-1);
    }else {
      next();
		}
});
export default router;
