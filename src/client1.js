const WebSocket = require('ws');

const readline = require('readline')

const ws = new WebSocket('ws://localhost:8080')


ws.on('open',  () => {
  const data = JSON.stringify({sender: 'Client_1', recipient: 'SERVER', status: 'FIRST_MESSAGE', message: 'Client 1 Connected'})
  ws.send(data)
})

ws.on('message', (data) => {
  const jsonData = JSON.parse(data)
  console.log('received from %s : %s', jsonData.sender, jsonData.message)
})


ws.on('error',  (error) => {
  console.log(error)
})


// Pour envoyer des message depuis le terminal

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (line) => {
    if (ws.readyState === 1) {
      const data = JSON.stringify({sender: 'Client_1', recipient: 'Client_2', status: 'MESSAGE', message: line})
      ws.send(data)
    }
})