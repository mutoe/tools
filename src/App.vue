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

*
  box-sizing: inherit

body
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: $primary
  margin: 0
  box-sizing: border-box

  a
    color: $link-color

input[type=number]
  -moz-appearance: textfield
  appearance: textfield
  margin: 0

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0

</style>
