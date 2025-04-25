export const API_ENDPOINTS = {
  USER: {
    ROOT: '/user',
    LOGIN: () => `/user/login`,
    SIGN_UP: () => `/user/signup`,
    ME: () => `/user/me`,
    SEND_EMAIL: () => `/user/send-verification-email`,
    CHECK_CODE: () => `/user/check-verification-code`,
    CHANGE_PASSWORD: () => `/user/change-password`,
    CHECK_ID: () => `/user/check-id`,
  },
  ROOMS: {
    ROOT: '/rooms',
    LIST: () => `/rooms`,
    CREATE: () => `/rooms`,
    JOIN: (roomId: string) => `/rooms/${roomId}/join`,
    DELETE: (roomId: string) => `/rooms/${roomId}`,
  },
} as const
