<template>
  <div ref="timeElement" class="timer" :class="{ started }">
    <div class="setup" :class="{ hidden: isFullscreen && started && !isMoving }">
      <div class="time-picker">
        <input
          v-model.number="hourPlan"
          :class="{ hidden: !hourPlan && started }"
          type="text"
          :maxlength="2"
          placeholder="00"
          @keydown.enter="onStart"
          @blur="hourPlan = filterInput($event)"
          @wheel.prevent="hourPlan = onWheel($event.deltaY, hourPlan, 11)"
        >
        <span :class="{ hidden: !hourPlan && started }">:</span>
        <input
          v-model.number="minutePlan"
          type="text"
          :maxlength="2"
          placeholder="10"
          @keydown.enter="onStart"
          @blur="minutePlan = filterInput($event)"
          @wheel.prevent="minutePlan = onWheel($event.deltaY, minutePlan, 59)"
        >
        <span>:</span>
        <input
          v-model.number="secondPlan"
          type="text"
          :maxlength="2"
          placeholder="00"
          @keydown.enter="onStart"
          @blur="secondPlan = filterInput($event)"
          @wheel.prevent="secondPlan = onWheel($event.deltaY, secondPlan, 59)"
        >
      </div>
      <button v-if="!started" @click="onStart">Start</button>
      <button v-if="started" @click="onStart">Restart</button>
      <button @click="toggleFullscreen">Fullscreen</button>
    </div>
    <time :class="{ timeOut, withHour: hour > 0 }" @click="togglePause">
      <template v-if="hour > 0">
        {{ hour }}
        <span v-show="!started || !(second % 2)">:</span>
      </template>
      {{ padTime(minute) }}
      <span v-show="!started || !(second % 2)">:</span>
      {{ padTime(second) }}
    </time>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import throttle from 'lodash/throttle'
import useFullscreen from 'src/hooks/useFullscreen'
import useMouseMoving from 'src/hooks/useMouseMoving'
import useTimer from 'src/hooks/useTimer'

const timeElement = ref<HTMLTimeElement>()
const { isFullscreen, toggleFullscreen } = useFullscreen(timeElement)
const { minute, second, hour, startTimer, stopTimer, timeOut, started } = useTimer()
const { isMoving } = useMouseMoving()

function filterInput(value: Event | number | string | null | undefined): undefined | number {
  if (value === null || value === undefined)
    return undefined
  if (typeof value === 'number')
    return value
  if (typeof value === 'object' && value.target && 'value' in value.target)
    value = String(value.target.value)
  if (typeof value === 'string')
    return Number.parseInt(value) >= 0 ? Number.parseInt(value) : undefined
}

const onWheel = throttle((value: number, currentValue: number | undefined, max: number) => {
  const sign = value > 0 ? 1 : -1
  return Math.min(max, Math.max(0, (currentValue ?? 0) + sign))
}, 100)

const initSecond = filterInput(localStorage.getItem('second')) ?? undefined
const initMinute = filterInput(localStorage.getItem('minute')) ?? 10
const initHour = filterInput(localStorage.getItem('hour')) ?? undefined

const secondPlan = ref<number | undefined>(initSecond)
const minutePlan = ref<number | undefined>(initMinute)
const hourPlan = ref<number | undefined>(initHour)

function refreshTimer([newSecond, newMinute, newHour]: [number | undefined, number | undefined, number | undefined], save = false) {
  stopTimer()
  second.value = filterInput(newSecond) ?? initSecond ?? 0
  minute.value = filterInput(newMinute) ?? initMinute ?? 0
  hour.value = filterInput(newHour) ?? initHour ?? 0
  if (save) {
    newSecond ? localStorage.setItem('second', String(newSecond)) : localStorage.removeItem('second')
    newMinute ? localStorage.setItem('minute', String(newMinute)) : localStorage.removeItem('minute')
    newHour ? localStorage.setItem('hour', String(newHour)) : localStorage.removeItem('hour')
  }
}

watch([secondPlan, minutePlan, hourPlan], val => refreshTimer(val, true))

onMounted(() => refreshTimer([initSecond ?? 0, initMinute ?? 0, initHour ?? 0]))

function onStart() {
  refreshTimer([secondPlan.value ?? 0, minutePlan.value ?? 0, hourPlan.value ?? 0])
  nextTick(startTimer)
}
function togglePause() {
  if (started.value)
    stopTimer()
  else startTimer()
}

const padTime = (time: number): string => String(time).padStart(2, '0')
</script>

<style lang="stylus">
@keyframes blinker {
  70% {
    color $secondary
  }
}
</style>

<style lang="stylus" scoped>
.timer {
  display flex
  height 100%
  flex-direction column
  align-items center
  padding 48px
  background $primary

  &:not(&.started) {
    background $secondary
  }
}

.hidden {
  opacity 0
  transition opacity 0.3s
}

.setup {
  display flex
  align-items stretch
  margin-bottom 24px
  color $white

  .time-picker {
    display flex
    box-sizing content-box

    input,
    span {
      padding 0.2em 0
      background transparent
      color $white
      font-family monospace
      font-size 500%
    }

    input {
      width 1.2em
      padding 0.2em
      border none
      outline none
      text-align right

      &:focus {
        background rgba($primary, 10%)
      }
    }
  }

  button {
    width 7em
    height 100%
    padding 8px 0
    margin-left 24px
    background transparent
    color $white
    font-size 200%
    border()
  }
}

time {
  display flex
  width 100%
  flex auto
  flex-wrap nowrap
  align-items center
  justify-content center
  color #eee
  cursor pointer
  font-size min(60vh, 36vw)

  &.withHour {
    font-size min(60vh, 23vw)
  }

  &.timeOut {
    animation blinker 1s ease infinite
  }
}
</style>
