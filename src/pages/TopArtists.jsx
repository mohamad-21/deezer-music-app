import SectionHeader from '../components/SectionHeader';
import SectionTitle from '../components/SectionTitle';
import Artists from '../components/Artists';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hidePlayer } from "../app/features/playerSlice";

const TopArtists = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    window.document.title = 'Top Artists';
    return () => {
      dispatch(hidePlayer());
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