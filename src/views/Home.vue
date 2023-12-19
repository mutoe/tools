<template>
  <nav>
    <RouterLink class="item" to="/timer">Timer</RouterLink>
    <RouterLink class="item" to="/typewriter">Typewriter</RouterLink>
  </nav>
</template>

<style lang="stylus" scoped>
nav {
  display grid
  width max(960px, 90%)
  margin 64px auto 0
  grid-template-columns 1fr

  .item {
    border()
    display flex
    width 50%
    height min(100px, 20vh)
    align-items center
    justify-content center
    margin 0 auto 4vw
    font-size 150%
  }
}
</style>
