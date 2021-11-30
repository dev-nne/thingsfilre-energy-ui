<template>
<div class="chart-title"> <i class="fas fa-circle-notch"></i>전력 Sankey Chart</div>
    <v-chart class="chart" :option="option" />
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
        const datalist = [
                {
            name: "전체전력"
        },
        {
            name: "염색조"
        },
        {
            name: "회전기기"
        },
        {
            name: "염색조1호기"
        },
        {
            name: "염색조2호기"
        },
        {
            name: "염색조3호기"
        },
        {
            name: "모터1호기"
        },
        {
            name: "모터2호기"
        },
        {
            name: "모터3호기"
        }

    ];
    const linksData = [
        {
            source: "전체전력",
            target: "염색조",
            value: 7000
        },
        {
            source: "전체전력",
            target: "회전기기",
            value: 3000
        },
      {
            source: "염색조",
            target: "염색조1호기",
            value: 1200
        },
        {
            source: "염색조",
            target: "염색조2호기",
            value: 800
        },
        {
            source: "염색조",
            target: "염색조3호기",
            value: 5000
        },
        {
            source: "회전기기",
            target: "모터1호기",
            value: 1100
        },
        {
            source: "회전기기",
            target: "모터2호기",
            value: 500
        },
        {
            source: "회전기기",
            target: "모터3호기",
            value: 1400
        }



    ];
    const Color = [
        "#61FEFF",
        "#937FE6",
        "#2B56D3",
        "#87E7AA",
        "#937FE6",
        "#FF9B97",
        "#8f23f5",
        "#0576ea",
        "#2cb8cf",
        "#8A7EE0",
        "#2cb8cf",
        "#4e70f0",
        "#1fa3de",
        "#bbc951",
        "#FFC14B",
        "#b785a6"

    ]; const Color1 = [
        "#04E0F3",
        "#682EFC",
        "#35A7FE",
        "#0DC09F",
        "#682EFC",
        "#ED6663",
        "#8f23f5",
        "#0576ea",
        "#2cb8cf",
        "#8A7EE0",
        "#2cb8cf",
        "#4e70f0",
        "#1fa3de",
        "#bbc951",
        "#FFC14B",
        "#b785a6"

    ];
    const sourceLabel = [
        "right",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left"
    ];
    const itemStyleColor = [];
    const labelSource = [];
    for (let i = 0; i < datalist.length; i++) {
        datalist[i].label = {
            normal: {
                position: sourceLabel[i]
            }
        };
        labelSource.push(sourceLabel[i]);
    }
    for (let d = 0; d < datalist.length; d++) {
        datalist[d].itemStyle = {
            normal: {
                // color: Color[d]
                    color: {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 1,
                      color: Color[d] // 0% 处的颜色
                    },
                    {
                      offset: 0,
                      color: Color1[d] // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
            }
        };
        itemStyleColor.push(datalist[d]);
    }
    const option = {
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
            trigger: "item",
            triggerOn: "mousemove",
            formatter(params) {
              const { value } = params.data;
                if (params.name === "전체전력") {
                    return `전체전력: ${params.value}`;
                }
                    if (!value && value !== 0) return 0;
                    const str = value.toString();
                    const reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
                    if (params.data.source === "전체전력") {
                        return `${params.data.target} : ${str.replace(reg, "$1,")}`;
                    }
                        return `${params.data.target} : ${str.replace(reg, "$1,")}`;
            }
        },
        series: [{
            type: "sankey",
            layout: "none",
            top: "30",
            bottom: "30",
            left: "30",
            right: "30",
            nodeGap: 15,
            nodeWidth: 25,
            focusNodeAdjacency: "allEdges",
            data: itemStyleColor,
            links: linksData,
            label: {
                normal: {
                    color: "#fff",
                    fontSize: 18,
                    formatter(params) {
                        if (params.data.name == "전체전력") {
                            const strs = params.data.name.split(""); // 字符串数组
                            let str = "";
                            for (let i = 0, s; s = strs[i++];) { // 遍历字符串数组
                                str += s;
                                if (!(i % 1)) str += "\n"; // 按需要求余
                            }
                            return `{white|${str}}`;
                        }
                            return params.data.name;
                    },
                    rich: {
                        white: {
                            fontSize: 18,
                            lineHeight: 30,
                            padding: [0, 0, 0, -26]
                        }
                    }
                }
            },
            lineStyle: {
                normal: {
                    opacity: 0.4,
                    color: "source",
                    curveness: 0.5
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: "transparent"
                }
            }
        }]
    };

    return { option };
  }
};
</script>

<style scoped></style>
