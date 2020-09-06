import Piece from "./Piece";
import Draggable from "./Draggable";
import Game from "./Game";

export default class Chunk extends Draggable {
  
  private _id: number;
  private pieces: Piece[] = [];
  private game: Game;

  constructor(id: number, game: Game) {
    super();

    this._id = id;
    this.game = game;

    this.on("dragstart", () => {
      this.alpha = 0.5;
      this.moveToTop();
    });
    this.on("dragend", () => {
      this.alpha = 1;
      this.game.network.sendMoveChunk(this._id, this.position.x, this.position.y);
    });
    this.on("dragged", () => {
    });
  }

  public addPiece(piece: Piece): void {
    this.pieces.push(piece);
    this.addChild(piece.sprite);
  }

  public setPosition(x: number, y: number): void {
    if (this.isDragged) return;
    this.position.x = x;
    this.position.y = y;
    this.moveToTop();
  }

  private moveToTop(): void {
    if (!this.parent) return;
    this.parent.setChildIndex(this, this.parent.children.length - 1);
  }

  public get id(): number {
    return this._id;
  }
}