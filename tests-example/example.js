// export function double(num){
//   if (!num) return 0
//   return num * 2
// }

// export function asyncFn() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Done!");
//     }, 6000);
//   });
// }

import axios from "axios";
import _upperFirst from "lodash/upperFirst";
import _toLower from "lodash/toLower";

export async function fetchMovieTitle() {
  const res = await axios.get(
    "https://omdbapi.com?apikey=7035c60c&i=tt4520988"
  );
  return _upperFirst(_toLower(res.data.Title)); // Frozen II => Frozen ii(전부 소문자 + 앞 글자만 대문자)
}

// 확인 해야하는 문제 : 영화 요청을 전송했는데 오지 않는다면?
// 데이터를 가져오는건 omdbAPI의 몫 -> 테스트 낭비..
// 데이터를 가져오는게 중요한게 아니고, 제목 변환 로직이 잘 동작하는 지 test하는 게 중요
