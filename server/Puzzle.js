const Chunk = require("./Chunk.js");
const Piece = require("./Piece.js");

module.exports = class {

  constructor() {
    this.chunks = [];
    this.pieces = [];
    this.tilesV = 9;
    this.tilesH = 16;
    this.width = 1371;
    this.height = 937;
    this.texture = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1371&q=80";
    this.generateChunks();
  }

  generateChunks() {
    let pieceWidth = this.width / this.tilesH;
    let pieceHeight = this.height / this.tilesV;

    this.chunks.length = 0;
    for (let x = 0; x < this.tilesH; x++) {
      for (let y = 0; y < this.tilesV; y++) {
        let piece = new Piece(y * this.tilesH + x);
        let chunk = new Chunk();
        chunk.addPiece(piece);
        chunk.positionX = pieceWidth * 1.2 * x;
        chunk.positionY = pieceHeight * 1.2 * y;
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
      width: this.width,
      height: this.height
    }
  }

}