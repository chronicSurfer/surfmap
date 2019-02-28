$(document).ready( initializeApplication);

function initializeApplication(){
	addEventHandlers();
	initializeSocket();
}
let ws = null;

function addEventHandlers(){
	$("#sendButton").click( handleMessageSend );
}

function handleMessageSend(){
	console.log('message send clicked');
	// const message = $("#userMessage").text();
	// sendMessageToServer(message);
	// $("#userMessage").text('');
}

function initializeSocket(){
	// var username = prompt('what is your user name');
	if(!window.WebSocket){
		console.error('websocket is not available!');
		return false;
	}
    ws = new WebSocket('ws://localhost:8080');
    ws.onopen=()=>{
        console.log('connected');
        ws.send('anyone home');
    }
    ws.onclose = ()=>{
        console.log('Disconnected at '+ (new Date()));
    }
}