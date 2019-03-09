import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import surfline from './images/surfline.png';

var WebSocketClient = require('websocket').client;
var client = new WebSocket('ws://localhost:8080');

class GoogleMap extends Component {
  
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     name: '',
  //     lat: null,
  //     lng: null,
  //     height: null,
  //     period: null
  //   }
  // }

initializeSocket(){
    
      
      client.on=('open',function() {
          console.log('connected');
          client.send('subscribeToBuoys');
      })

      client.on=('message', function(event){
        var server_message = JSON.parse(event.data);
        console.log(server_message);
        // constructor(server_message) {
        //   super(props);
        //   this.state = {
        //     name: '',
        //     lat: null,
        //     lng: null,
        //     height: null,
        //     period: null
        //   }
        // }
        // this.setState(server_message);
      })

      client.on = ('close',function(){
          console.log('Disconnected at '+ (new Date()));
      })

      if(!window.WebSocket){
        console.error('websocket is not available!');
        return false;
      }
  }

  render() {
    return (
        <Map 
        google={this.props.google}
        initialCenter={{
          lat: 33.655716,
          lng: -118.003551
        }}
        zoom={12}>

        {/* <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        <Marker
          name={'Your position'}
          position={{lat: this.state.lat, lng: this.state.lng}}
          icon={{
            url: '/surfline.png'
            // anchor: new google.maps.Point(32,32),
            // scaledSize: new google.maps.Size(64,64)
          }} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
        {/* </InfoWindow> */} 
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDazIMQhUQPgXuo9qEBvl6n-tyUBvUxCAg')
})(GoogleMap)
