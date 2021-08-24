<template>
  <div>
    <div class="title"><i class="fas fa-circle-notch"></i>스팀스랩 진단분석</div>
    <v-chart class="chart2" :option="option" />
  </div>
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

export default defineComponent({
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: "axis",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        backgroundColor: "#12131a",
        padding: 4,
        position: "right",
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
        axisPointer: {

            lineStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: "rgba(0, 255, 233,0)"
                    }, {
                        offset: 0.5,
                        color: "rgba(255, 255, 255,1)"
                    }, {
                        offset: 1,
                        color: "rgba(0, 255, 233,0)"
                    }],
                    global: false
                }
            }
        }
      },
      backgroundColor: "rgba(0,0,0,0)",
      legend: {
        right: 0,
        data: ["전기", "스팀"],
        textStyle: {
          fontSize: 10
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: "vertical"
      },
      grid: {
        left: "3%",
        right: "3%",
        bottom: "0",
        top: "30%",
        containLabel: true
      },
      polar: {
        tooltip: {
          show: false
        }
      },
      xAxis: [{
        type: "category",
        axisLine: {
            show: true
        },
        splitArea: {
            // show: true,
            color: "#f00",
            lineStyle: {
                color: "#f00"
            }
        },
        axisLabel: {
            color: "#fff", fontSize: 9
        },
        splitLine: {
            show: false
        },
        boundaryGap: false,
        data: ["23", "24", "01", "02", "03", "04", "05", "06"]

    }],
       yAxis: [{
        type: "value",
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
            show: true,
            lineStyle: {
              color: ["#fff"],
              opacity: 0.06
            }
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false,
            margin: 20,
            textStyle: {
              fontSize: 10,
              color: "rgba(255,255,255,0.5)"
            }
        },
        axisTick: {
            show: false
        }
    }],
      color: ["#316FFF", "#00BD56", "#85EF47", "#F9FD50"],
      series: [
        {
          name: "스팀",
          type: "line",
           smooth: true,
          symbol: "emptyCircle",
          symbolSize: 4,
          data: [100, 85, 270, 360, 230, 160, 85, 135],

           areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#316FFF"
                  },
                  {
                    offset: 1,
                    color: "#316fff11"
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
                normal: {
                    color: "#316FFF",
                    shadowColor: "rgba(0, 0, 0, 0)",
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5
                }
            },
            label: {
                show: true,
                position: "top",
                textStyle: {
                    color: "#ccc",
                    fontSize: 10
                }
            },
            itemStyle: {
                color: "#316FFF",
                borderColor: "#316FFF",
                borderWidth: 5,
                shadowColor: "rgba(0, 0, 0, 0)",
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2
            }
        }
      ]
    });

    return { option };
  }
});
</script>

<style scoped></style>
