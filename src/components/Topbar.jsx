import NavItem from "./NavItem";
import { links } from "../constants";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

const Topbar = ({showTopbar, setShowTopbar}) => {

  const closeClasses = {
    position: 'absolute',
    top:'18px',
    right:'23px',
  }

  return (
    <div className={`fixed inset-0 ${showTopbar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-black/75 backdrop-blur-md flex items-center justify-center px-8 py-12 transition z-50`}>
      <ul className="flex flex-col items-center gap-8">
        {links.map(link => (
          <li key={link.name}>
            <NavItem onClick={() => setShowTopbar(false)} to={link.to} style="text-lg">
              <span>{link.name}</span>
            </NavItem>
          </li>
        ))}
      </ul>
      <IconButton sx={closeClasses} size="small" onClick={() => setShowTopbar(false)}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default Topbar