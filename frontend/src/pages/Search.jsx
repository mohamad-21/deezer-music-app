import React, { useEffect } from 'react'
import SectionTitle from "../components/SectionTitle"
import Musics from "../components/Musics"
import Artists from "../components/Artists";
import { useLocation } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import SectionHeader from "../components/SectionHeader";
import Charts from "../components/Charts";
import { useDispatch, useSelector } from "react-redux";
import { useSearchSongQuery } from "../app/api";
import { hidePlayer, setData } from "../app/features/playerSlice";

const Search = () => {

  const { search } = useLocation();
  const searchTerm = new URLSearchParams(search).get('q');

  const { musics, isPlaying, currentMusic, enabledItems } = useSelector(state => state.player);
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useSearchSongQuery(searchTerm);

  useEffect(() => {
    if(data) {
      dispatch(setData({ data }));
    }
  }, [data]);
  
  useEffect(() => {
    dispatch({type: 'HIDE_PLAYER'});
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    return () => {
      dispatch(hidePlayer());
    }
  }, [search]);
  
  if(isLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="info" />
      </div>
    )
  }

  if(isError) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <div className="flex lg:flex-row flex-col justify-between gap-24">
      <div className="flex-[2]">
        <SectionHeader>
          {musics.length > 0 ? (
            <SectionTitle>Discover for &nbsp;"{searchTerm}"</SectionTitle>
          ) : (
            <SectionTitle>No results found for &nbsp;"{searchTerm}"</SectionTitle>
          )}
        </SectionHeader>
        <Musics 
          musics={musics}
          isPlaying={isPlaying}
          currentMusic={currentMusic}
          dispatch={dispatch}
          enabledItems={enabledItems}
        />
      </div>
      <div className="flex flex-col gap-12 flex-1">
        <Charts />
        <Artists />
      </div>
    </div>
  )
}

export default Search