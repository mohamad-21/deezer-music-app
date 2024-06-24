import React, { useEffect } from 'react'
import SectionTitle from "./SectionTitle";
import LinkToPage from "./LinkToPage";
import SectionHeader from "./SectionHeader";
import ChartCard from "./ChartCard";
import { List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTopChartsData } from "../app/features/playerSlice";
import { useGetTopChartsQuery } from "../app/api";

const Charts = ({limited=true}) => {

  const { data, isLoading } = useGetTopChartsQuery(limited ? 5 : 50);

  const { topCharts, currentMusic, isPlaying, enabledItems, isTopChartsPlaying } = useSelector(state => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    if(data) {
      dispatch(setTopChartsData({ data }));
    }
  }, [data]);


  return (
    <div>
      {limited && (
        <SectionHeader>
          <SectionTitle>Top Charts</SectionTitle>
          <LinkToPage to={`/top-charts`}>See more</LinkToPage>
        </SectionHeader>
      )}
      <List className="flex flex-col gap-5">
        {topCharts.map(chart => (
          <ChartCard 
            key={chart.id} 
            {...chart} 
            currentMusic={currentMusic}
            isPlaying={isPlaying}
            dispatch={dispatch}
            enabledItems={enabledItems}
            isLoading={isLoading}
            limited={limited}
            isTopChartsPlaying={isTopChartsPlaying}
          />
        ))}
      </List>
    </div>
  )
}

export default Charts