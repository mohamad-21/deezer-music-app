import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle"
import config from "../config";
import settings from "../settings"
import Musics from "../components/Musics";
import { useAppContext } from "../contexts/AppContext";

const Saves = () => {

  const musics = settings.getLikes();
  const { dispatch, isPlaying, currentMusic, enabledItems } = useAppContext();

  useEffect(() => {
    if(musics) {
      dispatch({type: 'SET_DATA', data:musics});
    }
    window.document.title = 'My Saves';
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
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