<template>
    <v-chart class="chart2" :option="option" />
</template>

<script>

import {
  reactive, computed, watch
} from "vue";

export default {
  props: ["trapType", "count"],
  setup(props) {
    const state = reactive({
      trapType: computed(() => props.trapType),
      count: computed(() => props.count)
    });

    watch(state, () => {
      option.yAxis[0].data = state.trapType;
      option.series[0].data = state.count;
    });

    const option = reactive({
      tooltip: {
        trigger: "axis",
        formatter (params) {
          const rander = params.map((item) => `<div><span style="font-size:12px; color:#ddd">${item.seriesName}:</span> ${item.value}`);

          return `<span style="color:#84a9ff; font-size:16px; font-weight:bold">${params[0].axisValue}</span> ${rander}`;
        },
        axisPointer: {
      type: "shadow"
    },
        backgroundColor: "#12131a",
        padding: 4,
        borderColor: "#1543AF",
        position: "right",
        textStyle: {
          fontSize: 14,
          color: "#fff"
        }
      },
      backgroundColor: "rgba(0,0,0,0)",
       grid: {
        left: "10",
        right: "5",
        bottom: "0",
        top: "15",
        containLabel: true
      },
      xAxis: [
        {
          type: "value",
          axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: "#5D96C4",
                            padding: 2,
                            fontSize: 10
                        }
                    },
          axisLine: {
            show: true,
            lineStyle: {
                color: "#31526d"
            }
          },
          splitLine: {
              show: true,
              lineStyle: {
                  color: "#31526d"
              }
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          data: state.trapType,
          axisLabel: {
          interval: 0,
          textStyle: {
                            color: "#5D96C4",
                            padding: 2,
                            fontSize: 10
                        }
},
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
          name: "count",
          type: "bar",
          data: state.count,
          barWidth: "40%",
          barGap: "30%"
        }
      ]
    });

    return { option };
  }
};
</script>

<style scoped></style>
