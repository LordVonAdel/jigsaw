import Piece from "./Piece";

export default class Chunk {
  
  private pieces: Piece[] = [];
  public pixi: PIXI.Container = new PIXI.Container();

  public addPiece(piece: Piece): void {
    this.pieces.push(piece);
    this.pixi.addChild(piece.sprite);
  }

  public setPosition(x: number, y: number): void {
    this.pixi.position.x = x;
    this.pixi.position.y = y;
  }

}