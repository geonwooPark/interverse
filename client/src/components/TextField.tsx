import { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

function TextField({ error, ...props }: TextFieldProps) {
  return (
    <>
      <input {...props} autoComplete="off" className="input" />
      {error && (
        <p className="my-2 flex items-center text-sm text-red-600">
          <span className="description mr-1">{error}</span>
          <span className="translate-y-[2px] text-lg">🥲</span>
        </p>
      )}
    </>
  )
}

export default TextField
