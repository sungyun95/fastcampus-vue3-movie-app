import { createApp } from "vue";
import App from "./App.vue";
// 특정한 폴더의 index.js 파일은 생략 가능
import router from "./routes"; // = ./routes/index.js
import store from "./store"
import loadImage from "./plugins/loadImage"

createApp(App)
  .use(router) // 플러그인 연결, $route, $router
  .use(store) // store 연결 $store
  .use(loadImage) // $loadImage
  .mount("#app");
