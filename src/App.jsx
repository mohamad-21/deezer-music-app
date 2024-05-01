import { CssBaseline, Link, ThemeProvider} from "@mui/material"
import { useAppContext } from "./contexts/AppContext"
import { MUITheme } from "./theme";
import Header from "./components/Header";
import Player from "./components/player/Player";
import { Route, Routes } from "react-router-dom";
import Discover from "./pages/Discover";
import TopCharts from "./pages/TopCharts";
import TopArtists from "./pages/TopArtists";
import Search from "./pages/Search";
import Saves from "./pages/Saves";
import Artist from "./pages/Artist";
import Footer from "./components/Footer";

function App() {

  const { themeMode, currentMusic, volume, playMode, isPlaying, showPlayer, dispatch } = useAppContext();
  
  return (
    <ThemeProvider theme={MUITheme}>
      
      <CssBaseline />

      <div className={`app text-white `}>
        <div className="text-center py-3 sm:px-12 px-6 text-[13px] bg-zinc-900 text-white leading-6">This app uses <Link href="https://developers.deezer.com/api" sx={{mx: 0.3}} target="_blank">Deezer</Link> API (genres is not working correctly, because results showing by search)</div>
        <div className="flex justify-center">
          <div className="flex flex-col w-full min-h-[100dvh]">
            <Header />
            <div className="py-9 sm:px-12 px-6">
              <Routes>
                <Route index element={<Discover />} />
                <Route path="/search" element={<Search />} />
                <Route path="/saves" element={<Saves />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>

        <div className={`sticky bottom-0 ${showPlayer ? 'block' : 'hidden'} fadeToTop left-0 w-full transition duration-200 z-10`}>
          <Player
            currentMusic={currentMusic}
            dispatch={dispatch}
            volume={volume}
            playMode={playMode}
            isPlaying={isPlaying}
          />
        </div>
      </div>
      
    </ThemeProvider>
  )
}

export default App
