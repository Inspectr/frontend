import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AppBar from './components/AppBar'
import ChartGrid from './components/ChartGrid'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <ChartGrid />
      </div>
    );
  }
}

export default App;
