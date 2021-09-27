import { createApp } from "vue";
import Antd from "ant-design-vue";
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
  GridComponent,
  ToolboxComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import "ant-design-vue/dist/antd.css";
import "@/assets/style/common.scss";
import "mapbox-gl/dist/mapbox-gl.css";

// Echart 설정
import {
 BarChart, LineChart, PieChart, SankeyChart, ScatterChart
} from "echarts/charts";


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
  TooltipComponent,
  SankeyChart,
  ToolboxComponent, ScatterChart
]);

const app = createApp(App);
app.component("v-chart", ECharts);
app.use(router);
app.use(Antd);
app.use(store);
app.use(VueAxios, axios);

app.mount("#app");

// createApp(App)
// .use(router)
// .use(store)
// .use(VueAxios, axios)
// .mount("#app");

