const express = require('express');
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
        // return message;
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

var buoys = [];

subscribeToBuoys = (params) => {
    var buoyListings = [];
    buoys.forEach((e)=>{
        if((e.lat < params.north && e.lat > params.south ) && (e.lon > params.west && e.lon < params.east)){
            buoyListings.push(e);
        }
    })
    return buoyListings;
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
        var socketID = req.headers['sec-websocket-key']; 

        //parses the JSON-RPC request
        var json = JSON.parse(msg); 
        var id = json['id'];
        var method = json['method'];
        var params = json['params'];
        var headers = json['headers'];

        //subscribe to buoy functionality
        if (method == "subscribeToBuoys") {
            socketKey[socketID] = [params.north,params.south,params.east,params.west];
            buoyListings = subscribeToBuoys(params);
            connection.send('{"rpc": "2.0", "result": "ok", "id": "' + id + '"}');

            //sends all buoys that fall within bounding box to client
            buoyListings.forEach(function(element) {
                connection.send('{"rpc": "2.0", "method": "buoyNotification", "params": {"name": "' + element.name + '","lat": ' + element.lat + ',"lon": ' + element.lon + ',"height": ' + element.height + ',"period": ' + element.period + '}}');
                });
            }

        
        else if (method == "addBuoy") {
            addBuoy(params, id);

            //subscribeToBuoys functionality
            Object.keys(socketKey).forEach(function(key) {
                connection.id = key;
                if((params.lat < socketKey[key].north && params.lat > socketKey[key].south) && (params.lon < socketKey[key].east && params.lon > socketKey[key].west)){
                connection.id.send('{"rpc": "2.0", "method": "buoyNotification", "params": {"name": "' + params.name + '","lat": ' + params.lat + ',"lon": ' + params.lon + ',"height": ' + params.height + ',"period": ' + params.period + '}}');
                }
            });
                connection.send('{"rpc": "2.0", "result": "ok", "id": "' + id + '"}');
                } 

        //updateBuoy Functionality        
        else if (method == "updateBuoyData") {
            updatedBuoy = updateBuoyData(params);
            connection.send('{"rpc": "2.0", "result": "ok", "id": "' + id + '"}');

            Object.keys(socketKey).forEach(function(key) {
                connection.id = key;
                if((updatedBuoy.lat < socketKey[key].north && updatedBuoy.lat > socketKey[key].south) && (updatedBuoy.lon < socketKey[key].east && updatedBuoy.lon > socketKey[key].west))
                {
                connection.id.send('{"rpc": "2.0", "method": "buoyNotification", "params": {"name": ' + updatedBuoy.name + ',"lat": ' + updatedBuoy.lat + ',"lon": ' + updatedBuoy.lon + ',"height": ' + updatedBuoy.height + ',"period": ' + updatedBuoy.period + '}}');
                }
            });
            }
    connection.on('close',()=>console.log('Connection Closed'));
    });
});

//Error Handling
const errorHandling = (req, res)=>{
    res.status(req.status || 500).send(req.error || 'Server Error');
}