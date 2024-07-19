import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from '../config';

const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.base_url
  }),
  endpoints: (build) => ({
    getSongsByGenre: build.query({
      query: ({ genre, limited = false }) => `search?q=${genre + (limited ? `&limit=10` : '')}`,
      transformResponse: (response) => {
        return response.data
      }
    }),
    getTopCharts: build.query({
      query: (limit = 5) => `chart?limit=${limit}`,
      transformResponse: (response) => response.tracks.data
    }),
    getTopArtists: build.query({
      query: (limit = 5) => `chart?limit=${limit}`,
      transformResponse: (response) => response.artists.data
    }),
    getArtistById: build.query({
      query: ({ id, getTopSongs = false }) => `artist/${id + (getTopSongs ? '/top?limit=30' : '')}`
    }),
    searchSong: build.query({
      query: (searchTerm) => `search?q=${searchTerm}`,
      transformResponse: (response) => response.data
    })
  })
});


export const { useGetSongsByGenreQuery, useGetTopArtistsQuery, useGetTopChartsQuery, useGetArtistByIdQuery, useSearchSongQuery } = deezerApi;

export default deezerApi;