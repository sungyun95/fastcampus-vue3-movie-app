// node.js 환경
const axios = require("axios");

exports.handler = async function (event) {
  // movie.js _fetchmovie 함수를 서버리스 함수 내에서 실행되도록
  console.log(event)
  const payload = JSON.parse(event.body)

  const { title, type, year, page, id } = payload; // -> URL 검색
  const OMDB_API_KEY = "7035c60c";
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  

  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400, // 잘못된 요청 처리
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }

  // 기존 로직 삭제
  // return new Promise((resolve, reject) => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       // 예외 처리
  //       console.log("_fetchMovie res : ", res); // status는 200이어도 데이터를 가지고 오지 못하는 에러 발생 가능
  //       if (res.data.Error) {
  //         reject(res.data.Error);
  //       }
  //       resolve(res);
  //     })
  //     .catch((err) => {
  //       reject(err.message);
  //     });
  // });
}