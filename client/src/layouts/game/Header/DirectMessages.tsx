import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion as m } from 'motion/react'
import slideIn from '@components/Animation/motions/slideIn'
import IconButton from '@components/IconButton'

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
      <m.div
        animate={
          isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : { rotate: 0 }
        }
        transition={{ duration: 0.4 }}
      >
        <IconButton
          iconName="IconEvelope"
          className="size-6"
          onClick={onClick}
        />
      </m.div>

      <AnimatePresence>
        {isOpen && (
          <m.ul
            {...slideIn({ distance: -20, isFade: true }).inY}
            className="absolute bottom-[-410px] left-[-116px] h-[400px] w-[280px] overflow-hidden rounded-md bg-white shadow-level2"
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
