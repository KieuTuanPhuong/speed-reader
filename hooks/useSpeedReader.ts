'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseSpeedReaderProps {
  text: string
  wpm: number
}

export const useSpeedReader = ({ text, wpm }: UseSpeedReaderProps) => {
  const [words, setWords] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Parse text into words whenever it changes
  useEffect(() => {
    const parsedWords = text.trim().split(/\s+/)
    const timeout = setTimeout(() => {
      setWords(parsedWords)
      setCurrentIndex(0)
      setIsPlaying(false)
    }, 0)
    return () => clearTimeout(timeout)
  }, [text])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentIndex(0)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    if (isPlaying && currentIndex < words.length) {
      const msPerWord = 60000 / wpm

      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, msPerWord)
    } else if (currentIndex >= words.length) {
      timeoutId = setTimeout(() => setIsPlaying(false), 0)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isPlaying, currentIndex, words.length, wpm])

  return {
    currentWord: words[currentIndex] || '',
    progress: words.length > 0 ? (currentIndex / words.length) * 100 : 0,
    isPlaying,
    togglePlay,
    reset,
    currentIndex,
    totalWords: words.length,
  }
}
