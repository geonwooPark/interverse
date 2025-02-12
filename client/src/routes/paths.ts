const ROOTS = {
  LANDING: './landing',
  MY_ROOM: './my-room',
  CREATE_ROOM: './create-room',
  ROOM: './room',
}

export const paths = {
  landing: ROOTS.LANDING,
  myRoom: ROOTS.MY_ROOM,
  createRoom: ROOTS.CREATE_ROOM,
  room: (id: string) => `${ROOTS.ROOM}/${id}`,
}
