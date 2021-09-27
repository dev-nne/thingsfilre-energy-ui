<template>
 <div class="elecChart" >
    <div class="title"><i class="fas fa-circle-notch"></i>라인그래프</div>
    <v-chart class="chart2" :option="option" /></div>
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
   const dateArr = [];
  const dataArr = [];
  const dataArr2 = [];
    const dataArr3 = [];
let dataValue = 0;
for(let i = 1; i <= 30; i++) {
   dateArr.push(i);

   if(i < 25) {
      dataArr.push(dataValue);

      if(i === 24) {
          dataArr2.push(dataValue);
      } else {
          dataArr2.push(null);
      }
   } else {
      dataArr2.push(dataValue);
   }

   dataArr3.push(110);
   const randomNum = Math.floor(Math.random() * 10);
   dataValue += randomNum;
}
const option = {
  backgroundColor: "rgba(0,0,0,0)",
    tooltip: {
        trigger: "axis"
    },
    grid: {
        left: "1%",
        right: "3%",
        bottom: "10%",
        top: "20%",
        containLabel: true
      },
       legend: {
        right: 0,
        data: ["전기", "전기예상"],
        textStyle: {
          fontSize: 14
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: "horizontal"
      },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: dateArr
    },
    yAxis: {
        type: "value",
        axisLabel: {
            formatter: "{value}"
        }

    },
    series: [
        {
            name: "전기",
            type: "line",
            data: dataArr

        },
        {
            name: "전기예상",
            type: "line",
            lineStyle: {
             type: "dotted"
         },
            data: dataArr2
        },
        {
            name: "임계치",
            type: "line",
            symbol: "none",
            lineStyle: { width: 1, color: "#ff3344", type: "dashed" },
            data: dataArr3
        }

    ]
};
    return { option };
  }
});
</script>

