<template>
    <v-chart class="chart" :option="option"/>
</template>

<script>
import {
  reactive, computed, watch
} from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const state = reactive({
      series: []
    });

    const colors = ["#00b3f4", "#73faff", "#74ff97"];
    const borderColors = ["#00b3f4da", "#73faffc7", "#74ff97c7"];
    const areaColors = ["#00b3f43b", "#73faff40", "#74ff973e"];
 let holiday = [];
    const setWatchingData = (data) => {
       const dataArr = [
        {
          name: "유효전력",
          data: []
        },
        {
          name: "무효전력",
          data: []
        }
      ];
      for(let i = 0; i < data.length; i++) {
        dataArr[0].data.push([data[i].dev_time * 1000, data[i].act_kwh]);
        dataArr[1].data.push([data[i].dev_time * 1000, data[i].react_kwh]);
      }

      const seriesData = [];
      for(let i = 0; i < dataArr.length; i++) {
       seriesData.push({
          name: dataArr[i].name,
          type: "line",
          symbol: "circle",
          smooth: true,
          symbolSize: 4,
          data: dataArr[i].data,
          lineStyle: {
                        color: colors[i],
                        width: 1
                },
          itemStyle: {
            borderColor: borderColors[i],
            color: colors[i]
        },
         areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              r: 0,
              colorStops: [
                { offset: 0, color: borderColors[i] },
                { offset: 0.5, color: areaColors[i] }
              ],
              global: false
            }
          }
        });
      }
      const holidayArr = data.filter((list) => list.holiday === 1);
         holiday = holidayArr.map((list) => list.dev_time * 1000);

      return seriesData;
    };

    const option = reactive({
      tooltip: {
        trigger: "axis",
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
        },
        formatter: (params) => (
                 `<div style="color:${holiday.includes(params[0].axisValue) ? "#ff4d4d" : "#578ebb"}; font-weight:600;">${params[0].axisValueLabel}</div>
                 <div style="font-size:12px; color:#ddd; line-height:24px; display:flex; align-items:center" ><div style="width:16px; margin-right:4px; height:4px; background:${params[0].borderColor}"></div>유효전력: <span style="font-size:14px; color:#fff; font-weight:600; margin-left:8px;">${params[0].value[1].toLocaleString()} <span style="font-size:14px;font-weight:400;">Wh</span></span></div>
                 <div style="font-size:12px; color:#ddd; display:flex; align-items:center"><div style="width:16px; margin-right:4px; height:4px; background:${params[1].borderColor}"></div>무효전력: <span style="font-size:14px; color:#fff; font-weight:600; margin-left:8px;">${params[1].value[1].toLocaleString()} <span style="font-size:14px;font-weight:400;">Wh</span></span</div>`
               )
      },
      backgroundColor: "rgba(0,0,0,0)",
      legend: {
        show: false
      },
      grid: {
        left: "1%",
        right: "1%",
        bottom: "1%",
        top: "10%",
        containLabel: true
      },
      polar: {
        tooltip: {
          show: false
        }
      },
      xAxis: {
            type: "time",
            axisLine: {
                show: true,
                  onZero: false,
                lineStyle: {
                    color: "#31526d"
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#49789e",
                    width: 1.5
                }
            },
            axisLabel: {
                 color(value) {
                  return holiday.includes(value) ? "#f32424" : "#578ebb";
                },
                fontSize: "12px"
            },
            boundaryGap: [0.01, 0.01],
            splitNumber: 0,
            minorSplitLine: {
              show: false,
                lineStyle: {
                    color: "#49789e",
                    width: 1.5
                }
            }
        },
      yAxis: [{
            type: "value",
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(53, 75, 94, 0.5)"
                }
            },
            axisLine: {
                show: false,
                onZero: false,
                lineStyle: {
                    color: "#31526d"
                }
            },
            axisLabel: {
                show: true,
                margin: 6,
                color: "#31526d",
                fontSize: "12px"
            }
        }],
      dataZoom: [
				{
					type: "inside",
					start: 0,
					end: 100
				}
			],
      series: computed(() => setWatchingData(store.state.steam.tempModalChartData))
    });

    return { option };
  }
};
</script>

<style scoped></style>
