import { roomsService } from '@services/roomsService'
import { useSuspenseQuery } from '@tanstack/react-query'

// 쿼리키
export const roomsKeys = {
  base: ['rooms'],
}

// ----------------------------------------------------------------------

export const useRoomsQuery = () => {
  return useSuspenseQuery({
    queryKey: roomsKeys.base,
    queryFn: () => roomsService.getRooms(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 3,
  })
}
