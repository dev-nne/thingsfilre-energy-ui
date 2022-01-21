<template>
    <v-chart class="chart2" :option="option" />
</template>

<script>

import {
  reactive, computed, watch
} from "vue";

export default {


  props: ["name", "max", "in_out"],
  setup(props) {
    const state = reactive({
      name: computed(() => props.name),
      max: computed(() => props.max),
      in_out: computed(() => props.in_out)
    });

    watch(state, () => {
      option.xAxis[0].data = state.name;
      option.series[0].data = state.max;
      option.series[1].data = state.in_out;
    });

    const option = reactive({
      tooltip: {
        trigger: "axis",
        formatter (params) {
          const rander = params.map((item) => `<div><span style="font-size:12px; color:#ddd">${item.seriesName}:</span> ${item.value} <span style="font-size:10px; color:#ddd">%</span>`);

          return `<span style="color:#84a9ff; font-size:16px;  font-weight:bold">${params[0].axisValue}</span> ${rander}`;
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
      legend: {
        right: 0,
        data: ["스팀 가동률", "스팀 효율"],
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
        itemHeight: 2,
        itemWidth: 12,
        itemGap: 6,
        orient: "horizontal"
      },
      grid: {
        left: "5",
        right: "5",
        bottom: "5",
        top: "25",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: ["10%", "10%"],
          data: state.name,
          axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: "#5D96C4",
                            padding: 2,
                            fontSize: 10
                        },
                        overflow: "truncate",
                        width: 45
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
                    },
         axisTick: {
                        show: true
                    }
        }
      ],
      yAxis: [
         {
          type: "value",
          axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#31526d"
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#5D96C4",
                            padding: 2,
                            fontSize: 11
                        },
                        formatter: "{value}%"
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#31526d"
                        }
                    }
        }
      ],
      dataZoom: [
				{
					type: "inside",
					start: 0,
					end: 100
				}
			],
      color: ["#316FFF", "#00BD56", "#85EF47", "#F9FD50"],
      series: [
        {
          name: "스팀 가동률",
          type: "bar",
          data: state.max,
           barGap: "0",
            barWidth: "30%",
          areaStyle: {
            color: "#316FFF",
            opacity: 0.2
          }
        },
        {
          name: "스팀 효율",
          type: "bar",
          data: state.in_out,
          barGap: "0",
            barWidth: "30%",
          areaStyle: {
            color: "#00BD56",
            opacity: 0.2
          }
        }
      ]
    });

    return { option };
  }
};
</script>

<style scoped></style>
