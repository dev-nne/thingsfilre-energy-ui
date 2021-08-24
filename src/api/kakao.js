import axios from "axios";

const kakaoFetch =
 axios.create({
    baseURL: "https://dapi.kakao.com/v2/search/web",
    headers: {
      Authorization: "KakaoAK fe8c8bee6578199c763e75d4141faac5"
    },
    params: { query: "시화공단" }
  });


export default kakaoFetch;
