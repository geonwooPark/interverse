import Chat from './Chat/Chat'
import UserStatus from './UserStatus'
import { CookieType } from '../types/client'
import { useState } from 'react'

interface ControllerProps {
  authCookie: CookieType | null
}
function Controller({ authCookie }: ControllerProps) {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="fixed bottom-5 z-[200] flex w-full flex-col items-center justify-center gap-2">
      {showChat && <Chat authCookie={authCookie} />}
      <UserStatus
        authCookie={authCookie}
        showChat={showChat}
        setShowChat={setShowChat}
      />
    </div>
  )
}

export default Controller
