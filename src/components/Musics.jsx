import { List } from "@mui/material";
import MusicCard from './MusicCard';

const Musics = ({musics, currentMusic, dispatch, isPlaying, className, removable=false, enabledItems}) => {
  return (
    <List className={`${className || ''} grid gap-4`} style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
      {musics?.map(music => (
        <MusicCard 
          currentMusic={currentMusic}
          isPlaying={isPlaying}
          dispatch={dispatch}
          {...music}
          key={music.id}
          removable={removable}
          enabledItems={enabledItems}
        />
      ))}
    </List>
  )
}

export default Musics