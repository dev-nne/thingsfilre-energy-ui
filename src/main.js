import { createApp } from "vue";
import Antd from "ant-design-vue";
import store from "@/store";
import router from "@/router/index";
import axios from "axios";
import VueAxios from "vue-axios";
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";


import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent
} from "echarts/components";

import "ant-design-vue/dist/antd.css";
import "@/assets/style/common.scss";
import "mapbox-gl/dist/mapbox-gl.css";

// Echart 설정
import {
 BarChart, LineChart, PieChart, SankeyChart, ScatterChart, EffectScatterChart
} from "echarts/charts";

import App from "./App.vue";

use([
  CanvasRenderer,
  BarChart,
  EffectScatterChart,
  LineChart,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  TooltipComponent,
  SankeyChart,
  ToolboxComponent,
  ScatterChart,
  DataZoomComponent
]);


createApp(App)
    .use(Antd)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .component("v-chart", ECharts)
    .mount("#app");
