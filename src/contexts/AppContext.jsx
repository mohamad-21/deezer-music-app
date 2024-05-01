import { createContext, useContext, useReducer, useState, useEffect } from "react"
import settings from "../settings.js";

const AppContext = createContext();

const initialTheme = localStorage.getItem('theme') || 'dark';

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

export const AppContextProvider = ({children}) => {

  const [themeMode, setThemeMode] = useState(initialTheme);

  const detectCurrentList = (state) => {
    return  state.isTopChartsPlaying ? state.topCharts : state.musics;
  }

  const reducer = (state, action) => {
    switch(action.type) {

      case 'SET_DATA': {
        return {
          ...state,
          musics: action.data
        }
      }

      case 'SET_ARTISTS_DATA': {
        return {
          ...state,
          topArtists: action.data
        }
      }

      case 'SET_TOP_CHARTS_DATA': {
        return {
          ...state,
          topCharts: action.data
        }
      }

      case 'LOAD_CURRENT_MUSIC': {
        const currentList = detectCurrentList(state);

        return {
          ...state,
          currentMusic: currentList[state.currentIndex]
        }
      }

      case 'PLAY': {
        return {
          ...state,
          isPlaying: true,
          showPlayer: true
        };
      }

      case 'PAUSE': {
        return {
          ...state,
          isPlaying: false
        };
      }

      case 'PLAY_PREVIOUS': {
        const currentList = detectCurrentList(state);

        return {
          ...state,
          currentIndex: state.currentIndex === 0 ? currentList.length - 1 : state.currentIndex -= 1
        };
      }

      case 'PLAY_NEXT': {
        const currentList = detectCurrentList(state);

        return {
          ...state,
          currentIndex: state.currentIndex === currentList.length - 1 ? 0 : state.currentIndex += 1,
        };
      }

      case 'CHANGE_VOLUME': {
        return {
          ...state,
          volume: action.volume
        };
      }

      case 'CHANGE_PLAY_MODE': {
        return {
          ...state,
          playMode: action.playMode
        };
      }

      case 'PLAY_SHUFFLE': {
        const currentList = detectCurrentList(state);
        let randomIndex = Math.floor(Math.random() * currentList.length); 
        while(randomIndex === state.currentIndex) {
        randomIndex = Math.floor(Math.random() * currentList.length); 
        }
        return {
          ...state,
          currentIndex: randomIndex,
        };
      }

      case 'SHOW_PLAYER': {
        return {
          ...state,
          showPlayer: true,
        };
      }

      case 'HIDE_PLAYER': {
        return {
          ...state,
          showPlayer: false,
          isPlaying: false
        };
      }

      case 'PLAY_MAIN_TRACKS': {
        const currentIndex = state.musics.findIndex(music => music.id === action.id);
        return {
          ...state,
          currentIndex,
          currentMusic: state.musics[currentIndex],
          isPlaying: true,
          showPlayer: true,
          isTopChartsPlaying: false,
        }
      }

      case 'PLAY_TOP_CHARTS': {
        const currentIndex = state.topCharts.findIndex(music => music.id === action.id);
        return {
          ...state,
          currentIndex,
          currentMusic: state.topCharts[currentIndex],
          isPlaying: true,
          showPlayer: true,
          isTopChartsPlaying: true
        }
      }

      case 'ENABLE_ITEMS': {
        return {
          ...state,
          enabledItems: true
        }
      }

      case 'DISABLE_ITEMS': {
        return {
          ...state,
          enabledItems: false
        }
      }

      default: {
        return state
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if(state.currentMusic.id) {
      dispatch({type: 'LOAD_CURRENT_MUSIC'});
    }
  }, [state.currentIndex]);

  useEffect(() => {
    localStorage.setItem('theme', themeMode);
  }, [themeMode]);

  console.log(state);

  return (
    <AppContext.Provider 
      value={{
        themeMode,
        setThemeMode,
        dispatch,
        ...state
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);