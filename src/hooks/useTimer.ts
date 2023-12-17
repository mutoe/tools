import { computed, ref } from 'vue'

export default function useTimer() {
  const timeOut = ref(false)
  const started = ref(false)
  const timer = ref<number>()

  const second = ref(0)
  const minute = ref(10)
  const hour = ref(0)

  const time = computed({
    get: () => (second.value ?? 0) + (minute.value ?? 0) * 60 + (hour.value ?? 0) * 3600,
    set: (time: number) => {
      second.value = time % 60
      time = Math.trunc(time / 60)
      minute.value = time % 60
      time = Math.trunc(time / 60)
      hour.value = time
    },
  })

  function handler() {
    if (time.value <= 0) {
      timeOut.value = true
      stopTimer()
      return
    }
    time.value--
  }

  function startTimer() {
    timeOut.value = false
    started.value = true
    timer.value = setInterval(handler, 1000)
  }

  function stopTimer() {
    clearInterval(timer.value)
    timer.value = undefined
    started.value = false
  }

  return {
    timeOut,
    started,
    second,
    minute,
    hour,
    startTimer,
    stopTimer,
  }
}
