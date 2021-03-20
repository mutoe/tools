<template>
  <div :class="['timer', { started }]" ref="timeElement">
    <div class="setup" :class="{ hidden: isFullscreen && started && !isMoving }">
      <div class="time-picker">
        <input type="text" :maxlength="2" placeholder="00" @keydown.enter="onStart" @blur="filterInput" v-model.number="hourPlan">
        <span>:</span>
        <input type="text" :maxlength="2" placeholder="10" @keydown.enter="onStart" v-model.number="minutePlan">
        <span>:</span>
        <input type="text" :maxlength="2" placeholder="00" @keydown.enter="onStart" v-model.number="secondPlan">
      </div>
      <button v-if="!started" @click="onStart">Start</button>
      <button v-if="started" @click="onStart">Restart</button>
      <button @click="toggleFullscreen">Fullscreen</button>
    </div>
    <time :class="{ timeOut, withHour: hour > 0 }" @click="togglePause">
      <template v-if="hour > 0">
        {{ hour }}
        <span v-show="!(second % 2)">:</span>
      </template>
      {{ padTime(minute) }}
      <span v-show="!(second % 2)">:</span>
      {{ padTime(second) }}
    </time>
  </div>
</template>

<script lang="ts" setup>
import useFullscreen from 'src/hooks/useFullscreen'
import useMouseMoving from 'src/hooks/useMouseMoving'
import useTimer from 'src/hooks/useTimer'
import { nextTick, onMounted, ref, watch } from 'vue'

const timeElement = ref<HTMLTimeElement>(null)
const { isFullscreen, toggleFullscreen } = useFullscreen(timeElement)
const { minute, second, hour, startTimer, stopTimer, timeOut, started } = useTimer()
const { isMoving } = useMouseMoving()

const initSecond = +localStorage.getItem('second') || undefined
const initMinute = +localStorage.getItem('minute') || undefined
const initHour = +localStorage.getItem('hour') || undefined
const secondPlan = ref<number>(initSecond)
const minutePlan = ref<number>(initMinute)
const hourPlan = ref<number>(initHour)

const refreshTimer = ([ newSecond, newMinute, newHour ], save = false) => {
  stopTimer()
  second.value = newSecond ?? initSecond
  minute.value = newMinute ?? initMinute
  hour.value = newHour ?? initHour
  if (save) {
    newSecond && localStorage.setItem('second', newSecond)
    newMinute && localStorage.setItem('minute', newMinute)
    newHour && localStorage.setItem('hour', newHour)
  }
}

watch([ secondPlan, minutePlan, hourPlan ], val => refreshTimer(val, true))
onMounted(() => refreshTimer([ initSecond, initMinute, initHour ]))

const onStart = () => {
  refreshTimer([ secondPlan.value, minutePlan.value, hourPlan.value ])
  nextTick(startTimer)
}
const togglePause = () => {
  if (started.value) stopTimer()
  else startTimer()
}
const filterInput = (ev: Event<HTMLInputElement>) => {
  console.log(ev.target.value)
}

const padTime = (time: number): string => String(time).padStart(2, '0')
</script>

<style lang="sass" scoped>
@import "src/variables"

.timer
  height: 100%
  display: flex
  flex-direction: column
  align-items: center
  background: $primary
  padding: 48px

  &:not(&.started)
    background: $secondary


.setup
  display: flex
  align-items: stretch
  margin-bottom: 24px
  color: $white

  &.hidden
    transition: opacity .3s
    opacity: 0

  .time-picker
    display: flex
    @include border
    box-sizing: content-box

    input,
    span
      font-family: monospace
      font-size: 500%
      padding: 0.2em 0
      background: transparent
      color: $white

    input
      padding: 0.2em
      border: none
      width: 1.2em
      text-align: right
      outline: none

      &:focus
        background: rgba($primary, 10%)

  button
    font-size: 200%
    @include border
    background: transparent
    padding: 8px 0
    margin-left: 24px
    height: 100%
    color: $white
    width: 7em

time
  flex: auto
  display: flex
  flex-wrap: nowrap
  justify-content: center
  align-items: center
  width: 100%
  color: #eee
  font-size: min(60vh, 36vw)
  cursor: pointer

  &.withHour
    font-size: min(60vh, 23vw)

  &.timeOut
    animation: blinker 1s ease infinite

</style>

<style lang="sass">
@import "src/variables"

@keyframes blinker
  70%
    color: $secondary
</style>
