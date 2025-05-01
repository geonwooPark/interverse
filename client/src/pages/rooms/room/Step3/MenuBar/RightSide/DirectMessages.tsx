import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion as m } from 'motion/react'
import slideIn from '@components/Animation/motions/slideIn'
import Icon from '@components/Icon'
import { ToolTip } from 'ventileco-ui'

export default function DirectMessages() {
  const [isOpen, setIsOpen] = useState(false)

  const [isShaking, setIsShaking] = useState(false)

  const onClick = () => {
    setIsOpen((prev) => !prev)
    setIsShaking(true)
  }

  useEffect(() => {
    if (!isShaking) return

    const timer = setTimeout(() => setIsShaking(false), 400)

    return () => clearTimeout(timer)
  }, [isShaking])

  return (
    <div className="relative">
      <ToolTip direction="bottom" enterDelay={1000}>
        <ToolTip.Trigger>
          <m.div
            animate={
              isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : { rotate: 0 }
            }
            transition={{ duration: 0.4 }}
          >
            <button
              tabIndex={-1}
              onClick={onClick}
              className="flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
            >
              <Icon
                iconName="IconEvelope"
                className="pointer-events-none size-5"
              />
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

      <AnimatePresence>
        {isOpen && (
          <m.ul
            {...slideIn({ distance: -20, isFade: true }).inY}
            className="absolute bottom-[-410px] right-0 h-[400px] w-[280px] overflow-hidden rounded-md bg-white shadow-level2"
          >
            <li>
              <button className="w-full bg-white px-3 py-2 duration-200 hover:bg-gray-50">
                sd
              </button>
            </li>
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
