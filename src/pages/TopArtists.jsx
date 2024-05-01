import SectionHeader from '../components/SectionHeader';
import SectionTitle from '../components/SectionTitle';
import Artists from '../components/Artists';
import { useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";

const TopArtists = () => {

  const { dispatch } = useAppContext();

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    window.document.title = 'Top Artists';
    return () => {
      dispatch({type: 'HIDE_PLAYER'});
    }
  }, []);

  return (
    <div>
      <SectionHeader>
        <SectionTitle>Top Artists</SectionTitle>
      </SectionHeader>
      <Artists limited={false} />
    </div>
  )
}

export default TopArtists