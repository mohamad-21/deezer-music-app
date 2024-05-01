import React from 'react'
import { Link } from "react-router-dom"

const LinkToPage = ({to, children}) => {
  return (
    <Link to={to} className="text-sm hover:underline">{children}</Link>
  )
}

export default LinkToPage