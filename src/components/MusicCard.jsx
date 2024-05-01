import React, { useState } from 'react'
import PlayPause from "./PlayPause"
import { CircularProgress, Grow, IconButton, ListItemButton } from "@mui/material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import settings from "../settings";

const MusicCard = ({ id, title, artist, album, isPlaying, currentMusic, dispatch, preview, removable=false, enabledItems}) => {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState({ id, liked: settings.getLikes().find(music => music.id === id) });
  const [isUnliked, setIsUnliked] = useState(false);

  const menuClasses = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const handleClick = () => {
    if(enabledItems) {
      if(currentMusic.id === id && isPlaying) {
        dispatch({type: 'PAUSE'});
      } else {
        dispatch({type: 'PLAY_MAIN_TRACKS', id})
      }
    }
  }

  const handleLike = () => {
    setIsLiked(prev => ({ ...prev, liked: !prev.liked }));
    settings.toggleLike({id, title, artist, album, preview});
    if(removable && isLiked.liked) {
      setIsUnliked(true);
    }
  }

  return (
    <Grow style={{transformOrigin: 'top left'}} in={!isUnliked} timeout={isUnliked ? 'auto' : 1000} unmountOnExit >
      <div className="bg-gradient-to-bl from-black/40 via-transparent via-40% to-gray-700 max-w-sm">
        <div className={`relative group`}>
          <div 
            className={`absolute inset-0 bg-slate-800/40 backdrop-blur-sm ${currentMusic.id === id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}  group-hover:opacity-100 group-hover:pointer-events-auto duration-200 flex`} 
            onClick={handleClick}
          >
            <ListItemButton 
              style={menuClasses}
              disabled={!enabledItems}
            >
              <PlayPause 
                isActiveMusicAndPlaying={currentMusic?.id === id && isPlaying}
              />
            </ListItemButton>
          </div>
          <div className={`flex items-center justify-center ${imageLoaded ? '' : 'h-[200px]'}`}>
            <img src={album.cover_big} alt={title} onLoad={() => setImageLoaded(true)} className={`${imageLoaded ? 'block' : 'hidden'} w-full h-full object-cover`} />
            <div className={`${imageLoaded ? 'hidden' : 'block'}`}>
              <CircularProgress color="info"/>
            </div>
          </div>
          
        </div>
        <div className="flex items-center justify-between gap-3 py-4 px-3">
          <div className="flex flex-col gap-0.5 truncate">
            <span className="text-sm font-medium truncate">{title}</span>
            <span className="text-gray-300 text-[11px]">{artist?.name}</span>
          </div>
          <IconButton color="error" onClick={handleLike}>
            {isLiked.id === id && isLiked.liked ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </div>
      </div>
    </Grow>
  )
}

export default MusicCard