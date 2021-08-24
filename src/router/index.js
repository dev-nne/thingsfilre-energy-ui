import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "",
    name: "home",
    component: () => import("@/views/Dashboard.vue")
  },
  {
    path: "/elec",
    name: "Electronic",
    component: () => import("@/views/FactoryElectronic.vue")
 },
    {
      path: "/steam",
      name: "Heats",
      component: () => import("@/views/FactoryHeats.vue")
 }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
