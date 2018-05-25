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

// metrics {
//   startsAt
//   interval
//   size
// }

const query = gql`
query Trail($event: String){
  trails(event: $event) {
    ${trailFields.join("\n")}
  }
}
`

const queryOptions = {
  options: ({ store: query}) => ({
    variables: {
      event: query['event'] || ''
    }
  })
}

const metricsData = [
      {name: 'Page A', uv: 4000},
      {name: 'Page B', uv: 3000},
      {name: 'Page C', uv: 2000},
      {name: 'Page D', uv: 2780},
      {name: 'Page E', uv: 1890},
      {name: 'Page F', uv: 2390},
      {name: 'Page G', uv: 3490},
      {name: 'Page D', uv: 2780},
      {name: 'Page E', uv: 1890},
      {name: 'Page F', uv: 2390},
      {name: 'Page G', uv: 3490},
      {name: 'Page E', uv: 1890},
      {name: 'Page F', uv: 2390},
      {name: 'Page G', uv: 3490},
];

const Dashboard = inject("store")(graphql(query, queryOptions)(observer((
  { data, data: { loading, trails, metrics }, store, store: { query }}
) => {
  console.log(JSON.stringify(trails, null, 2))
  return (
  <div className="App">
    <AppBar>
      <Search handleChange={(args) => store.setQuery(args)}/>
    </AppBar>
    <div style={dashStyle}>
      <ChartGrid data={metricsData} />
      <Trails data={trails} />
    </div>
  </div>
  )
})))

export default Dashboard
