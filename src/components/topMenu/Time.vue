<template>
  <div class="timer">
    {{ this.time }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: ""
    };
  },
  mounted() {
    this.getTime();
  },
  methods: {
    getTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const week = date.getDay();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const setYear = year < 10 ? `0${year}` : year;
      const setMonth = month < 10 ? `0${month}` : month;
      const setDay = day < 10 ? `0${day}` : day;
      const sethours = hours < 10 ? `0${hours}` : hours;
      const setMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const setSeconds = seconds < 10 ? `0${seconds}` : seconds;
      let setWeek = "";
      switch (week) {
        case 0:
          setWeek = "일요일";
          break;
        case 1:
          setWeek = "월요일";
          break;
        case 2:
          setWeek = "화요일";
          break;
        case 3:
          setWeek = "수요일";
          break;
        case 4:
          setWeek = "목요일";
          break;
        case 5:
          setWeek = "금요일";
          break;
        case 6:
          setWeek = "토요일";
          break;
        default:
          setWeek = "";
          break;
      }

      this.time = `${setYear}.${setMonth}.${setDay}. ${setWeek} ${sethours}:${setMinutes}:${setSeconds}`;

      setTimeout(() => {
        this.getTime();
      }, 1000);
    }
  }
};
</script>

<style></style>
