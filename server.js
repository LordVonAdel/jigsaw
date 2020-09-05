const express = require('express');
const Client = require('./server/Client.js');
const Room = require('./server/Room.js');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));

http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  server.clientJoined(socket);
});

class Server {

  constructor() {
    this.clients = [];
    this.nextId = 1;

    this.rooms = [
      new Room()
    ];
  }

  clientJoined(socket) {
    let client = new Client(socket, this.nextId++);
    this.clients.push(client);
    this.rooms[0].addClient(client)
  }

}

server = new Server();