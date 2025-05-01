export const API_ENDPOINTS = {
  USER: {
    ROOT: '/auth',
    LOGIN: () => `/auth/login`,
    SIGN_UP: () => `/auth/signup`,
    ME: () => `/auth/me`,
    SEND_EMAIL: () => `/auth/send-verification-email`,
    CHECK_CODE: () => `/auth/check-verification-code`,
    CHANGE_PASSWORD: () => `/auth/change-password`,
    CHECK_ID: () => `/auth/check-id`,
  },
  ROOMS: {
    ROOT: '/rooms',
    LIST: () => `/rooms`,
    CREATE: () => `/rooms`,
    JOIN: (roomId: string) => `/rooms/${roomId}/join`,
    DELETE: (roomId: string) => `/rooms/${roomId}`,
    CHECK_PASSWORD: (roomId: string) => `/rooms/${roomId}/check-password`,
  },
} as const
