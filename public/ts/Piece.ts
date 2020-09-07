import Puzzle from "./Puzzle";
import SawStyles from "./SawStyles";

export default class Piece {
  
  private mask: PIXI.Graphics;
  private _id: number;
  private cellX: number;
  private cellY: number;
  private puzzle: Puzzle;

  public sprite: PIXI.Sprite;

  constructor(puzzle: Puzzle, id: number, cellX: number, cellY: number) {
    this.cellX = cellX;
    this.cellY = cellY;
    this.puzzle = puzzle;

    this.generateMask();

    this.sprite = new PIXI.Sprite(puzzle.texture);
    //this.sprite.x -= cellX * puzzle.pieceWidth;
    //this.sprite.y -= cellY * puzzle.pieceHeight;

    this.sprite.anchor.x = (cellX * puzzle.pieceWidth) / puzzle.width;
    this.sprite.anchor.y = (cellY * puzzle.pieceHeight) / puzzle.height;

    this.sprite.mask = this.mask;
    this.sprite.addChild(this.mask);

    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public setPosition(x: number, y: number): void {
    this.sprite.position.set(x, y);
  }

  private generateMask(): void {
    const pw = this.puzzle.pieceWidth;
    const ph = this.puzzle.pieceHeight;

    this.mask = new PIXI.Graphics();
    this.mask.beginFill(0xFFFFFF, 1);

    this.mask.moveTo(0, 0);
    let style = SawStyles[this.puzzle.getSawStyle(this.cellX, this.cellY, 1)];
    // Top
    if (this.cellY != 0) {
      for (let point of style) {
        this.mask.lineTo(pw*point[0], point[1]*ph);
      }
    }
    this.mask.lineTo(pw, 0);

    // Right
    style = SawStyles[this.puzzle.getSawStyle(this.cellX + 1, this.cellY, 0)];
    if (this.cellX != this.puzzle.tilesH - 1) {
      for (let point of style) {
        this.mask.lineTo(pw+point[1]*pw, ph*point[0]);
      }
    }
    this.mask.lineTo(pw, ph);

    // Bottom
    style = SawStyles[this.puzzle.getSawStyle(this.cellX, this.cellY + 1, 1)];
    if (this.cellY != this.puzzle.tilesV - 1) {
      for (let i = style.length - 1; i > 0; i--) {
        let point = style[i];
        this.mask.lineTo(point[0]*pw, ph+ph*point[1]);
      }
    }
    this.mask.lineTo(0, ph);

    // Left
    style = SawStyles[this.puzzle.getSawStyle(this.cellX, this.cellY, 0)];
    if (this.cellX != 0) {
      for (let i = style.length - 1; i > 0; i--) {
        let point = style[i];
        this.mask.lineTo(point[1]*pw, ph*point[0]);
      }
    }
    this.mask.lineTo(0, 0);

    //this.mask.drawRect(cellX * puzzle.pieceWidth, cellY * puzzle.pieceHeight, puzzle.pieceWidth, puzzle.pieceHeight);
    //this.mask.drawRect(0, 0, this.puzzle.pieceWidth, this.puzzle.pieceHeight);
    this.mask.endFill();
  }

}