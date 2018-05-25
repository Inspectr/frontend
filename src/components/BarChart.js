import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import React, { Component } from 'react';
import dayjs from 'dayjs';

// Todo pass sizes
const GridBarChart = ({ height, data }) => {
  const chartData = (data || []).map( d => {
    return {
      ...d,
      formattedDate: dayjs(d.startsAt).format('MM-DDTHH')
    }
  })

  return (
    <ResponsiveContainer width='100%' height={height}>
      <BarChart data={chartData}>
         <XAxis dataKey="formattedDate"/>
         <Bar dataKey='size' fill='#8884d8'/>
         <Tooltip />
       </BarChart>
    </ResponsiveContainer>
  )
}

export default GridBarChart
