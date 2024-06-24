import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Alert, CircularProgress } from "@mui/material";
import Musics from "../components/Musics";
import SectionTitle from "../components/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { useGetArtistByIdQuery } from "../app/api";
import { hidePlayer, setData } from "../app/features/playerSlice";

const Artist = () => {

  const { id } = useParams();

  const { musics, isPlaying, currentMusic, enabledItems } = useSelector(state => state.player);
  const { data: detectedArtist, isLoading: isLoadingDetectedArtist, error: detectedArtistError } = useGetArtistByIdQuery({ id });
  const { data, isLoading, error } = useGetArtistByIdQuery({ id, getTopSongs: true });
  const dispatch = useDispatch();


  useEffect(() => {
    return () => {
      dispatch(hidePlayer());
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setData({ data: data?.data }));
    }
    window.document.title = detectedArtist?.name || 'Artist';
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
  }, [id, data]);

  if (isLoading || isLoadingDetectedArtist) {
    return (
      <div className="text-center">
        <CircularProgress color="info" />
      </div>
    )
  }

  if (error || detectedArtistError) {
    return <Alert severity="error">{error || detectedArtistError}</Alert>
  }

  if (!detectedArtist?.id) {
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