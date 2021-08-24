import { createApp } from "vue";
import store from "@/store";
import router from "@/router/index";
import axios from "axios";
import VueAxios from "vue-axios";
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import "@/assets/style/common.scss";
import "mapbox-gl/dist/mapbox-gl.css";

// Echart 설정
import { BarChart, LineChart, PieChart } from "echarts/charts";
import App from "./App.vue";

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  TooltipComponent
]);

const app = createApp(App);
app.component("v-chart", ECharts);
app.use(router);
app.use(store);
app.use(VueAxios, axios);

app.mount("#app");

// createApp(App)
// .use(router)
// .use(store)
// .use(VueAxios, axios)
// .mount("#app");

