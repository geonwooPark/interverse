import { authService } from '@services/authService'
import { useSuspenseQuery } from '@tanstack/react-query'

// 쿼리키
export const authKeys = {
  base: ['auth'],
  me() {
    return [...this.base, 'me']
  },
} as const

// ----------------------------------------------------------------------

// 내 정보 조회
export const useMeQuery = () =>
  useSuspenseQuery({
    queryKey: authKeys.me(),
    queryFn: () => authService.me(),
    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 15,
  })
