import { createSlice } from "@reduxjs/toolkit";
import settings from "../../settings";

const initialState = {
  musics: [],
  topArtists: [],
  topCharts: [],
  currentIndex: 0,
  currentMusic: {},
  volume: settings.player.volume,
  playMode: settings.player.playMode,
  isPlaying: false,
  showPlayer: false,
  isTopChartsPlaying: false,
  enabledItems: true,
}

const detectCurrentList = (state) => {
  return  state.isTopChartsPlaying ? state.topCharts : state.musics;
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {

    setData: (state, action) => {
      state.musics = action.payload.data;
    },

    setArtistsData: (state, action) => {
      state.topArtists = action.payload.data;
    },

    setTopChartsData: (state, action) => {
      state.topCharts = action.payload.data;
    },

    loadCurrentMusic: (state, action) => {
      const currentList = detectCurrentList(state);

      state.currentMusic = currentList[state.currentIndex];
    },

    play: (state, action) => {
        state.isPlaying = true;
        state.showPlayer = true;
    },

    pause: (state, action) => {
      state.isPlaying = false;
    },

    playPrevious: (state, action) => {
      const currentList = detectCurrentList(state);

        state.currentIndex = state.currentIndex === 0 ? currentList.length - 1 : state.currentIndex -= 1;
    },

    playNext: (state, action) => {
      const currentList = detectCurrentList(state);

      state.currentIndex = state.currentIndex === currentList.length - 1 ? 0 : state.currentIndex += 1;
    },

    changeVolume: (state, action) => {
      state.volume = action.payload.volume;
    },

    changePlayMode: (state, action) => {
      state.playMode = action.payload.playMode;
    },

    playShuffle: (state, action) => {
      const currentList = detectCurrentList(state);
      let randomIndex = Math.floor(Math.random() * currentList.length); 
      while(randomIndex === state.currentIndex) {
      randomIndex = Math.floor(Math.random() * currentList.length); 
      }
      state.currentIndex = randomIndex;
    },

    showPlayer: (state, action) => {
      state.showPlayer = true;
    },

    hidePlayer: (state, action) => {
      state.showPlayer = false;
      state.isPlaying = false;
    },

    playMainTracks: (state, action) => {
      const currentIndex = state.musics.findIndex(music => music.id === action.payload.id);
      state.currentIndex = currentIndex;
      state.currentMusic = state.musics[currentIndex];
      state.isPlaying = true;
      state.showPlayer = true;
      state.isTopChartsPlaying = false;
    },

    playTopCharts: (state, action) => {
      const currentIndex = state.topCharts.findIndex(music => music.id === action.payload.id);
      state.currentIndex = currentIndex;
      state.currentMusic = state.topCharts[currentIndex];
      state.isPlaying = true;
      state.showPlayer = true;
      state.isTopChartsPlaying = true;
    },

    enableItems: (state, action) => {
      state.enabledItems = true;
    },

    disableItems: (state, action) => {
      state.enabledItems = false;
    }
  }
});

export const { 
  setData,
  setArtistsData,
  setTopChartsData,
  loadCurrentMusic,
  play,
  pause,
  playPrevious,
  playNext,
  changeVolume,
  changePlayMode,
  playShuffle,
  showPlayer,
  hidePlayer,
  playMainTracks,
  playTopCharts,
  enableItems,
  disableItems
} = playerSlice.actions;

export default playerSlice.reducer;