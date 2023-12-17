import { type Ref, onMounted, onUnmounted, ref } from 'vue'

export default function useFullscreen(element: Ref<HTMLElement | undefined>) {
  const isFullscreen = ref(false)

  const handler = (e: Event) => {
    isFullscreen.value = document.fullscreenElement === e.target
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement)
      document.exitFullscreen?.()
    else
      element.value?.requestFullscreen?.()
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handler)
  })

  return {
    isFullscreen,
    toggleFullscreen,
  }
}
