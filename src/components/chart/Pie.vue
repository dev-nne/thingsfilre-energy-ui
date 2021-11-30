<template>
  <div>
    <v-chart class="chart" :option="option" />
    <div class="chartLabel">
      <div class="label">
        <div class="name">전기</div>
        <div class="num1 num">{{state.elec}}<span>mwh</span> </div>
      </div>
      <div class="label">
        <div class="name">스팀</div>
        <div class="num2 num">{{state.steam}}<span>t</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
 reactive, watch, computed
} from "vue";

export default {
   props: ["elecData", "steamData"],
  setup(props) {
    const state = reactive({
      elec: computed(() => props.elecData.slice(-1)[0]),
      steam: computed(() => props.steamData.slice(-1)[0]),
      elecV: computed(() => (state.elec / (state.elec + state.steam)) * 100),
      steamV: computed(() => (state.steam / (state.elec + state.steam)) * 100)
    });

    watch(state, () => {
      option.series[0].data[0].value = state.elecV;
      option.series[0].data[1].value = state.steamV;
    });

    const option = reactive({
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c}%",
        position: "right",
        textStyle: {
          fontSize: 15,
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
          fontSize: 12,
          color: "#fff"
        },
        itemHeight: 2,
        itemWidth: 10,
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
          center: ["55%", "59%"],
          data: [
            {
              name: "전기",
              value: state.elecV,
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
              name: "스팀",
              value: state.steamV,
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

    return { option, state };
  }
};
</script>

<style scoped></style>
