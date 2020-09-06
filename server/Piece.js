module.exports = class Piece {

  constructor(id) {
    this.chunk = null;
    this.id = id;

    // Cell index in the source image
    this.cellX = 0;
    this.cellY = 0;

    // Position relative to chunk
    this.positionX = 0;
    this.positionY = 0;
  }

  export() {
    return {
      x: this.positionX,
      y: this.positionY,
      id: this.id,
      cellX: this.cellX,
      cellY: this.cellY
    }
  }

  getPosition() {
    return {
      x: this.chunk.positionX + this.positionX,
      y: this.chunk.positionY + this.positionY
    }
  }

}