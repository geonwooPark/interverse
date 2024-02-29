interface SocketData {
  msg: string
  room: string
}

export interface ServerToClientEvents {
  serverMsg: (data: SocketData) => void
}

export interface ClientToServerEvents {
  clientMsg: (data: SocketData) => void
}
