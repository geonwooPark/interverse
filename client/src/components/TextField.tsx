import { InputHTMLAttributes } from 'react'
import { InputBox } from 'ventileco-ui'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  endIcon?: any
}

function TextField({ ...props }: TextFieldProps) {
  return (
    <InputBox
      {...props}
      autoComplete="off"
      className="body1 h-12 w-full rounded-md border bg-gray-50 pl-4 text-body2 outline-none"
      inputClassName="placeholder:text-gray-300 placeholder:text-body2"
    />
  )
}

export default TextField
