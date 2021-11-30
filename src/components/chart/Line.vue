<template>
    <v-chart class="chart2" :option="option" />
</template>

<script>

import {
  reactive, computed, watch
} from "vue";

export default {


  props: ["elecData", "time"],
  setup(props) {
    const state = reactive({
      elec: computed(() => props.elecData),
      time: computed(() => props.time)
    });

    watch(state, () => {
      option.xAxis[0].data = state.time;
      option.series[0].data = state.elec;
    });

    const option = reactive({
      tooltip: {
        trigger: "axis",
        formatter (params) {
          const rander = params.map((item) => (item.value !== undefined ? `<div> <span style="font-size:12px; color:#ddd">${item.seriesName}:</span> ${item.seriesName === "전기" ? `${item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <span style="font-size:10px; color:#ccc">kWh</span>` : `${item.value} <span style="font-size:10px; color:#ccc">%</span>`}</div>` : "")).join("");
          return `<span style="color:#84a9ff; font-size:16px;  font-weight:bold">${params[0].axisValue}월</span> ${rander}`;
        },
        backgroundColor: "#12131a",
        padding: 4,
        borderColor: "#1543AF",
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
        show: false
      },
      grid: {
        left: "18%",
        right: "10",
        bottom: "15%",
        top: "18%"
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
          data: state.time,
          axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#5D96C4",
                            padding: 2,
                            fontSize: 12
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
                    },
         axisTick: {
                        show: false
                    }
        }
      ],
      yAxis: [
        {
          type: "value",
          scale: false,
          splitNumber: 3,
          interval: 1500000,
          axisLine: {
                        show: true,
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
              overflow: "truncate",
              width: 50,
              formatter: "{value}kwh"
          },
          splitLine: {
              show: true,
              lineStyle: {
                  color: "#31526d"
              }
          }
        },
         {
          type: "value",
          scale: false,
          interval: 30,
          splitNumber: 3,
          axisLine: {
                        show: true,
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
                         overflow: "truncate",
                        width: 45,
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
          name: "전기",
          type: "bar",
          symbol: "emptyCircle",
          symbolSize: 4,
          data: state.elec,
           barGap: "-100%",
            barWidth: "60%",
          areaStyle: {
            color: "#316FFF",
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
