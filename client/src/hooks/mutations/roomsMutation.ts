import { roomsKeys } from '@hooks/queries/roomsQueries'
import { roomsService } from '@services/roomsService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    any,
    AxiosError,
    { title: string; password: string; headCount: number }
  >({
    mutationFn: (params) => roomsService.createRoom(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.base })
    },
  })
}
