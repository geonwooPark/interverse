const ROOTS = {
  LANDING: '/landing',
  WAITING: '/waiting',
  CREATE: '/create',
  ROOM: '/room',
}

export const paths = {
  landing: ROOTS.LANDING,
  waiting: ROOTS.WAITING,
  create: ROOTS.CREATE,
  room: (id: string) => `${ROOTS.ROOM}/${id}`,
}
