<template>
  <div class="container">
    <div
      :class="{ 'no-result': !movies.length }"
      class="inner">
      <Loader v-if="loading" />
      <div
        class="message"
        v-if="message">
        {{ message }}
      </div>
      <div
        class="movies"
        v-else>
        <MovieItem
          v-for="movie in movies"
          :key="movie.imbdID"
          :movie="movie" />
        <!-- :movie = props -->
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from "~/components/MovieItem";
import Loader from '~/components/Loader';
import { mapState } from 'vuex';

export default {
  components: {
    MovieItem, Loader
  },
  computed: {
    ...mapState('movie',[
      'movies',
      'message',
      'loading'
    ])
    // movies() {
    //   // $store : vuex store 객체, state : index.js 모듈들, movie : movie.js를 의미
    //   console.log(this.$store.state);
    //   // movie : movie.js, movies : state안의 movies 배열
    //   return this.$store.state.movie.movies;
    // },
    // message() {
    //   return this.$store.state.movie.message;
    // },
    // loading() {
    //   return this.$store.state.movie.loading;
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
