import { links } from '../constants';
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({setShowSearchbar, setShowTopbar}) => {

  return (
    <nav className="py-4 flex items-center justify-between gap-4">
      <Link to="/" className="w-[50px]">
        <img src="/assets/logo.ico" alt="logo" />
      </Link>
      <ul className="hidden sm:flex items-center gap-4 text-sm font-medium">
        {links.map(link => (
          <li key={link.name}>
            <NavItem to={link.to}>
              <span>{link.name}</span>
            </NavItem>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <IconButton size="small" onClick={() => setShowSearchbar(true)}>
          <SearchIcon />
        </IconButton>
        <IconButton size="small" onClick={() => setShowTopbar(true)} sx={{display: {sm:'none', xs:'block'}}}>
          <MenuIcon />
        </IconButton>
      </div>
    </nav>
  )
}

export default Navbar