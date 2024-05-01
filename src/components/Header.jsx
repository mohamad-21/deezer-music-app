import { useEffect, useState } from "react";
import Navbar from './Navbar';
import Searchbar from './Searchbar';
import Topbar from "./Topbar";

const Header = () => {

  const [showSearchbar, setShowSearchbar] = useState(false);
  const [showTopbar, setShowTopbar] = useState(false);
  const [bg, setBg] = useState('bg-transparent');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      document.documentElement.scrollTop > 70 ? setBg('bg-black/70') : setBg('bg-transparent');
    })

    return () => {
      window.removeEventListener('scroll');
    }
  }, []);

  return (
    <>
      <header className={`sticky top-0 left-0 ${bg} backdrop-blur-md z-10 duration-200 sm:px-12 px-6`}>
        <Navbar setShowTopbar={setShowTopbar} setShowSearchbar={setShowSearchbar} />
      </header>
      <Topbar showTopbar={showTopbar} setShowTopbar={setShowTopbar} />
      <Searchbar showSearchbar={showSearchbar} setShowSearchbar={setShowSearchbar} />
    </>
  )
}

export default Header