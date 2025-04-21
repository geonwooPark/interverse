const BASE = {
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RECOVERY: '/recovery',
  ROOMS: '/rooms',
}

export const paths = {
  login: BASE.LOGIN,
  signup: BASE.SIGNUP,
  recovery: BASE.RECOVERY,
  rooms: {
    root: `${BASE.ROOMS}`,
    new: `${BASE.ROOMS}/new`,
    room: (id: string) => `${BASE.ROOMS}/${id}`,
  },
}
