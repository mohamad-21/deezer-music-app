import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RepeatIcon from '@mui/icons-material/Repeat';
import PauseIcon from '@mui/icons-material/Pause';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton, Menu, Skeleton, Slider } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import settings from "../../settings";
import { useDispatch } from "react-redux";
import { changePlayMode, changeVolume, disableItems, enableItems, pause, play, playPrevious, playShuffle, playNext } from "../../app/features/playerSlice";

const playModeOptions = {
  normal: <ArrowForwardIcon />,
  repeat: <RepeatIcon />, 
  shuffle: <ShuffleIcon />, 
};

const Player = ({currentMusic, volume, playMode, isPlaying}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [durationText, setDurationText] = useState('0:00');
  const [currentTimeText, setCurrentTimeText] = useState('0:00');
  const [loadedMusic, setLoadedMusic] = useState(false);
  const audioRef = useRef(null);
  const processBarRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    audioRef.current.volume = volume;
  }, []);
  
  useEffect(() => {
    dispatch(changePlayMode({ playMode }))
    settings.player.setPlayMode(playMode);
  }, [playMode]);

  useEffect(() => {
    if(isPlaying) {
      playAudio();
    }
  }, [currentMusic]);

  const handleLoaded = (e) => {
    setDurationText(getTime(e.target.duration));
    setLoadedMusic(true);
    dispatch(enableItems());
  }

  const handleAbort = () => {
    setLoadedMusic(false);
    setAnchorEl(null);
    dispatch(disableItems());
  }
  
  const handleUpdating = (e) => {
    const currentTime = e.target.currentTime;
    setCurrentTimeText(getTime(currentTime));
  }

  const handleChangeProcess = (e) => {
    audioRef.current.currentTime = e.target.value
  }

  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    audioRef.current.volume = volume;
    dispatch(changeVolume({ volume }));
    settings.player.setVolume(volume);
  }

  const handleEnded = () => {
    if(playMode === 'normal') {
      playNextSong();
    } else if(playMode === 'repeat') {
      playAudio();
    } else {
      shuffle();
    }
  }

  const playAudio = () => {
    audioRef.current.play();
    dispatch(play());
  }

  const pauseAudio = () => {
    audioRef.current.pause();
    dispatch(pause());
  }

  const handlePausePlay = () => {
    isPlaying ? pauseAudio() : playAudio();
  }

  const playPrevSong = () => {
    dispatch(playPrevious())
  }
  
  const playNextSong = () => {
    dispatch(playNext());
  }
  
  const shuffle = () => {
    dispatch(playShuffle());
  }

  const togglePlayMode = () => {
    if(playMode === 'normal') dispatch(changePlayMode({ playMode: 'repeat' }));
    if(playMode === 'repeat') dispatch(changePlayMode({ playMode: 'shuffle' }));
    if(playMode === 'shuffle') dispatch(changePlayMode({ playMode: 'normal' }));
  }

  const getTime = (time) => {
    return `${Math.floor(time / 60)}:${`${Math.floor(time % 60)}`.padStart(2,'0')}`;
  }

  return (
    <>
      <div className="flex justify-between bg-black/50 backdrop-blur-md">
        <div className="flex gap-4 md:flex-1 truncate">
          <div className="flex max-w-[80px] overflow-hidden">
            {loadedMusic ? (
              <img src={currentMusic?.album?.cover_big} alt="cover" className={`${isPlaying ? 'animate-pulse' : ''} object-contain`} />
            ) : (
              <Skeleton 
                variant="rectangular"
                animation="wave"
                width={80}
                height={80}
              />
            )}
          </div>
          <div className="hidden md:flex flex-col justify-center truncate flex-1">
            {loadedMusic ? (
              <>
                <h2 className="truncate text-sm">{currentMusic?.title}</h2>
                <span className="text-gray-300 text-[11px] truncate">{currentMusic?.artist?.name}</span> 
              </>
            ) : (
              <>
                <Skeleton 
                  animation="wave"
                  width={100}
                />
                <Skeleton 
                  animation="wave"
                  width={60}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center pt-3 pb-1 px-4 gap-1 flex-[2]">
          {loadedMusic ? (
            <>
              <div className="flex items-center justify-center gap-4">
                <IconButton size="small" onClick={togglePlayMode}>
                  {playModeOptions[playMode]}
                </IconButton>
    
                <IconButton size="small" onClick={playPrevSong}>
                  <SkipPreviousIcon />
                </IconButton>
    
                <IconButton size="small" onClick={handlePausePlay}>
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
    
                <IconButton size="small" onClick={playNextSong}>
                  <SkipNextIcon />
                </IconButton>
    
                <div>
                  <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <VolumeIcon volume={volume} />
                  </IconButton>
                  <Menu open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorEl={anchorEl} transformOrigin={{vertical:'bottom', horizontal: 'left'}} elevation={1}>
                    <div className="h-32 px-1 py-4">
                      <Slider size="small" orientation="vertical" onChange={handleVolumeChange} min={0} max={1} step={0.001} defaultValue={volume} value={volume} color="info" />
                    </div>
                  </Menu>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-xs min-w-8 text-right text-gray-300">{durationText}</p>
                <Slider ref={processBarRef} value={audioRef?.current?.currentTime || 0} max={audioRef?.current?.duration || 0} onChange={handleChangeProcess} size="small" color="info" />
                <p className="text-xs min-w-8 text-gray-300">{currentTimeText}</p>
              </div>
            </>
          ) : (
            <>
              <Skeleton 
                variant="rectangular"
                animation="wave"
                sx={{mb:0.5}}
              />
              <Skeleton 
                variant="rectangular"
                animation="wave"
              />
            </>
          )}
        </div>
      </div>
      <audio 
        src={currentMusic?.preview} 
        ref={audioRef} 
        onTimeUpdate={handleUpdating}
        onLoadedMetadata={handleLoaded}
        onAbort={handleAbort}
        onEnded={handleEnded}
        hidden
      />
    </>
  )
}

const VolumeIcon = ({volume}) => {
  if(volume > 0.5) {
    return <VolumeUpIcon />
  } else if(volume > 0 && volume < 0.6) {
    return <VolumeDownIcon />
  } else return <VolumeOffIcon />
}

export default memo(Player)
