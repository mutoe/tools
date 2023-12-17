<template>
  <h1><RouterLink to="/">Mutoe's Tools</RouterLink></h1>

  <div class="page">
    <RouterView></RouterView>
  </div>
</template>

<style lang="sass">
@import "src/variables"

#app
  height: 100vh
  display: flex
  flex-direction: column

  .page
    flex: auto

</style>
