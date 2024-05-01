import { Grow } from "@mui/material"
import React from 'react'
import { Link } from "react-router-dom"

const ArtistCard = ({artist, limited=true}) => {
  return (
    <Grow style={{transformOrigin: 'top left'}} in timeout={1000} unmountOnExit mountOnEnter>
      <Link className="flex flex-col gap-4 items-center justify-center text-center" to={`/artist/${artist.id}`}>
        <img src={artist?.picture_big} alt={artist?.name} className="rounded-full" />
        <span className={`${limited ? 'text-[11px]' : 'text-sm'} text-gray-300 font-semibold`}>{artist?.name}</span>
      </Link>
    </Grow>
  )
}

export default ArtistCard