<template>
  <div class="elecChart">
    <div class="title"><i class="fas fa-circle-notch"></i>전력설비 진단분석</div>
    <v-chart class="chart2" :option="option" />
  </div>
</template>

<script>
import dataArr from "@/assets/scatterbg.json";
import { computed, reactive, watch } from "vue";

export default {
 props: ["data", "errData"],
  setup(props) {
      const state = reactive({
      tempInOutData: computed(() => {
        const data = [];
        for(let i = 0; i < dataArr.length; i++) {
          data.push([dataArr[i].act_kwh, dataArr[i].react_kwh]);
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
    });

        const option = reactive({
backgroundColor: "rgba(0,0,0,0)",

                                     legend: {
        show: false
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
                    grid: {
                        left: "3%",
                        right: "3%",
                        top: "8%",
                        bottom: "10%",
                        containLabel: true
                    },
                    series: [
                        {
                            name: "0",
                            // data: jsonData.normal_data,
                            data: state.tempInOutData,
                            type: "scatter",
                            symbolSize: 2,
                            itemStyle: {
                                color: "#344a69"
                            },
                            large: true,
                            tooltip: {
                                formatter(obj) {
                                    return "";
                                }
                            },
                animation: false,
                animationThreshold: 10000
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
    return { option };
  }
};
</script>

<style scoped></style>
