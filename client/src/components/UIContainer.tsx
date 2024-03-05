import React from 'react'

function UIContainer({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0">{children}</div>
}

export default UIContainer
