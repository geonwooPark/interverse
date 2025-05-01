import DirectMessages from './DirectMessages'
import UserList from './UserList'

function RightSide() {
  return (
    <div className="flex items-center gap-3">
      <DirectMessages />
      <UserList />
    </div>
  )
}

export default RightSide
