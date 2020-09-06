let nextChunkId = 0;

module.exports = class {

  constructor(puzzle) {
    this.pieces = [];
    this.positionX = 0;
    this.positionY = 0;
    this.id = nextChunkId++;
    this.puzzle = puzzle;
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

  drop(x, y) {
    const pw = this.puzzle.pieceWidth;
    const ph = this.puzzle.pieceHeight;

    this.positionX = x;
    this.positionY = y;

    for (let piece of this.pieces) {
      let position = piece.getPosition();
      let center = { x: position.x + pw / 2, y: position.y + ph / 2 }
      
      let top = this.puzzle.getPiecesAtPosition(center.x, center.y - ph)[0];
      let bottom = this.puzzle.getPiecesAtPosition(center.x, center.y + ph)[0];
      let left = this.puzzle.getPiecesAtPosition(center.x - pw, center.y)[0];
      let right = this.puzzle.getPiecesAtPosition(center.x + pw, center.y)[0];

      if (top && top.chunk != piece.chunk) {
        if (top.cellX == piece.cellX && top.cellY == piece.cellY - 1) top.chunk.merge(this);
      }
      if (bottom && bottom.chunk != piece.chunk) {
        if (bottom.cellX == piece.cellX && bottom.cellY == piece.cellY + 1) bottom.chunk.merge(this);
      }
      if (left && left.chunk != piece.chunk) {
        if (left.cellX == piece.cellX - 1 && left.cellY == piece.cellY) left.chunk.merge(this);
      }
      if (right && right.chunk != piece.chunk) {
        if (right.cellX == piece.cellX + 1 && right.cellY == piece.cellY) right.chunk.merge(this);
      }
    }
  }

  merge(otherChunk) {
    const pw = this.puzzle.pieceWidth;
    const ph = this.puzzle.pieceHeight;
    const reference = this.pieces[0];

    for (let piece of otherChunk.pieces) {
      this.addPiece(piece);
      piece.positionX = reference.positionX + (piece.cellX - reference.cellX) * pw; 
      piece.positionY = reference.positionY + (piece.cellY - reference.cellY) * ph;
    }
    otherChunk.pieces.length = 0;

    this.puzzle.room.broadcast("chunk", this.export());
  }

}