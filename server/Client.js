module.exports = class {

  constructor(socket, id) {
    this.id = id;
    this.name = "";
    this.socket = socket;
    this.room = null;
    this.positionX = 0;
    this.positionY = 0;

    this.socket.on("move", data => {
      this.positionX = data.x;
      this.positionY = data.y;
      this.room.broadcast("player:move", {
        playerId: this.id,
        x: data.x,
        y: data.y
      });
    });

    this.socket.on("disconnect", reason => {
      console.log(reason);
      this.room.removeClient(this);
    });
  }

  setRoom(room) {
    this.room = room;
  }

}