const WebSocket = require('ws');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '8080';

//server setup
const ws = new WebSocket.Server({ server: app.listen(PORT) }, console.log(`Server is listening for waves on port ${PORT}`));
 


//middleware
// app.use(express.static(__dirname,'surf-map','src'));
app.use(express.json());

//Error Handling
const errorHandling = (req, res)=>{
    res.status(req.status || 500).send(req.error || 'Server Error');
}

// websocket connection
ws.on('connection', (event)=>{
    event.on('message', (msg)=>{
        console.log('message from client');
    });

ws.on('close', ()=>console.log('closing connection'));
});
                    


