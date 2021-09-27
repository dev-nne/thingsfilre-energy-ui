<template>
  <div>
    <div class="title"><i class="fas fa-circle-notch">
      </i>{{ store.state.steamsModalTitle }} In/Out</div>
    <v-chart class="chart" :option="option" />
  </div>
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  setup() {
    const store = useStore();
    const option = ref({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        backgroundColor: "#12131a",
        padding: 4,
        position: "right",
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
        axisPointer: {
          type: "cross",
          label: {
            show: false
          }
        }
      },
      backgroundColor: "rgba(0,0,0,0)",
      legend: {
        right: 0,
        show: false,
        data: ["전기", "스팀"],
        textStyle: {
          fontSize: 10
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: "vertical"
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "0",
        top: "10%",
        containLabel: true
      },
      polar: {
        tooltip: {
          show: false
        }
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["23", "24", "01", "02", "03", "04", "05", "06"],
          axisLabel: { fontSize: 9 },
          axisLine: { lineStyle: { width: 0.5 } },
          axisTick: {
            length: 2
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: { fontSize: 9 }
        }
      ],
      color: ["#316FFF", "#00BD56", "#85EF47", "#F9FD50"],
      series: [
        {
          name: "전기",
          type: "line",
          symbol: "emptyCircle",
          symbolSize: 4,
          data: [20, 50, 150, 230, 200, 270, 350, 320],
          areaStyle: {
            color: "#316FFF",
            opacity: 0.2
          }
        }

      ]
    });

    return { option, store };
  }
});
</script>

<style scoped></style>
