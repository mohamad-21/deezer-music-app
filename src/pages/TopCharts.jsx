import React, { useEffect } from 'react'
import SectionHeader from "../components/SectionHeader"
import SectionTitle from "../components/SectionTitle"
import Charts from "../components/Charts"
import { useDispatch } from "react-redux"
import { hidePlayer } from '../app/features/playerSlice';

const TopCharts = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    });
    window.document.title = 'Top Charts';
    return () => {
      dispatch(hidePlayer());
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