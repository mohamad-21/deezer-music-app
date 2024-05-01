import { Alert, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { genres } from '../constants';
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import useFetch from "../hooks/useFetch";
import config from '../config';
import 'swiper/css'; 
import Musics from "../components/Musics";
import Artists from "../components/Artists";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import Charts from "../components/Charts";
import SectionHeader from "../components/SectionHeader";

const Discover = () => {

  const [currentGenre, setCurrentGenre] = useState(genres[0].value);
  const { musics, dispatch, isPlaying, currentMusic, enabledItems } = useAppContext();
  const { data, isFetching, error } = useFetch(config.base_url + `search?q=${currentGenre}&limit=12`, [currentGenre])
  const redirect = useNavigate();

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    window.document.title = 'Discover';
    return () => {
      dispatch({type: 'HIDE_PLAYER'});
    }
  }, []);

  useEffect(() => {
    if(data?.data) {
      dispatch({type: 'SET_DATA', data: data.data})
    }
  }, [data]);

  useEffect(() => {
    dispatch({type: 'HIDE_PLAYER'});
  }, [currentGenre]);
  
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
    <div className="flex lg:flex-row flex-col justify-between gap-24">
      <div className="flex-[2]">
        <SectionHeader>
          
          <SectionTitle>Discover &nbsp;"{genres.find(genre => genre.value === currentGenre)?.title || currentGenre}"&nbsp; genre</SectionTitle>
          <FormControl>
            <InputLabel id="label">Genre</InputLabel>
            <Select 
              labelId="label"
              id="select"
              label="Genre"
              value={currentGenre}
              onChange={(e) => {
                setCurrentGenre(e.target.value);
                redirect(`?genre=${e.target.value}`)
              }}
            >
              <MenuItem value="">None</MenuItem>
              {genres.map(genre => (
                <MenuItem key={genre.value} value={genre.value}>{genre.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default Discover