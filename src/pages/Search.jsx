import React, { useEffect } from 'react'
import SectionTitle from "../components/SectionTitle"
import Musics from "../components/Musics"
import Artists from "../components/Artists";
import { useAppContext } from "../contexts/AppContext";
import { useLocation } from "react-router-dom";
import config from "../config";
import { Alert, CircularProgress } from "@mui/material";
import useFetch from "../hooks/useFetch";
import SectionHeader from "../components/SectionHeader";

const Search = () => {

  const { search } = useLocation();
  const searchTerm = new URLSearchParams(search).get('q');

  const { musics, dispatch, isPlaying, currentMusic, enabledItems } = useAppContext();
  const { data, isFetching, error } = useFetch(config.base_url + `search?q=${searchTerm}`, [search]);

  useEffect(() => {
    if(data) {
      dispatch({type: 'SET_DATA', data: data.data})
    }
  }, [data]);
  
  useEffect(() => {
    dispatch({type: 'HIDE_PLAYER'});
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
  }, [search]);
  
  if(isFetching) {
    return (
      <div className="text-center">
        <CircularProgress color="info" />
      </div>
    )
  }

  if(error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <div className="flex md:flex-row flex-col justify-between gap-10">
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
      <Artists className="flex-1" />
    </div>
  )
}

export default Search