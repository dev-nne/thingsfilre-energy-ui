<template>
  <div>
    <div class="title"><i class="fas fa-circle-notch"></i>에너지 효율 현황</div>
    <v-chart class="chart" :option="option" />
    <div class="chartLabel">
      <div class="label">
        <div class="name">전기</div>
        <div class="num1 num">64mwh</div>
      </div>
      <div class="label">
        <div class="name">스팀</div>
        <div class="num2 num">12.0t</div>
      </div>
    </div>
  </div>
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: "right",
        textStyle: {
          fontSize: 12,
          color: "#fff"
        },
        backgroundColor: "#12131a",
        padding: 4
      },
      backgroundColor: "rgba(0,0,0,0)",
      legend: {
        left: 0,
        bottom: 0,
        data: ["전기", "스팀"],
        textStyle: {
          fontSize: 10
        },
        itemHeight: 2,
        itemWidth: 14,
        itemGap: 6,
        orient: "vertical"
      },
      polar: {
        tooltip: {
          show: false
        }
      },
      color: ["#316FFF", "#00BD56", "#85EF47", "#F9FD50"],
      // data
      series: [
        {
          type: "pie",
          radius: "60",
          center: ["50%", "59%"],
          data: [
            {
              name: "전기",
              value: 64,
              align: "center",
              label: {
                position: "inside",
                color: "#fff",
                borderWidth: 0,
                formatter: "{b}\n{c}%",
                lineHeight: 14
              }
            },
            {
              value: 36,
              name: "스팀",
              align: "center",
              label: {
                position: "inside",
                color: "#fff",
                borderWidth: 0,
                formatter: "{b}\n{c}%",
                lineHeight: 14
              }
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });

    return { option };
  }
});
</script>

<style scoped></style>
