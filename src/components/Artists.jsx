import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import ArtistCard from "./ArtistCard"
import 'swiper/css';
import SectionTitle from "./SectionTitle"
import LinkToPage from "./LinkToPage"
import { useAppContext } from "../contexts/AppContext"
import useFetch from "../hooks/useFetch"
import config from "../config"
import SectionHeader from "./SectionHeader"
import { List, ListItemButton } from "@mui/material"

const Artists = ({className='', limited=true}) => {
  const { musics, dispatch, topArtists } = useAppContext();
  const { data } = useFetch(config.base_url + `chart?limit=${limited ? '10' : '50'}`);

  useEffect(() => {
    if(data) {
      dispatch({type: 'SET_ARTISTS_DATA', data: data?.artists?.data});
    }
  }, [data]);

  return (
    <div className={`overflow-hidden ${className} ${limited ? 'lg:max-w-sm' : ''}`}>
      {limited && (
        <SectionHeader>
          <SectionTitle>Top Artists</SectionTitle>
            <LinkToPage to="/top-artists">See more</LinkToPage>
        </SectionHeader>
      )}
      {limited ? (
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          modules={[FreeMode]}
        >
          {topArtists.map(artist => (
            <SwiperSlide key={artist.id} className="w-[80px]">
              <ArtistCard artist={artist} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <List className="grid gap-7" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr)'}}>
          {topArtists.map(artist => (
            <ListItemButton key={artist.id}>
              <ArtistCard limited={limited} artist={artist} />
            </ListItemButton>
          ))}
        </List>
      )}
    </div>
  )
}

export default Artists