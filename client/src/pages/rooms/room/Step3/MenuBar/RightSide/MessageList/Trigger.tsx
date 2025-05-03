import React, { useEffect, useState } from 'react'
import { motion as m } from 'motion/react'
import { ToolTip } from 'ventileco-ui'
import Icon from '@components/Icon'
import Badge from './Badge'

interface TriggerProps {
  onClick: () => void
  hasNewAlarm: boolean
}

export default function Trigger({ onClick, hasNewAlarm }: TriggerProps) {
  const [isShaking, setIsShaking] = useState(false)

  const handleClick = () => {
    onClick()
    setIsShaking(true)
  }

  useEffect(() => {
    if (!isShaking) return

    const timer = setTimeout(() => setIsShaking(false), 400)

    return () => clearTimeout(timer)
  }, [isShaking])

  return (
    <ToolTip direction="bottom" enterDelay={1000}>
      <ToolTip.Trigger>
        <m.div
          animate={
            isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : { rotate: 0 }
          }
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={handleClick}
            className="flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
          >
            <div className="pointer-events-none relative">
              <Icon iconName="IconEvelope" className="size-5" />
              {hasNewAlarm && (
                <Badge className="absolute right-[-4px] top-[-2px]" />
              )}
            </div>
          </button>
        </m.div>
      </ToolTip.Trigger>
      <ToolTip.Content>
        <div className="rounded bg-white px-2 py-1 text-caption">
          다이렉트 메시지
        </div>
        <ToolTip.Triangle className="size-2.5 bg-white" />
      </ToolTip.Content>
    </ToolTip>
  )
}
