<template>
  <div class="container" :class="{ typing }">
    <textarea
      v-model="text"
      class="text-input"
      name=""
      rows="10"
    />
    <label>
      <span>Speed</span>
      <input v-model="speed" type="number" placeholder="speed">
    </label>
    <label>
      <span>Cursor</span>
      <input
        v-model="cursor"
        type="text"
        maxlength="1"
        placeholder="cursor"
      >
    </label>
    <label>
      <span>Padding</span>
      <input
        v-model="padding"
        title="vertical horizontal"
        type="text"
        placeholder="padding"
      >
    </label>
    <label>
      <span>Background</span>
      <input v-model="backgroundColor" type="color">
    </label>
    <label>
      <span>Text Color</span>
      <input v-model="textColor" type="color">
    </label>
    <div class="buttons">
      <button v-if="!typed" @click="onInit">Start</button>
      <button v-else @click="onInit">Restart</button>
      <button v-if="typed && !typing" title="Space key" @click="onStart">Continue <kbd>Space</kbd></button>
      <button v-else-if="typed" title="Space key" @click="onStop">Pause <kbd>Space</kbd></button>
      <button v-if="typed" title="Backspace key" @click="onReset">Clear <kbd>Backspace</kbd></button>
      <button v-if="typed" title="Enter key" @click="onReset">Fullscreen <kbd>Enter</kbd></button>
    </div>

    <div
      ref="fullscreenRef"
      class="typewriter-container"
      :class="{ isFullscreen }"
    >
      <div :key="refresh">
        <span id="typewriter" ref="typewriterElement" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import Typed from 'typed.js'
import useFullscreen from 'src/hooks/useFullscreen'

const typewriterElement = ref<HTMLTimeElement>()
const fullscreenRef = ref<HTMLTimeElement>()
const { isFullscreen, toggleFullscreen } = useFullscreen(fullscreenRef)

const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at eaque expedita illo iste laborum numquam pariatur possimus quasi, quibusdam rem sapiente sed sunt ut voluptas. Esse maiores optio temporibus.')
const speed = ref(50)
const cursor = ref('_')
const padding = ref('8px 16px')
const backgroundColor = ref('#112233')
const textColor = ref('#ddeeff')
const typed = ref<Typed>()
const typing = ref(false)
const refresh = ref(1)

function onInit() {
  refresh.value++
  nextTick(() => {
    typed.value = new Typed(typewriterElement.value, {
      strings: text.value.split('\n'),
      typeSpeed: speed.value,
      cursorChar: cursor.value,
    })
    onReset()
    toggleFullscreen()
    setTimeout(() => {
      onStart()
    }, 500)
  })
}

function onStart() {
  typed.value?.start()
  typing.value = true
}

function onStop() {
  typed.value?.stop()
  typing.value = false
}

function onReset() {
  onStop()
  typed.value?.reset()
}

watch(isFullscreen, () => {
  if (!isFullscreen.value)
    onStop()
})

function keydownHandler(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  if (!target || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
    return
  switch (event.code) {
    case 'Space': {
      if (typing.value)
        onStop()
      else
        onStart()
      break
    }
    case 'Enter': {
      toggleFullscreen()
      break
    }
    case 'Backspace': {
      onReset()
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', keydownHandler)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keydownHandler)
})
</script>

<style lang="stylus">
@keyframes blinker {
  70% {
    color $secondary
  }
}
</style>

<style lang="stylus" scoped>
.container {
  display flex
  height 100%
  flex-direction column
  align-items center
  padding 48px
  background v-bind(backgroundColor)
}

.text-input {
  width 100%
  margin-bottom 16px
  color v-bind(textColor)
  text-align left
}

.typewriter-container {
  width 100%
  background v-bind(backgroundColor)
  color v-bind(textColor)
  font-size 3rem
  text-align left

  &.isFullscreen {
    padding v-bind(padding)
  }
}

.buttons {
  margin-top 8px
}

label {
  display flex
  height 48px
  flex-direction row
  align-items center
  padding 8px
  border-radius 4px
  background rgba(0, 0, 0, 0.1)

  span {
    display inline-flex
    width 8em
    height 100%
    align-items center
    justify-content flex-end
    margin-right 8px
  }

  span + * {
    width 10em
    height 100%
    padding 4px
    font-size 0.9rem
  }
}

input, textarea {
  border 2px solid currentColor
  background transparent
  color inherit
}

button {
  padding 8px 16px
  border 2px solid $white
  margin-right 8px
  background transparent
  color inherit

  &:last-child {
    margin-right 0
  }
}

kbd {
  padding 0 2px
  border 1px solid currentColor
  font-size 0.8em
  vertical-align baseline
}
</style>
