import { InputHTMLAttributes } from 'react'
import { InputBox } from 'ventileco-ui'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

function TextField({ ...props }: TextFieldProps) {
  return (
    <InputBox
      {...props}
      className="body1 h-12 w-full rounded-md border bg-gray-50 px-4 text-body2 outline-none"
      inputClassName="placeholder:text-gray-300 placeholder:text-body2"
    />
  )
}

export default TextField
