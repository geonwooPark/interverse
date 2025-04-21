import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('이메일을 필수로 입력해주세요')
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      '잘못된 이메일 형식입니다. 확인 후 다시 입력해주세요.',
    ),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
      '8~20자의 영문, 숫자를 조합한 비밀번호를 입력해주세요.',
    ),
  confirmPassword: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .oneOf(
      [yup.ref('password')],
      '비밀번호가 서로 일치하지 않습니다. 다시 입력해주세요.',
    ),
})
