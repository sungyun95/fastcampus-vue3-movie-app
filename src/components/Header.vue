<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <!-- a 태그 대신 RouterLink 컴포넌트로 관리, to 속성 -->
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path)}"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <!-- 라우터 링크 말고 다른 방법 -->
    <div
      @click="toAbout"
      class="user">
      <!-- about.js 데이터 사용 -->
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Logo from "~/components/Logo";

export default {
  components: {
    Logo,
  },
  data() {
    return {
      // navigations 배열 데이터 > 객체 데이터{name, href}
      navigations: [
        {
          name: "Search",
          href: "/",
        },
        {
          name: "Movie",
          href: "/movie/tt4520988",
          path: /^\/movie/ // '/movie'로 시작하는 경로인 경우
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    };
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ])
    /////////////////////////////
    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // }
  },
  methods: {
    isMatch(path){
      if (!path) return false
      console.log(this.$route) // fullPath 속성 확인
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      console.log('추가 로직')
      this.$router.push('/about')
    }
  }
};
</script>

<style lang="scss" scoped>

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    right: 40px;
    margin: auto;
    transition: 0.4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img{
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none
    }
  }
}
</style>
