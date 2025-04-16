import React from 'react'
import { Counter as VCounter } from 'ventileco-ui'

interface CounterProps {
  value: number
  onChange: (value: number) => void
}

export default function Counter({ value, onChange }: CounterProps) {
  return (
    <VCounter value={value} onChange={onChange} minimum={1}>
      <div className="align-center flex w-auto justify-center gap-2 rounded-md border px-2">
        <VCounter.Down>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </VCounter.Down>
        <VCounter.Number className="h-8 w-10 rounded-md text-center text-subtitle1 outline-none" />
        <VCounter.Up>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </VCounter.Up>
      </div>
    </VCounter>
  )
}
