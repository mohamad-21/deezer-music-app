import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, Input } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = ({showSearchbar, setShowSearchbar}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const redirect = useNavigate();

  const closeClasses = {
    position: 'absolute',
    top:'18px',
    right:'23px',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim()) {
      setSearchTerm('');
      setShowSearchbar(false);
      redirect(`/search?q=${searchTerm}`);
    }
  }

  return (
    <div className={`fixed inset-0 ${showSearchbar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} bg-black/70 backdrop-blur-md flex pt-44 items-start justify-center px-8 py-12 transition z-50`}>
      <FormControl 
        fullWidth
        sx={{maxWidth: '300px'}}
        component="form"
        onSubmit={handleSubmit}
      >
        <Input 
          id="input"
          autoFocus={true}
          placeholder="Search"
          color="info"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          endAdornment={
            <IconButton type="submit" color="info" size="small" disabled={!Boolean(searchTerm)}>
              <SearchIcon />
            </IconButton>
          }
        />
      </FormControl>
      <IconButton sx={closeClasses} size="small" onClick={() => setShowSearchbar(false)}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default Searchbar