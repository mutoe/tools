import { onMounted, onUnmounted, Ref, ref } from 'vue'

export default function useFullscreen (element: Ref<HTMLElement>) {
  const isFullscreen = ref(false)

  const handler = (e: Event) => {
    isFullscreen.value = document.fullscreenElement === e.target
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      element.value?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
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
