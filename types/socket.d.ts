interface MessageData {
  msg: string
  sender: string
  roomNum: string
}

interface JoinMember {
  roomNum: string
  nickName: string
}

export interface ServerToClientEvents {
  serverMsg: (data: MessageData) => void
  roomMember: (members: string[]) => void
  newMember: (member: string) => void
}

export interface ClientToServerEvents {
  clientMsg: (data: MessageData) => void
  joinRoom: ({ roomNum, nickName }: JoinMember) => void
}
