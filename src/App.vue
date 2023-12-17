<template>
  <h1><RouterLink to="/">Mutoe's Tools</RouterLink></h1>

  <div class="page">
    <RouterView />
  </div>
</template>

<style lang="stylus">
#app {
  display flex
  height 100vh
  flex-direction column

  .page {
    flex auto
  }
}
</style>
