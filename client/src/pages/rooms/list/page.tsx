import { useRoomsQuery } from '@hooks/queries/roomsQueries'
import React from 'react'
import Log from './Log'
import Button from '@components/Button'
import { IconPlus } from '@assets/svgs'
import { useNavigate } from 'react-router-dom'
import { paths } from '@routes/paths'

export default function RoomListPage() {
  const navigate = useNavigate()

  const { data: logs } = useRoomsQuery()

  const onClick = () => {
    navigate(`${paths.rooms.create}`)
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-8 pt-4">
        <h2 className="text-h2 font-semibold">내 방 목록</h2>

        <Button
          size="sm"
          variant="contained"
          leftIcon={<IconPlus className="mr-2 size-6" />}
          className="ml-auto"
          onClick={onClick}
        >
          방 만들기
        </Button>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 desktop:grid-cols-4">
        {logs?.map((log) => <Log key={log._id} log={log} />)}
      </div>
    </div>
  )
}
