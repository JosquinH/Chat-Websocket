const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const wsObject = {}

wss.on('connection', (ws) => {

  ws.on('message', (data) => {
    const jsonData = JSON.parse(data)
    if (jsonData.status === 'FIRST_MESSAGE') {
      wsObject[jsonData.sender] = ws
      console.log('%s connected', jsonData.sender)
    } else if (jsonData.status === 'MESSAGE') {
      if (wsObject[jsonData.recipient]) {
        if (wsObject[jsonData.recipient].readyState === 1) {
          wsObject[jsonData.recipient].send(data)
        } else {
          console.log('%s not connected', jsonData.recipient)
        }
      } else {
        console.log('%s not connected', jsonData.recipient)
      }
    }   
  })
  
})