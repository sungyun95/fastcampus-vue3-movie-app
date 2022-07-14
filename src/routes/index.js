// route 페이지 구성 파일
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import Movie from "./Movie";
import About from "./About";
import NotFound from "./NotFound"

export default createRouter({
  // (Hash) Hash, Histroy 모드 중 Hash 모드 사용
  // https://google.com/#/search : # -> 페이지를 찾을 수 없음 방지
  history: createWebHashHistory(),
  // (Pages) 웹사이트의 페이지 구분
  // https://google.com/ : 메인 페이지를 의미함
  scrollBehavior() {
    return { top:0 }
  },
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movie/:id",
      component: Movie,
    },
    {
      path: "/about",
      component: About,
    },
    { path: '/:notFound(.*)',
      component: NotFound }
  ],
});
