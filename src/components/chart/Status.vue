<template>
   <div class="statusInfo">
    <div class="title-box"><div class="title">
      <i class="fas fa-circle-notch"></i>스팀스랩 상태현황</div>
     <div class="toggle"  v-if="state.table" @click="toggleTable">
        <i class="fas fa-redo-alt"></i>
     </div>
      </div>

    <div class="status-box" v-if="!state.table">
      <div class="status">
        <div class="label">정상</div>
        <div class="numbering normal" @click="showTable(data1)">05</div>
      </div>

       <div class="status">
        <div class="label">이상</div>
        <div class="numbering warn" @click="showTable(data2)">01</div>
      </div>

       <div class="status">
        <div class="label">고장</div>
        <div class="numbering error" @click="showTable(data3)">01</div>
      </div>

       <div class="status">
        <div class="label">7일예측</div>
        <div class="numbering info" @click="showTable(data4)">02</div>
      </div>
    </div>


  <!-- 테이블 -->
  <div class="table-status" v-else>
   <div class="table">
     <div class="thead">
       <div class="no td">No.</div>
       <div class="name td">Name</div>
     </div>
   <div class="tbody">
     <div v-for="data in store.state.datas" :key="data.key" class="tr">
       <div class="num td">{{data.number}}</div>
       <div class="name td">{{data.name}}</div>
     </div>
   </div>
   </div>
  </div>
  </div>
</template>

<script>
  import { reactive } from "vue";
  import { useStore } from "vuex";

export default {
 setup() {
     const store = useStore();
   const state = reactive({
     table: false
   });

const data1 = [
  {
    key: "1",
    name: "AA-01",
    number: 1
  },
  {
    key: "2",
    name: "AA-02",
    number: 2
  },
  {
    key: "3",
    name: "AA-03",
    number: 3
  }, {
    key: "4",
    name: "AA-04",
    number: 4
  },
  {
    key: "5",
    name: "AA-05",
    number: 5
  }
];

const data2 = [
  {
    key: "1",
    name: "AA-01",
    number: 1
  }
];

const data3 = [
  {
    key: "1",
    name: "AA-01",
    number: 1
  }
];

const data4 = [
  {
    key: "1",
    name: "AA-01",
    number: 1
  },
  {
    key: "2",
    name: "AA-02",
    number: 2
  }
];
   const showTable = (x) => {
     console.log(x);
     store.state.datas = x;
     state.table = true;
   };

   const toggleTable = () => {
     state.table = false;
   };
   return{
 showTable,
state,
 toggleTable,
 store,
 data1,
 data2,
 data3,
 data4
};
 }
};
</script>

<style>

</style>
