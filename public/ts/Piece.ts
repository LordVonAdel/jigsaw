import Puzzle from "./Puzzle";

export default class Piece {
  
  private mask: PIXI.Graphics;
  private id: number;
  private cellX: number;
  private cellY: number;

  public sprite: PIXI.Sprite;

  constructor(puzzle: Puzzle, id: number, cellX: number, cellY: number) {
    this.cellX = cellX;
    this.cellY = cellY;

    this.mask = new PIXI.Graphics();
    this.mask.beginFill(0xFFFFFF, 1);
    //this.mask.drawRect(cellX * puzzle.pieceWidth, cellY * puzzle.pieceHeight, puzzle.pieceWidth, puzzle.pieceHeight);
    this.mask.drawRect(0, 0, puzzle.pieceWidth, puzzle.pieceHeight);
    this.mask.endFill();

    this.sprite = new PIXI.Sprite(puzzle.texture);
    //this.sprite.x -= cellX * puzzle.pieceWidth;
    //this.sprite.y -= cellY * puzzle.pieceHeight;

    this.sprite.anchor.x = (cellX * puzzle.pieceWidth) / puzzle.width;
    this.sprite.anchor.y = (cellY * puzzle.pieceHeight) / puzzle.height;

    this.sprite.mask = this.mask;
    this.sprite.addChild(this.mask);

    this.id = id;
  }

}