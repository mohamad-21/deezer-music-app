import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton } from "@mui/material";

const PlayPause = ({isActiveMusicAndPlaying}) => {
  return (
    <div className="border-2 border-slate-300 rounded-full">
      {isActiveMusicAndPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
    </div>
  )
}

export default PlayPause