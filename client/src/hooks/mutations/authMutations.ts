import { authKeys } from '@hooks/queries/authQueries'
import { authService } from '@services/authService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setLocalStorageItem } from '@utils/localStorage'
import { AxiosError } from 'axios'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { token: string; user: any },
    AxiosError,
    { email: string; password: string }
  >({
    mutationFn: (params) => authService.login(params),
    onSuccess: ({ token, user }) => {
      setLocalStorageItem('interverse_token', token)
      queryClient.setQueryData(authKeys.me(), user)
    },
  })
}

export const useSignUpMutation = () => {
  return useMutation<
    boolean,
    AxiosError,
    { email: string; nickname: string; password: string }
  >({
    mutationFn: (params) => authService.signup(params),
  })
}

export const useChangePasswordMutation = () => {
  return useMutation<
    boolean,
    AxiosError,
    {
      email: string
      newPassword: string
    }
  >({
    mutationFn: (params) => authService.changePassword(params),
  })
}

export const useCheckIdMutation = () => {
  return useMutation<boolean, AxiosError, string>({
    mutationFn: (params) => authService.checkId(params),
  })
}

export const useSendVerificationEmailMutation = () => {
  return useMutation<boolean, AxiosError, string>({
    mutationFn: (params) => authService.sendVerificationEmail(params),
  })
}

export const useCheckVerificationCode = () => {
  return useMutation<
    boolean,
    AxiosError,
    {
      email: string
      code: number
    }
  >({
    mutationFn: (params) => authService.checkVerificationCode(params),
  })
}
