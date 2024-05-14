import { useEffect } from "react";
import SectionTitle from "../components/SectionTitle"
import settings from "../settings"
import Musics from "../components/Musics";
import { useDispatch, useSelector } from "react-redux";
import { hidePlayer, setData } from "../app/features/playerSlice";

const Saves = () => {

  const musics = settings.getLikes();
  const { isPlaying, currentMusic, enabledItems } = useSelector(state => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    if(musics) {
      dispatch(setData({ data: musics }));
    }
    window.document.title = 'My Saves';
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });

    return () => {
      dispatch(hidePlayer());
    }
  }, []);

  return (
    <div>
      <div className="mb-12">
        <SectionTitle>{musics?.length ? 'My Saves' : 'You have no any saves'}</SectionTitle>
      </div>
      {musics?.length > 0 && <Musics
        musics={musics}
        currentMusic={currentMusic}
        dispatch={dispatch}
        isPlaying={isPlaying}
        removable={true}
        enabledItems={enabledItems}
      />
      }
    </div>
  )
}

export default Saves