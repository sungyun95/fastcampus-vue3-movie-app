// Home, About page 출력하는 역할
<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
</style>
