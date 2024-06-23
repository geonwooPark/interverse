import React, { createContext } from 'react'

export const _createContext = <T>() => {
  const Context = createContext<T | null>(null)

  const useContext = () => {
    const context = React.useContext(Context)

    if (context === null) {
      throw Error('Error')
    }

    return context
  }

  return [useContext, Context.Provider] as const
}
