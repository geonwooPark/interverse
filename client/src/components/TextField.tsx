import { InputHTMLAttributes } from 'react'
import { InputBox } from 'ventileco-ui'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

function TextField({ error, ...props }: TextFieldProps) {
  return (
    <>
      <InputBox
        {...props}
        className="h-12 w-full rounded-md border bg-gray-50 px-4 py-2 text-lg outline-none"
        inputClassName="placeholder:text-gray-300 placeholder:text-sm"
      />
      {error && (
        <p className="my-2 flex items-center text-sm text-red-600">
          <span className="mr-1 text-sm">{error}</span>
          <span className="translate-y-[2px] text-lg">🥲</span>
        </p>
      )}
    </>
  )
}

export default TextField
