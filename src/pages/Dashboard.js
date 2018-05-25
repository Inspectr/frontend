import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { inject, observer } from "mobx-react"

import AppBar    from '../components/AppBar'
import ChartGrid from '../components/ChartGrid'
import Trails    from '../components/Trails'
import Search    from '../components/Search'

import { trailFields } from '../constants'

const dashStyle = {
  padding: '10px'
}

const query = gql`
{
  trails {
    ${trailFields.join("\n")}
  }
  metrics {
    startsAt
    interval
    size
  }
}
`

const Dashboard = graphql(query)(inject("store")(observer((
  { data, data: { loading, trails, metrics }, store: { query: { metrics: storeMetrics }}}
) => {
  return (
  <div className="App">
    <AppBar />
    <div style={dashStyle}>
      <Search handleChange={(chips) => console.log(chips)}/>
      <ChartGrid data={storeMetrics} />
      <Trails data={trails} />
    </div>
  </div>
  )
})))

export default Dashboard
