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
    //this.texture = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1371&q=80";
    this.texture = "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    this.room = room;
    this.sawStyles = [];
    this.pieceWidth = this.width / this.tilesH;
    this.pieceHeight = this.height / this.tilesV;
    this.generateChunks();
    this.generateSawStyles();
  }

  generateSawStyles() {
    for (let i = 0; i <= this.tilesV * this.tilesH * 2; i++) {
      this.sawStyles.push(Math.floor(Math.random() * 4));
    }
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
        let chunk = new Chunk(this);
        chunk.addPiece(piece);
        //chunk.positionX = pieceWidth * x * 1.1;
        //chunk.positionY = pieceHeight * y * 1.1;

        chunk.positionX = Math.random() * this.width;
        chunk.positionY = Math.random() * this.height;

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
      height: this.height,
      sawStyles: this.sawStyles
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
    });
  }

  dropChunk(id, x, y) {
    let chunk = this.getChunkById(id);
    if (!chunk) return;
    chunk.drop(x, y);

    this.room.broadcast("chunk:move", {
      id: id,
      x: x,
      y: y
    });
  }

  getPiecesAtPosition(x1, y1) {
    return this.pieces.filter(piece => {
      let pos = piece.getPosition();
      return (x1 >= pos.x && y1 >= pos.y && x1 < pos.x + this.pieceWidth && y1 < pos.y + this.pieceHeight);
    });
  }

}