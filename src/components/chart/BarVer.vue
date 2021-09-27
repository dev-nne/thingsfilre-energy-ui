<template>
    <v-chart class="chart2" :option="option" />
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        backgroundColor: "#12131a",
        padding: 4,
        position: "right",
        textStyle: {
          fontSize: 14,
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
        textStyle: {
          fontSize: 14
        },
        itemHeight: 2,
        itemWidth: 12,
        itemGap: 8,
        orient: "horizontal"
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "0",
        top: "30%",
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
          data: ["23", "24", "01", "02", "03", "04", "05"],
          axisLabel: { fontSize: 14 },
          axisLine: { lineStyle: { width: 0.5 } },
          axisTick: {
            show: false
          },
          boundaryGap: ["10%", "10%"]
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: { fontSize: 14 }
        }
      ],
      color: ["#316FFF", "#00BD56", "#85EF47", "#F9FD50"],
      series: [
        {
          name: "a",
          type: "bar",
          symbol: "emptyCircle",
          data: [20, 50, 150, 230, 213, 156, 85],
          barWidth: "30%",
          barGap: "30%"
        }
      ]
    });

    return { option };
  }
});
</script>

<style scoped></style>
