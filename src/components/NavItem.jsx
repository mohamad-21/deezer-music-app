import { NavLink } from "react-router-dom"

const NavItem = ({children, to, style, onClick}) => {
  return (
    <NavLink to={to} className={`${style} flex items-center gap-1.5 hover:opacity-80 transition [&.active]:text-info`} onClick={onClick}>
      {children}
    </NavLink>
  )
}

export default NavItem