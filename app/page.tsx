'use client'

import { useState } from 'react'
import { useSpeedReader } from '../hooks/useSpeedReader'
import { Slider } from '@/components/ui/slider'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [wpm, setWpm] = useState(300)

  const {
    currentWord,
    progress,
    isPlaying,
    togglePlay,
    reset,
    currentIndex,
    totalWords,
  } = useSpeedReader({ text: inputText, wpm })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-2xl flex-col gap-8 rounded-2xl bg-white p-8 shadow-xl dark:border dark:border-zinc-800 dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Speed Reader
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Paste your text below and start reading faster.
          </p>
        </div>

        {/* Reader Display */}
        <div className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-xl bg-zinc-100 p-8 dark:bg-zinc-800">
          {inputText ? (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex h-20 items-center justify-center">
                <div className="text-5xl font-bold tracking-tight text-zinc-900 transition-all dark:text-zinc-50">
                  {currentWord || (isPlaying ? '' : 'Ready')}
                </div>
              </div>
              <div className="mt-6 flex w-full flex-col items-center gap-2">
                <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div
                    className="h-full bg-black transition-all duration-100 dark:bg-white"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {currentIndex} / {totalWords} words
                </div>
              </div>
            </div>
          ) : (
            <div className="text-zinc-400 dark:text-zinc-500">
              Enter text to begin
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-1 sm:flex-row sm:items-center sm:gap-4">
              <label
                htmlFor="wpm"
                className="text-sm font-medium whitespace-nowrap text-zinc-700 dark:text-zinc-300"
              >
                Speed:
              </label>
              <div className="flex w-full items-center gap-3">
                <Slider
                  id="wpm-slider"
                  min={0}
                  max={1000}
                  step={10}
                  value={[wpm]}
                  onValueChange={(val) => setWpm(val[0])}
                  className="w-full sm:w-[200px]"
                />
                <input
                  id="wpm"
                  type="number"
                  min="0"
                  max="1000"
                  step="10"
                  value={wpm}
                  onChange={(e) => setWpm(Number(e.target.value))}
                  className="w-20 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm shadow-sm transition-colors focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-white dark:focus:ring-white"
                />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  WPM
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                disabled={!inputText}
                className="rounded-lg border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Reset
              </button>
              <button
                onClick={togglePlay}
                disabled={
                  !inputText || (currentIndex >= totalWords && totalWords > 0)
                }
                className="flex min-w-[120px] items-center justify-center rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {isPlaying
                  ? 'Pause'
                  : currentIndex > 0 && currentIndex < totalWords
                    ? 'Resume'
                    : 'Start'}
              </button>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the text you want to speed read here..."
            className="min-h-[160px] w-full resize-y rounded-xl border border-zinc-300 bg-white p-4 text-zinc-900 shadow-sm transition-colors focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-white dark:focus:ring-white"
            disabled={isPlaying}
          />
        </div>
      </main>
    </div>
  )
}
