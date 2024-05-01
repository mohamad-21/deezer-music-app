import React, { useEffect } from 'react'
import useFetch from "../hooks/useFetch"
import config from "../config"
import { useAppContext } from "../contexts/AppContext";
import SectionTitle from "./SectionTitle";
import LinkToPage from "./LinkToPage";
import SectionHeader from "./SectionHeader";
import ChartCard from "./ChartCard";
import { List } from "@mui/material";

const Charts = ({limited=true}) => {

  const { data, isFetching } = useFetch(config.base_url + `chart?limit=${limited ? '5' : '50'}`);

  const { dispatch, topCharts, currentMusic, isPlaying, enabledItems } = useAppContext();

  useEffect(() => {
    if(data) {
      dispatch({type: 'SET_TOP_CHARTS_DATA', data: data?.tracks?.data});
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
            isFetching={isFetching}
            limited={limited}
          />
        ))}
      </List>
    </div>
  )
}

export default Charts