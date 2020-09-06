const Chunk = require("./Chunk.js");
const Piece = require("./Piece.js");

module.exports = class {

  constructor(room) {
    this.chunks = [];
    this.pieces = [];
    this.tilesV = 9;
    this.tilesH = 16;
    this.width = 1371;
    this.height = 937;
    this.texture = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1371&q=80";
    this.room = room;
    this.generateChunks();
  }

  generateChunks() {
    let pieceWidth = this.width / this.tilesH;
    let pieceHeight = this.height / this.tilesV;

    this.chunks.length = 0;
    for (let y = 0; y < this.tilesV; y++) {
      for (let x = 0; x < this.tilesH; x++) {
        let piece = new Piece(y * this.tilesH + x);
        piece.cellX = x;
        piece.cellY = y;

        this.pieces.push(piece);
        let chunk = new Chunk();
        chunk.addPiece(piece);
        chunk.positionX = pieceWidth * x * 1.1;
        chunk.positionY = pieceHeight * y * 1.1;
        this.chunks.push(chunk);
      }
    }
  }

  getDetails() {
    return {
      tilesV: this.tilesV,
      tilesH: this.tilesH,
      texture: this.texture,
      chunks: this.chunks.map(c => c.export()),
      pieces: this.pieces.map(p => p.export()),
      width: this.width,
      height: this.height
    }
  }

  getChunkById(id) {
    for (let c of this.chunks) {
      if (c.id == id) return c;
    }
    return null;
  }

  moveChunk(id, x, y) {
    let chunk = this.getChunkById(id);
    if (!chunk) return;

    chunk.positionX = x;
    chunk.positionY = y;

    this.room.broadcast("chunk:move", {
      id: id,
      x: x,
      y: y
    })
  }

}