import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Alert, CircularProgress } from "@mui/material";
import useFetch from '../hooks/useFetch';
import { useAppContext } from '../contexts/AppContext';
import Musics from "../components/Musics";
import SectionTitle from "../components/SectionTitle";

const Artist = () => {

  const { id } = useParams();

  const { musics, dispatch, isPlaying, currentMusic, enabledItems } = useAppContext();

  const { data:detectedArtist, isFetching:isFetchingDetectedArtist, error:detectedArtistError } = useFetch(`https://api.deezer.com/artist/${id}`);
  
  const { data, isFetching, error } = useFetch(`https://api.deezer.com/artist/${id}/top?limit=30`);

  useEffect(() => {
    return () => {
      dispatch({type: 'HIDE_PLAYER'});
    }
  }, []);

  useEffect(() => {
    if(data) {
      dispatch({type: 'SET_DATA', data: data?.data})
    }
    window.document.title = detectedArtist?.name || 'Artist';
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
  }, [id, data]);
  
  if(isFetching || isFetchingDetectedArtist) {
    return (
      <div className="text-center">
        <CircularProgress color="info" />
      </div>
    )
  }

  if(error || detectedArtistError) {
    return <Alert severity="error">{error || detectedArtist}</Alert>
  }

  if(!detectedArtist?.id) {
    return <Alert severity="error">Artist not found</Alert>
  }

  return (
    <div>
      <div className="mb-12">
        <div className="flex gap-5 items-center mb-14">
          <img src={detectedArtist.picture_big} alt={detectedArtist.name} className="w-[100px] h-[100px] rounded-full" />
          <div>
            <h2 className="text-xl">{detectedArtist.name}</h2>
            <span className="text-sm text-gray-300">{detectedArtist?.nb_fan.toLocaleString()} Fans</span>
          </div>
        </div>
        <SectionTitle>Top {musics?.length} {detectedArtist?.name} Tracks</SectionTitle>
      </div>
      <div>
        <Musics 
          musics={musics}
          isPlaying={isPlaying}
          currentMusic={currentMusic}
          dispatch={dispatch}
          enabledItems={enabledItems}
        />
      </div>
    </div>
  )
}

export default Artist