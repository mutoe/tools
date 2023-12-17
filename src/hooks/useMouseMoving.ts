import { onMounted, onUnmounted, ref } from 'vue'

export default function useMouseMoving() {
  const isMoving = ref(true)

  let timer: number = Number.NaN

  const handler = () => {
    isMoving.value = true
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      isMoving.value = false
      timer = Number.NaN
    }, 3000)
  }

  onMounted(() => {
    document.addEventListener('mousemove', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', handler)
  })

  return { isMoving }
}
