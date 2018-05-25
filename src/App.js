import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//mobx
import {Provider} from 'mobx-react';
import Store from './stores/store';

import { ApolloProvider } from 'react-apollo';
import makeClient from './lib/apollo';

import Dashboard from './pages/Dashboard'

const client = makeClient(process.env.REACT_APP_BACKEND_URI + '/query');
const store = new Store()

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Provider store={store}>
              <Switch>
                <Route path='/' component={Dashboard} />
              </Switch>
          </Provider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

// <Route path='/login' component={Login} />
