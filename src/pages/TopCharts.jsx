import React, { useEffect } from 'react'
import SectionHeader from "../components/SectionHeader"
import SectionTitle from "../components/SectionTitle"
import Charts from "../components/Charts"
import { useAppContext } from "../contexts/AppContext"

const TopCharts = () => {

  const { dispatch } = useAppContext();

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    window.document.title = 'Top Charts';
    return () => {
      dispatch({type: 'HIDE_PLAYER'});
    }
  }, []);

  return (
    <div>
      <SectionHeader>
        <SectionTitle>Top Charts</SectionTitle>
      </SectionHeader>
      <Charts limited={false} />
    </div>
  )
}

export default TopCharts