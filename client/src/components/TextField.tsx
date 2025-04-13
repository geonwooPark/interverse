import { InputHTMLAttributes } from 'react'
import { InputBox } from 'ventileco-ui'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

function TextField({ ...props }: TextFieldProps) {
  return (
    <InputBox
      {...props}
      className="h-12 w-full rounded-md border bg-gray-50 px-4 py-2 text-lg outline-none"
      inputClassName="placeholder:text-gray-300 placeholder:text-sm"
    />
  )
}

export default TextField
