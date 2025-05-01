import withCaption from '@hocs/withCaption'
import { forwardRef, InputHTMLAttributes } from 'react'
import { InputBox } from 'ventileco-ui'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  endIcon?: any
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <InputBox
      {...props}
      ref={ref}
      autoComplete="off"
      className="body1 h-12 w-full rounded-md border bg-gray-50 pl-4 text-body2 outline-none"
      inputClassName="placeholder:text-gray-300 placeholder:text-body2"
    />
  )
})

TextField.displayName = 'TextField'

export default TextField

export const TextFieldWithCaption = withCaption(TextField)
