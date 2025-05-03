import MessageList from './MessageList'
import UserList from './UserList'

function RightSide() {
  return (
    <div className="flex items-center gap-3">
      <MessageList />
      <UserList />
    </div>
  )
}

export default RightSide
