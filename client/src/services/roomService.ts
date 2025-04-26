import { API_ENDPOINTS } from '@constants/api'
import { api } from '@utils/api'

class RoomService {
  async getRooms() {
    return await api.post(API_ENDPOINTS.ROOMS.LIST())
  }

  async joinRoom(roomId: string) {
    return await api.post(API_ENDPOINTS.ROOMS.JOIN(roomId))
  }

  async createRoom() {
    return await api.post(API_ENDPOINTS.ROOMS.CREATE())
  }

  async deleteRoom(roomId: string) {
    return await api.post(API_ENDPOINTS.ROOMS.DELETE(roomId))
  }
}

export const authService = new RoomService()
