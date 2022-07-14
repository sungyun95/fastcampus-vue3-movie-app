<template>
  <div class="about">
    <div class="photo">
      <Loader
        v-if="imageLoading"
        absolute />
      <img
        :src="image"
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>
<script>
import Loader from '~/components/Loader'
import { mapState } from 'vuex'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  // 라이프사이클에는 비동기 X
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      // loadImage 플러그인
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  },
  // vuex helper 로 정리
  computed: {
    // ...mapState(모듈, 상태 배열) = 객체 데이터 반환
    ...mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
    ]),
    //////////////////
    // image() {
    //   // about 모듈, 
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
    // email() {
    //   return this.$store.state.about.email
    // },
    // blog() {
    //   return this.$store.state.about.blog
    // },
    // phone() {
    //   return this.$store.state.about.phone
    // }
  }
}
</script>

<style lang="scss" scoped>

.about {
  text-align: center;
  .photo {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>