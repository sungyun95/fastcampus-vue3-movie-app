import axios from "axios";
import _uniqBy from "lodash/uniqBy";

const _defaultMessage = "Search for the movie title!"

export default {
  // NAMESPACED : movie.js가 하나의 모듈화 / Module!
  namespaced: true,
  // STATE : 취급해야 하는 데이터, 상태 / Data!
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }),
  // GETTERS : 계산된 상태 / computed!
  getters: {
    // 이 프로젝트에서는 사용 안함
    // movieIds(state) { // state안에 있는 movies와 연결
    //   return state.movies.map(m => m.imdbID)
    // }
  },
  // methods!
  // MUTATIONS : 변이, state의 데이터를 변경(수정), 다른 곳(state, actions, getters)에서는 안됨!!
  mutations: {
    // movies의 데이터를 갱신
    // assignMovies (state, Search){
    //   state.movies = Search
    // },

    // 전체 통합 로직
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach((key) => {
        // 동적으로 표기
        state[key] = payload[key];
        // state.movie = payload.movie
        // state.message = payload.message,,,
      });
    },
    // 영화 목록 리셋 로직
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    },
  },
  // ACTIONS : 그 외 나머지, 비동기로 작용, 인수 context -> { state, getters, mutations 등}
  actions: {
    async searchMovies({ state, commit }, payload) {
      // context -> 중에서 { state, commit }만 사용
      // 사용자가 searchMovies를 동시에 여러번 시행하는 것 방지
      if (state.loading) return;
      // message 초기화, loading 상태 만들기
      commit("updateState", {
        message: "",
        loading: true,
      });

      try {
        console.log(state);
        console.log(commit);
        console.log(payload); // 검색 조건(title, type, number, year)

        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
        console.log(res.data);

        const { Search, totalResults } = res.data; // 찾은 영화 목록, 전체 영화 수
        // context.commit -> 구조 분해 할당으로 생략
        commit("updateState", {
          // 영화 목록에서 ID 중복 제거1
          movies: _uniqBy(Search, "imdbID"),
          // 예시
          // message: 'Hello World!',
          // loading: true
        });
        // console.log(totalResults) // 268, string
        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);
        // 추가 요청 로직
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > payload.number / 10) break;
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            commit("updateState", {
              movies: [
                ...state.movies,
                // 영화 목록에서 ID 중복 제거2
                ..._uniqBy(Search, "imdbID"),
              ],
            });
          }
        }
        // message : netlify 서버리스 함수에 있는 데이터이기 때문에 변경해야함
        // error -> { message }로 변경해도 됨
      } catch (error) {
        commit("updateState", {
          movies: [],
          message: error.message,
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      // const { id } = payload;
      if (state.loading) return;
      commit("updateState", {
        theMovie: {}, // 기존 검색된 data 비우기
        loading: true,
      });
      try {
        const res = await _fetchMovie(payload); // = {id: id}
        console.log("searchMovieWithId : ", res.data);
        commit("updateState", {
          theMovie: res.data,
          loading: false,
        });
      } catch (error) {
        commit("updateState", {
          theMovie: {},
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

// payload에는 title, page 등 속성을 가지고 있는 객체 데이터
async function _fetchMovie(payload) {
  // get(url) : 필요로 하는 정보를 주소(querystring)로 전달
  // post() : 데이터를 요청할때 body에 담아서 전달
  return await axios.post("/.netlify/functions/movie", payload)
}