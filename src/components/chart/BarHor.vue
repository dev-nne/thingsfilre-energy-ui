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
        top: 10,
        data: ["a", "b", "c", "d"],
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
        top: "20%",
        containLabel: true
      },
      polar: {
        tooltip: {
          show: false
        }
      },
      xAxis: [
        {
          type: "value",
          axisLabel: { fontSize: 14 },
          axisLine: {
            show: true,
            lineStyle: {
              width: 0.5
            }
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          data: ["22", "23"],
          axisLabel: { fontSize: 14 },
          boundaryGap: ["10%", "10%"],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 0.5
            }
          }
        }
      ],
      color: ["#316FFF", "#00BD56", "#85EF47", "#F9FD50"],
      series: [
        {
          name: "a",
          type: "bar",
          symbol: "emptyCircle",
          data: [20, 50],
          barWidth: "15%",
          barGap: "30%"
        },
        {
          name: "b",
          type: "bar",
          symbol: "emptyCircle",
          data: [100, 85],
          barWidth: "15%"
        },
        {
          name: "c",
          type: "bar",
          symbol: "emptyCircle",
          data: [23, 52],
          barWidth: "15%"
        },
        {
          name: "d",
          type: "bar",
          symbol: "emptyCircle",
          data: [56, 125],
          barWidth: "15%"
        }
      ]
    });

    return { option };
  }
});
</script>

<style scoped></style>
