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
    new: `${BASE.ROOMS}/new`,
    room: (id: string) => `${BASE.ROOMS}/${id}`,
  },
}
