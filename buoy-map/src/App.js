import React, { Component } from 'react';
import surflinelogo from './images/surflinelogo.png';
import './App.css';
import GoogleMap from './GoogleMap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={surflinelogo} alt=""/>
        </header>
        <GoogleMap/>
      </div>
    );
  }
}

export default App;