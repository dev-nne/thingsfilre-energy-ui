<template>
<div class="table-status">
  <img :src="electable" alt="">

<div class="content-box">
    <div class="title">
  Power Plant Details
  </div>

  <div class="toggle">
    <a-switch  v-model:checked="state.checked1">
       <template #unCheckedChildren ><TableOutlined /></template>
      <template #checkedChildren><BarChartOutlined /></template>
    </a-switch>
  </div>

  <div class="table-box" v-if="state.checked1">
    <div class="thead">
      <div class="th one">설비분류</div>
      <div class="th one">설비분류전력</div>
      <div class="th one">설비명</div>
      <div class="th two">설비전력</div>
    </div>
    <div class="tbody">
      <div class="tr" v-for="(table,index) in table" :key="index">
        <div class="td">{{table.type}}</div>
        <div class="td right">{{table.typeE}} KW</div>
        <div class="tdbox">
          <div class="childtr" v-for="(child,index) in table.childs" :key="index">
            <div class="childtd">{{child.equip}}</div>
            <div class="childtd right">{{child.equipE}} KW</div>
            <div class="childtd progress"><a-progress stroke-linecap="square" :percent="child.per" strokeColor="#316fff" strokeWidth="20"  status="active"  :stroke-color="{
        '0%': '#316fff',
        '100%': '#31c5ff',
      }" /></div>
          </div>
          </div>
        </div>

    </div>
 </div>
  <div class="chart-box" v-else>
    <SanKey />
    </div>

  </div>
</div>
</template>

<script>
import electable from "@/assets/electable.svg";
import { reactive } from "vue";
import { BarChartOutlined, TableOutlined } from "@ant-design/icons-vue";

import SanKey from "@/components/chart/SanKey.vue";

export default {
   components: {
    BarChartOutlined,
    TableOutlined,
 SanKey
  },
setup() {
   const state = reactive({
      checked1: true

    });

    // 테이블 가라데이터
    const table = reactive([{
      type: "염색조",
      typeE: 7000,
      childs: [{
         equip: "염색조1호기",
        equipE: 1200,
        per: 56
      },
      {
         equip: "염색조2호기",
        equipE: 600,
        per: 67
      },
      {
         equip: "염색조3호기",
        equipE: 400,
        per: 77
      },
      {
         equip: "염색조4호기",
        equipE: 700,
        per: 45
      },
      {
         equip: "염색조5호기",
        equipE: 200,
        per: 87
      },
      {
         equip: "염색조6호기",
        equipE: 600,
        per: 68
      },
      {
         equip: "염색조7호기",
        equipE: 1000,
        per: 91
      }]
 },
    {
      type: "회전기기",
      typeE: 3000,
      childs: [
        {
        equip: "모터1호기",
        equipE: 120,
        per: 85
        },
         {
        equip: "모터2호기",
        equipE: 350,
        per: 88
        },
         {
        equip: "모터3호기",
        equipE: 500,
        per: 56
        },
         {
        equip: "모터4호기",
        equipE: 600,
        per: 47
        },
         {
        equip: "모터5호기",
        equipE: 400,
        per: 76
        },
         {
        equip: "모터6호기",
        equipE: 700,
        per: 80
        }
      ]
    }]);


  return { electable, state, table };
}
};
</script>

<style>

</style>
