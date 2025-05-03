import Icon from '@components/Icon'
import React from 'react'
import { ToolTip } from 'ventileco-ui'

interface TriggerProps {
  headCount: number
  onClick: () => void
}

export default function Trigger({ headCount, onClick }: TriggerProps) {
  return (
    <ToolTip direction="bottom" enterDelay={1000}>
      <ToolTip.Trigger>
        <button
          tabIndex={-1}
          onClick={onClick}
          className="flex items-center justify-center rounded-md bg-black/70 px-3 py-2 text-white duration-200 hover:bg-black/90"
        >
          <Icon
            iconName="IconUsers"
            className="pointer-events-none mr-1 size-5"
          />
          <span className="pointer-events-none">{headCount}</span>
        </button>
      </ToolTip.Trigger>
      <ToolTip.Content>
        <div className="rounded bg-white px-2 py-1 text-caption">참여인원</div>
        <ToolTip.Triangle className="size-2.5 bg-white" />
      </ToolTip.Content>
    </ToolTip>
  )
}
