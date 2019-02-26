const WebSocket = require('ws');
const express = require('express');
const EventEmitter = require ('events');
const app = express();
const ws = new WebSocket('ws://localhost:8080', console.log('websocket ready'));
const PORT = process.env.PORT || 8080;
const HOST = '8080';

// const eventEmitter = new events.EventEmitter();

//middleware
// app.use(express.static(__dirname,'surf-map','src'));
app.use(express.json());

//Error Handling
const errorHandling = (req, res)=>{
    res.status(req.status || 500).send(req.error || 'Server Error');
}

//buoy store (In progress)
class Buoy{
    constructor(name, lat, lon, height, period){
      this.name = name;
      this.lat = lat;
      this.lon = lon;
      this.height = height;
      this.period = period;
    } 
    
    boundaries () {
        buoyInBoundary = [];
    }
  }

// websocket connection
ws.on('open', () => {
    ws.send('something');
  });
  
ws.on('message', (data) => {
    console.log(data);
  });

ws.on('close', ()=>console.log('closing connection'));

// server setup     
app.listen(PORT, console.log(`Server is listening for waves on port ${PORT}`));

