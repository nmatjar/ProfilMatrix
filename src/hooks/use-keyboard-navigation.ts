import { useEffect, useCallback } from 'react'
import { useToast } from './use-toast'

interface UseKeyboardNavigationProps {
  areas: Array<{ id: string; name: string }>
  currentAreaId: string
  onAreaChange: (areaId: string) => void
}

export function useKeyboardNavigation({
  areas,
  currentAreaId,
  onAreaChange,
}: UseKeyboardNavigationProps) {
  const { toast } = useToast()

  const showShortcutToast = useCallback((areaName: string) => {
    toast({
      title: "Nawigacja",
      description: `Przełączono na: ${areaName}`,
      duration: 1500,
    })
  }, [toast])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Ignoruj skróty podczas pisania w polach input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return
    }

    const currentIndex = areas.findIndex(area => area.id === currentAreaId)
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
      case 'h': // vim-style
        newIndex = Math.max(0, currentIndex - 1)
        break
      case 'ArrowRight':
      case 'l': // vim-style
        newIndex = Math.min(areas.length - 1, currentIndex + 1)
        break
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        const numericIndex = parseInt(event.key) - 1
        if (numericIndex < areas.length) {
          newIndex = numericIndex
        }
        break
      default:
        return
    }

    if (newIndex !== currentIndex) {
      const newArea = areas[newIndex]
      onAreaChange(newArea.id)
      showShortcutToast(newArea.name)
    }
  }, [areas, currentAreaId, onAreaChange, showShortcutToast])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
}
