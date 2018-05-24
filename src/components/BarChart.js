import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import React, { Component } from 'react';

// Todo pass sizes
const GridBarChart = ({ height, data }) => (
  <ResponsiveContainer width='100%' height={height}>
    <BarChart data={data}>
       <Bar dataKey='uv' fill='#8884d8'/>
     </BarChart>
  </ResponsiveContainer>
)

export default GridBarChart
