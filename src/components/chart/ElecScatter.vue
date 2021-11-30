<template>
  <div class="elecChart">
    <div class="title"><i class="fas fa-circle-notch"></i>스캐터차트</div>
    <v-chart class="chart2" :option="option" />
  </div>
</template>

<script>
import dataArr from "@/components/data/data.json";

export default {

  setup() {
            const normalArr = [];
            const cautionArr = [];
            const warningArr = [];
            const criticalArr = [];
            const faultArr = [];

            const result = dataArr.filter((item, idx) => {
              if(idx % 10 === 0) return item;
            });
            for (let i = 0; i < result.length; i++) {
                const obj = result[i];

                const l_arr = [parseFloat(obj.Feature1), parseFloat(obj.Feature2), obj.State];
                if (obj.State === "0") normalArr.push(l_arr);
                if (obj.State === "1") cautionArr.push(l_arr);
                if (obj.State === "2") warningArr.push(l_arr);
                if (obj.State === "3") criticalArr.push(l_arr);
                if (obj.State === "4") faultArr.push(l_arr);
            }


        const option = {
backgroundColor: "rgba(0,0,0,0)",
                                    title: {
                                        // text: 'Health Feature Space',
                                        textStyle: {
                                            color: "#fff"
                                        },
                                        left: "center"
                                    },
                                    legend: {
                                        right: "0",
                                        top: 26,
                                        data: ["Normal", "Warning", "Critical", "Fault"],
                                        textStyle: {
                                            color: "#fff"
                                        }
                                    },
                                    xAxis: {
                                        name: "Feature 1",
                                        nameLocation: "middle",
                                        nameGap: 30,
                                        nameTextStyle: {
                                            color: "#777"
                                        },
                                        axisLabel: {
                                            color: "rgb(193, 197, 206)"
                                        },
                                        splitLine: {
                                            lineStyle: {
                                                type: "dashed",
                                                color: "rgba(255, 255, 255, 0.22)"
                                            }
                                        },
                                        axisLine: {
                                            lineStyle: {
                                                color: "rgba(255, 255, 255, 0.22)"
                                            }
                                        }
                                        // max: 8,
                                        // min: -20,
                                    },
                                    yAxis: {
                                        name: "Feature 2",
                                        nameLocation: "middle",
                                        nameGap: 30,
                                        nameTextStyle: {
                                            color: "#777"
                                        },
                                        axisLabel: {
                                            color: "rgb(193, 197, 206)"
                                        },
                                        splitLine: {
                                            lineStyle: {
                                                type: "dashed",
                                                color: "rgba(255, 255, 255, 0.22)"
                                            }
                                        },
                                        axisLine: {
                                            lineStyle: {
                                                color: "rgba(255, 255, 255, 0.22)"
                                            }
                                        },
                                        scale: true
                                    },
                                    tooltip: {
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
                                            data: normalArr,
                                            type: "scatter",
                                            symbolSize: 2,
                                            itemStyle: {
                                                color: "#2B56D3"
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
										name: "1",
										// data: jsonData.warning_data,
										data: cautionArr,
										type: "scatter",
										symbolSize: 2,
										itemStyle: {
											color: "#04E0F3"
										},
										large: true,
										tooltip: {
											formatter(obj) {
												return "";
											}
										}
									}
                                    ]
                              };



    return { option };
  }
};
</script>

<style scoped></style>
