import React from 'react';

import { inject, observer } from "mobx-react"

import AppBar from '../components/AppBar'
import ChartGrid from '../components/ChartGrid'

const Dashboard = inject("store")(observer(({ store: { query: { metrics }}}) => (
  <div className="App">
    <AppBar />
    <ChartGrid data={metrics} />
  </div>
)))

export default Dashboard
