<template>
    <v-chart class="chart2" :option="option" />
</template>

<script>
import {
 computed, reactive, watch
} from "vue";

export default {
 props: ["count", "trapType"],
  setup(props) {
    const state = reactive({
      trapType: computed(() => props.trapType),
      count: computed(() => props.count)
    });

    watch(state, () => {
      option.series[0].data = state.count;
      option.xAxis[0].data = state.trapType;
    });

const option = reactive({
      tooltip: {
        trigger: "axis",
        formatter: "{b} : {c}개",
        backgroundColor: "#12131a",
        padding: 4,
        position: "right",
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
         borderColor: "#316FFF"
      },
      backgroundColor: "rgba(0,0,0,0)",
      legend: {
        show: false
      },
      grid: {
        left: "2%",
        right: "2%",
        bottom: "0%",
        top: "18%",
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
        data: state.trapType

    }],
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
    }],
      series: [
        {
          name: "스팀",
          type: "bar",
           smooth: true,
          symbol: "emptyCircle",
          symbolSize: 4,
          data: state.count,
          barWidth: "30%",
          barGap: "30%",
            itemStyle: {
                color: "#316FFF"
            }
        }
      ]
    });

    return { option };
  }
};
</script>

<style scoped></style>
