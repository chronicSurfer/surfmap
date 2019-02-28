import React, { Component } from 'react';
import './App.css';


class UserMessage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const socket = new WebSocket('ws://localhost:8080');
 
        socket.addEventListener('open', () => {
        socket.send('Hello World!');
        });
        
        socket.addEventListener('message', event => {
        console.log(`Message from server: ${event.data}`);
});
    }
  render() {
    return (
        <div>
            {/* <div id="messageDisplay">
            
            </div>
            
            <div id="userOutputArea">
                    <div id="userMessage" contentEditable="true"></div>
                    <div id="sendButtonContainer">
                        <button id="sendButton">Send</button>
                    </div>
            </div> */}

        </div>
    );
  }
}

export default UserMessage;
