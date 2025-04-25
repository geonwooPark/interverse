import { API_ENDPOINTS } from '@constants/api'
import { api } from '@utils/api'

class RoomService {
  async getRooms() {
    await api.post(API_ENDPOINTS.ROOMS.LIST())
  }

  async joinRoom(roomId: string) {
    await api.post(API_ENDPOINTS.ROOMS.JOIN(roomId))
  }

  async createRoom() {
    await api.post(API_ENDPOINTS.ROOMS.CREATE())
  }

  async deleteRoom(roomId: string) {
    await api.post(API_ENDPOINTS.ROOMS.DELETE(roomId))
  }
}

export const authService = new RoomService()
