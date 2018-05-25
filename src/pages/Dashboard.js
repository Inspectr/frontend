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
query Trail($event: String){
  trails(event: $event) {
    ${trailFields.join("\n")}
  }
}
`

const queryOptions = {
  options: ({ store}) => {
    // debugger
    console.log(JSON.stringify(store.query, null, 2))
    return ({
      variables: {
        event: store.query.event || ''
      }
    })
  }
}

const handleSearchChange = (props, args) => {
  props.store.setQuery(args)
  props.data.refetch()
}

const Dashboard = inject("store")(observer(graphql(query, queryOptions)((
  { data, data: { loading, trails, metrics }, store, store: { query }}
) => {
  return (
  <div className="App">
    <AppBar>
      <Search handleChange={(args) => { handleSearchChange({store, data}, args) }}/>
    </AppBar>
    <div style={dashStyle}>
      <ChartGrid />
      <Trails data={trails} />
    </div>
  </div>
  )
})))

export default Dashboard
