import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMap extends Component {
  render() {
    return (
        <Map 
        google={this.props.google}
        initialCenter={{
          lat: 33.655716,
          lng: -118.003551
        }}
        zoom={12}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            {/* <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div> */}
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDazIMQhUQPgXuo9qEBvl6n-tyUBvUxCAg')
})(GoogleMap)
