import { computed, ref } from 'vue'

export default function useTimer() {
  const timeOut = ref(false)
  const started = ref(false)
  const timer = ref<number>()

  const second = ref(0)
  const minute = ref(10)
  const hour = ref(0)

  const time = computed({
    get: () => second.value + minute.value * 60 + hour.value * 3600,
    set: (time: number) => {
      second.value = time % 60
      time = ~~(time / 60)
      minute.value = time % 60
      time = ~~(time / 60)
      hour.value = time
    },
  })

  const handler = () => {
    if (time.value <= 0) {
      timeOut.value = true
      stopTimer()
      return
    }
    time.value--
  }

  const startTimer = () => {
    timeOut.value = false
    started.value = true
    timer.value = setInterval(handler, 1000)
  }

  const stopTimer = () => {
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
