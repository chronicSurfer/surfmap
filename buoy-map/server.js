const express = require('express');
// const EventEmitter = require ('events');
const app = express();
const WebSocket = require('websocket').server;
const http = require('http');
const PORT = process.env.PORT || 8080;

//middleware
// app.use(express.static(__dirname,'surf-map','src'));
app.use(express.json());

// buoy store (In progress)
class Buoy{
    constructor(name, lat, lon, height, period){
      this.name = name;
      this.lat = lat;
      this.lon = lon;
      this.height = height;
      this.period = period;
    } 
    
    addBuoy (params) {  
        var message = buoys.push(new Buoy(params.name, params.lat, params.lon, params.height, params.period));
        return message;
      };
    }

//updates buoy object
updateBuoyData = (params)=>{
    buoys.forEach((e) =>{
      if(e.name == params.name){
         e.height = params.height;
         e.period = params.period;
         return e;
      }

    });

}

//socket key storage
let socketKey = {};

//websocket server
const server = http.createServer(function(req, res){
    console.log((new Date())+ ' Received request for '+ req.url);
    res.writeHead(404);
    res.end();
});

server.listen(PORT, function(){
    console.log((new Date()) + `Server is listening on port ${PORT}`);
});

const wsServer = new WebSocket({
    httpServer: server,
    autoAcceptConnections: false
});

wsServer.on('request', request=>{   
    console.log((new Date())+' Connection Accepted.');
    const connection = request.accept();
    connection.on('message',message=>{
        console.log((new Date())+' received message');
        connection.sendUTF(message);
        // let socketID = request.headers['sec-websocket-key'];
        // console.log(socketID.json.south);
        // let json = json.parse(message);
        // let id = json['id'];
        // let params = json['params'];
        // let headers = json['headers'];

        // if (method === 'subscribeToBuoys') {
        //     socketKey[]
        // }
    });
});
// const eventEmitter = new events.EventEmitter();

//Error Handling
const errorHandling = (req, res)=>{
    res.status(req.status || 500).send(req.error || 'Server Error');
}

