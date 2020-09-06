let nextChunkId = 0;

module.exports = class {

  constructor() {
    this.pieces = [];
    this.positionX = 0;
    this.positionY = 0;
    this.id = nextChunkId++;
  }

  export() {
    return {
      x: this.positionX,
      y: this.positionY,
      pieces: this.pieces.map(p => p.export()),
      id: this.id
    }
  }

  addPiece(piece) {
    this.pieces.push(piece);
    piece.chunk = this;
  }

}