<template>
  <nav>
    <RouterLink class="item" to="/timer">Timer</RouterLink>
  </nav>
</template>

<style lang="stylus" scoped>
nav
  display: grid
  grid-template-columns: 1fr
  width: max(960px, 90%)
  margin: 64px auto 0

  .item
    border()
    font-size: 150%
    width: 50%
    margin: 0 auto
    height: min(100px, 20vh)
    display: flex
    align-items: center
    justify-content: center

</style>
