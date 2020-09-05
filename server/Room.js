const Puzzle = require("./Puzzle.js");

module.exports = class {

  constructor() {
    this.clients = [];
    this.puzzle = new Puzzle();
  }

  addClient(client) {
    for (let otherClient of this.clients) {
      client.socket.emit('player:joined', {playerId: otherClient.id});
      client.socket.emit('player:move', {playerId: otherClient.id, x: otherClient.positionX, y: otherClient.positionY});
    }

    this.clients.push(client);
    client.room = this;
    this.broadcast('player:joined', {playerId: client.id});
    client.socket.emit('puzzle:details', this.puzzle.getDetails());
  }

  removeClient(client) {
    let index = this.clients.indexOf(client);
    if (index >= 0) {
      this.clients.splice(index, 1);
    }
    this.broadcast("player:left", {
      playerId: client.id
    });
  }

  broadcast() {
    for (let client of this.clients) {
      client.socket.emit(...arguments);
    }
  }

}