import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextFieldProps, TextFieldWithCaption } from '@components/TextField'
import Icon from '@components/Icon'

interface RhfInputProps extends TextFieldProps {
  name: string
  formatFunc?: (str: string) => void
}

export default function RhfTextField({
  name,
  type,
  formatFunc,
  ...otherProps
}: RhfInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <TextFieldWithCaption
            {...field}
            type={type}
            onChange={(e) => {
              const { value } = e.target

              if (type === 'number') {
                field.onChange(Number(value))
              } else {
                if (formatFunc) {
                  field.onChange(formatFunc(value))
                } else {
                  field.onChange(value)
                }
              }
            }}
            caption={
              error && (
                <div className="ml-2 mt-1 flex items-center gap-1 text-red-600">
                  <Icon iconName="IconExclamation" className="size-4" />
                  <p className="text-caption">{error?.message}</p>
                </div>
              )
            }
            {...otherProps}
          />
        </div>
      )}
    />
  )
}
