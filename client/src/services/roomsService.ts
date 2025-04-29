import { API_ENDPOINTS } from '@constants/api'
import { api } from '@utils/api'

class RoomsService {
  async getRooms() {
    return await api.get(API_ENDPOINTS.ROOMS.LIST())
  }

  async joinRoom(roomId: string) {
    return await api.post(API_ENDPOINTS.ROOMS.JOIN(roomId))
  }

  async createRoom({
    title,
    password,
    headCount,
  }: {
    title: string
    password: string
    headCount: number
  }) {
    return await api.post(API_ENDPOINTS.ROOMS.CREATE(), {
      title,
      password,
      headCount,
    })
  }

  async deleteRoom(roomId: string) {
    return await api.post(API_ENDPOINTS.ROOMS.DELETE(roomId))
  }
}

export const roomsService = new RoomsService()
