import { useRef, useEffect } from 'react'

export const useAudio = () => {
  const audioRef = useRef(null)

  const playSound = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})
  }

  useEffect(() => {
    audioRef.current = new Audio('/sounds/ting-sound.mp3')
  }, [])

  return { playSound }
}