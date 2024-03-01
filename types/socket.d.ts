interface SocketData {
  msg: string
  sender: string
  roomNum: string
}

export interface ServerToClientEvents {
  serverMsg: (data: SocketData) => void
}

export interface ClientToServerEvents {
  clientMsg: (data: SocketData) => void
  joinRoom: (roomNum: string) => void
}
