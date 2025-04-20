import React, { KeyboardEventHandler, PropsWithChildren } from 'react'
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

interface FormProviderProps {
  methods: UseFormReturn<any>
  onSubmit?: () => void
  onKeyDown?: KeyboardEventHandler<HTMLFormElement> | undefined
  onKeyUp?: KeyboardEventHandler<HTMLFormElement> | undefined
}

export default function FormProvider({
  children,
  methods,
  onSubmit,
  ...props
}: PropsWithChildren<FormProviderProps>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} {...props} style={{ width: '100%' }}>
        {children}
      </form>
    </Form>
  )
}
