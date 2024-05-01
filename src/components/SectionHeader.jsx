import React from 'react'

const SectionHeader = ({children}) => {
  return (
    <div className="flex items-center justify-between mb-12 gap-6">
      {children}
    </div>
  )
}

export default SectionHeader