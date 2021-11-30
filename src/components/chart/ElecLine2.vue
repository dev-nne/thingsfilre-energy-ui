<template>
 <div class="elecChart" >
    <div class="title"><i class="fas fa-circle-notch"></i>하루 전력 사용량 예측 그래프</div>
    <v-chart class="chart2" :option="option" /></div>
</template>

<script>

import { reactive, computed, watch } from "vue";

export default {
  props: ["data"],
  setup(props) {
   const state = reactive({
      time: computed(() => props.data.time),
      real_value: computed(() => props.data.real_value),
      predict_value: computed(() => props.data.predict_value),
      limit: computed(() => props.data.limit),
      today: computed(() => {
        const num = state.real_value.indexOf(null);
        return state.time[num - 1];
      })
    });

    watch(state, () => {
      option.series[0].data = state.real_value;
      option.series[1].data = state.predict_value;
      option.series[2].data = state.limit;
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
   grid: {
        left: "2%",
        right: "2%",
        bottom: "5%",
        top: "15%",
        containLabel: true
      },
       legend: {
          top: 5,
        right: 0,
        data: ["사용량", "예측사용량"],
        textStyle: {
          fontSize: 12,
          color: "#ccc"
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: "horizontal"
      },
     xAxis:
            {
                type: "category",
                boundaryGap: false,
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
    yAxis:
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
                },
                dataZoom: [
				{
					type: "inside",
					start: 0,
					end: 100
				}
			],
    series: [
        {
            name: "사용량",
            type: "line",
            data: state.real_value,
            symbol: "circle",
            symbolSize: 5,
            lineStyle: {
              color: "#113CFC",
               width: 3
            },
            itemStyle: {
              color: "#113CFC"
            }
        },
        {
            name: "예측사용량",
            type: "line",
            symbol: "circle",
            symbolSize: 6,
            lineStyle: {
             type: "dotted",
              color: "#00BCD4",
              width: 2
            },
            itemStyle: {
              color: "#00BCD4"
            },
            data: state.predict_value,
             markLine: {
              // silent: false,
              // symbol: "circle",
              // symbolSize: 5,
              lineStyle: {
                type: "solid",
                  width: 1,
                  color: "#69DADB"
              },
              // label: {
              //   fontSize: 10,
              //   color: "#69DADB"
              // },
              data: [{
                  xAxis: state.today
              }]
          }
        },
        {
            name: "임계치",
            type: "line",
            symbol: "none",
            lineStyle: { width: 1, color: "#ff3344", type: "dashed" },
             itemStyle: {
              color: "#ff3344"
            },
            data: state.limit
        }

    ]
});
    return { option };
  }
};
</script>

