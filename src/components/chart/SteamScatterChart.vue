<template>
    <v-chart class="chart2" :option="option" />
</template>

<script>
import scatterBG from "@/assets/csvjson.json";

import { computed, reactive, watch } from "vue";

export default {
 props: ["data", "errData"],
  setup(props) {
    const state = reactive({
      tempInOutData: computed(() => {
        const data = [];
        for(let i = 0; i < scatterBG.length; i++) {
          data.push([scatterBG[i].intemp, scatterBG[i].outtemp]);
        }
        return data;
      }),
      diagnosticData: computed(() => JSON.parse(JSON.stringify(props.data))),
      errorDiagnosticData: computed(() => JSON.parse(JSON.stringify(props.errData)))
    });

    const convertData = (data) => {
      const result = [];
      for(let i = 0; i < data.inOut.length; i++) {
        result.push({
          seriesName: data.site_name[i],
          name: `${data.site_name[i]}<br/>${data.time[i]}<br/>${data.point_Name[i]}`,
          value: data.inOut[i]
        });
      }
      return result;
    };

    watch(state, () => {
      option.series[1].data = convertData(state.diagnosticData);
      option.series[2].data = convertData(state.errorDiagnosticData);
      console.log(option.series[1].data);
    });

    const option = reactive({
      tooltip: {
        trigger: "item",
        backgroundColor: "#12131a",
        padding: 4,
        position: "right",
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
         confine: true,
        axisPointer: {
          snap: true
        }
      },
      backgroundColor: "rgba(0,0,0,0)",
      legend: {
        show: false
      },
      grid: {
        left: "0",
        right: "1%",
        bottom: "2%",
        top: "10%",
        containLabel: true
      },
      dataZoom: [
				{
					type: "inside",
					start: 0,
					end: 100
				}
			],
      xAxis: [{
        type: "value",
                boundaryGap: true,
                axisLine: {
                    lineStyle: {
                        color: "#5D96C4"
                    }
                },
                axisLabel: {
                    show: true,
                        color: "#5D96C4",
                        fontSize: 10
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#192B45"
                    }
                },
                axisTick: {
                    show: true
                }

    }],
       yAxis: [{
        splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#192B45"
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#192B45"
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#5D96C4",
                            padding: 2,
                            fontSize: 12
                        }
                    },
                    axisTick: {
                        show: false
                    }
    }],
      series: [
        {
          type: "scatter",
										symbolSize: 3,
										itemStyle: {
											color: "#344a69"
										},
										large: true,
          data: state.tempInOutData,
          tooltip: {
            show: false
          }
        },
        {
          type: "scatter",
										symbolSize: 8,
										itemStyle: {
											color: "#85EF47"
										},
										large: true,
          data: convertData(state.diagnosticData),
          tooltip: {
            formatter (params) {
              return params.name;
            }
          }
        },
        {
          type: "effectScatter",
          symbolSize: 8,
										itemStyle: {
											color: "#f32424"
										},
										large: true,
          rippleEffect: {
            brushType: "stroke",
            scale: 3.5
          },

          data: convertData(state.errorDiagnosticData),
          tooltip: {
            formatter (params) {
              return params.name;
            }
          }
        }
      ]
    });

    return { option, convertData };
  }
};
</script>

<style scoped></style>
