import { useEffect, useRef, useState } from 'react'

const INITIAL_TIMER = 180
const RESEND_TIME = 30

export default function useTimer() {
  const [timer, setTimer] = useState(INITIAL_TIMER)

  const [isTimerActive, setIsTimerActive] = useState(false)

  const tryCount = useRef(0)

  const canResend =
    INITIAL_TIMER - timer > RESEND_TIME || tryCount.current === 0

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            return 0
          }

          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTimerActive])

  // 타이머를 문자열로 변환
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  const activeTimer = () => {
    tryCount.current = tryCount.current + 1
    setIsTimerActive(true)
    setTimer(INITIAL_TIMER)
  }

  return {
    timer: formatTimer(),
    isTimerActive,
    canResend,
    isFirstRequest: tryCount.current === 0,
    activeTimer,
  }
}
