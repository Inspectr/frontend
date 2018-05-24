import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { inject, observer } from "mobx-react"

import AppBar from '../components/AppBar'
import ChartGrid from '../components/ChartGrid'

const query = gql`
{
  allTrails {
    id
    created_at
    timestamp
    event
    actor
    actor_metadata
    target
    target
    target_metadata
    origin
    origin_metadata
  }
  allMetrics {
    starts_at
    interval
    size
  }
}
`
// @graphql(query)

const Dashboard = graphql(query)(inject("store")(observer((
  { data, data: { loading, allTrails, allMetrics }, store: { query: { metrics }}}
) => {
  return (
  <div className="App">
    <div>{JSON.stringify(allTrails,null, 2) }</div>
    <AppBar />
    <ChartGrid data={metrics} />
  </div>
  )
})))

export default Dashboard
