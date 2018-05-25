import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { inject, observer } from "mobx-react"

import AppBar from '../components/AppBar'
import ChartGrid from '../components/ChartGrid'
import Trails from '../components/Trails'

const query = gql`
{
  allTrails {
    id
    created
    event
    eventMetadata
    actor
    actorMetadata
    target
    targetMetadata
    origin
    originMetadata
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
    <AppBar />
    <ChartGrid data={metrics} />
    <Trails data={allTrails} />
  </div>
  )
})))

export default Dashboard
