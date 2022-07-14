<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

// Font Oswald, 색상 변경
<style lang="scss" scoped>

.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black; // bootstrap 내 variables.scss의 $black 색상 사용
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>
