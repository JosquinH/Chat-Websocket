const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080')

ws.on('open',  () => {
  
  ws.send('client 1 connected')
})

ws.on('error',  (error) => {
  console.log(error)
})