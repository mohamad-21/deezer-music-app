import { Grow, ListItemButton, Skeleton } from "@mui/material"
import PlayPause from './PlayPause';
import { pause, playTopCharts } from "../app/features/playerSlice";

const ChartCard = ({ id, title, album: { cover_big }, artist: { name }, currentMusic, isPlaying, dispatch, enabledItems, limited = true, isLoading, isTopChartsPlaying }) => {

  const handleClick = () => {
    if (enabledItems) {
      if (currentMusic.id === id && isPlaying) {
        dispatch(pause());
      } else {
        dispatch(playTopCharts({ id }));
      }
    }
  }

  return (
    <>
      <Grow style={{ transformOrigin: 'top left' }} in timeout={1000} unmountOnExit >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={100}
          />
        ) : (
          <ListItemButton
            disabled={!enabledItems}
            className={`${limited ? 'h-[80px]' : 'h-[100px]'} overflow-hidden bg-gradient-to-bl from-black/40 via-transparent via-40% to-gray-700 hover:opacity-100 duration-200 max-w-2xl`}
            sx={{
              px: 0,
              pr: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
            }}
            style={{
              opacity: isTopChartsPlaying ? (currentMusic?.id ? (currentMusic?.id === id ? 1 : 0.6) : 1) : 1
            }}
            onClick={handleClick}
          >
            <div className="flex items-center gap-3">
              <img
                src={cover_big}
                alt={name}
                className={`${limited ? 'w-[80px] h-[80px]' : 'w-[100px] h-[100px]'} object-cover`}
              />
              <div className={`flex flex-col gap-0.5 truncate ${limited ? 'lg:max-w-[200px]' : ''}`}>
                <h3 className="text-sm truncate">{title}</h3>
                <span className="text-[11px] truncate text-gray-300">{name}</span>
              </div>
            </div>
            <PlayPause isActiveMusicAndPlaying={currentMusic?.id === id && isPlaying} />
          </ListItemButton>
        )}
      </Grow>
    </>
  )
}

export default ChartCard