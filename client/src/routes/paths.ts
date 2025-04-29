const BASE = {
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  RECOVERY: '/recovery',
  ROOMS: '/rooms',
}

export const paths = {
  login: BASE.LOGIN,
  sign_up: BASE.SIGN_UP,
  recovery: BASE.RECOVERY,
  rooms: {
    root: `${BASE.ROOMS}`,
    create: `${BASE.ROOMS}/create`,
    room: (id: string) => `${BASE.ROOMS}/${id}`,
  },
}
