const BASE = {
  AUTH: '/auth',
  ROOMS: '/rooms',
}

export const paths = {
  auth: {
    login: `${BASE.AUTH}/login`,
    signUp: `${BASE.AUTH}/signup`,
  },
  rooms: {
    root: `${BASE.ROOMS}`,
    new: `${BASE.ROOMS}/new`,
    room: (id: string) => `${BASE.ROOMS}/${id}`,
  },
}
