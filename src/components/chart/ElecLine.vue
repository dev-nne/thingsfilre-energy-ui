<template>
 <div class="elecChart" >
    <div class="title"><i class="fas fa-circle-notch"></i>한달 전력 사용량 예측 그래프</div>
    <v-chart class="chart2" :option="option" autoresize /></div>
</template>

<script>
import {
 computed, reactive, watch
} from "vue";

export default {
  props: ["data"],
  setup(props) {
    const state = reactive({
      time: computed(() => props.data.time),
      real_value: computed(() => props.data.real_value),
      predict_value: computed(() => props.data.predict_value),
      sum_value: computed(() => props.data.sum_value),
      limit: computed(() => props.data.limit),
      today: computed(() => {
        const num = state.real_value.indexOf(null);
        return state.time[num - 1];
      }),
      sum_real: computed(() => props.data.sum_real),
      sum_predict: computed(() => props.data.sum_predict)
    });

    watch(state, () => {
      option.series[0].data = state.real_value;
      option.series[1].data = state.predict_value;
      option.series[2].data = state.sum_real;
      option.series[3].data = state.sum_predict;
      option.series[4].data = state.limit;
      option.xAxis.data = state.time;
    });

const option = reactive({
    backgroundColor: "rgba(0,0,0,0)",
    tooltip: {
        trigger: "axis",
                backgroundColor: "rgba(0,0,0,0.8)",
                borderWidth: 1,
                borderColor: "rgba(25,163,223, 0.5)",
                textStyle: {
                    color: "#eee",
                    fontSize: 12
                },
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(126,199,255,0)" // 0% 处的颜色
                                },
                                {
                                    offset: 0.5,
                                    color: "rgba(126,199,255,1)" // 100% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(126,199,255,0)" // 100% 处的颜色
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    }
                }
    },
    legend: {
        top: 5,
        right: 0,
        data: ["사용량", "예측사용량", "누적사용량", "예측 누적사용량"],
        textStyle: {
          fontSize: 10,
          color: "#ccc"
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: "horizontal"
      },
    grid: {
        left: "0",
        right: "2%",
        bottom: "5%",
        top: "15%",
        containLabel: true
      },
              dataZoom: [
				{
					type: "inside",
					start: 0,
					end: 100
				}
			],
        xAxis:
            {
                type: "category",
                boundaryGap: true,
                splitNumber: 3,
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
                },
                data: state.time
            },
        yAxis: [{
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#192B45"
                        }
                    },
                    splitNumber: 3,
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
                        },
                         overflow: "truncate",
                        width: 50
                    },
                    axisTick: {
                        show: false
                    }
                },
                {
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#192B45"
                        }
                    },
                    splitNumber: 3,
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
                        },
                         overflow: "truncate",
                        width: 50
                    },
                    axisTick: {
                        show: false
                    }
                }],
        series: [
        {
          type: "bar",
           yAxisIndex: 1,
            name: "사용량",
            data: state.real_value,
            barGap: "-100%",
            barWidth: "60%",
            itemStyle: {
              color: "#113CFC"
            }
        },
        {
            name: "예측사용량",
            yAxisIndex: 1,
            type: "bar",
            barGap: "-100%",
            barWidth: "60%",
            data: state.predict_value,
            itemStyle: {
              color: "#00BCD4"
            }
        },
        {
            name: "누적사용량",
            type: "line",
            data: state.sum_real,
            symbol: "emptyCircle",
            symbolSize: 4,
            lineStyle: {
              width: 3,
              color: "#FFB319"
            },
            itemStyle: {
              color: "#FFB319"
            }
        },
        {
            name: "예측 누적사용량",
            type: "line",
            data: state.sum_predict,
            symbol: "circle",
            lineStyle: {
              type: "dotted",
              width: 3,
              color: "#C2F784"
            },
            itemStyle: {
              color: "#C2F784"
            }
        },
        {
            name: "임계치",
            type: "line",
            symbol: "none",
            lineStyle: {
              width: 1,
            color: "#ff3344",
            type: "dashed"
        },
          itemStyle: {
              color: "#ff3344"
            },
            data: state.limit
        }]
});
    return { option };
  }
};
</script>

