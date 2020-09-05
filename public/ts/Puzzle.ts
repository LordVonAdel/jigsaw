import Chunk from "./Chunk";
import { msgPuzzleDetails } from "./Network";
import Piece from "./Piece";
import World from "./World";

export default class Puzzle {

  private chunks: Chunk[];
  private tilesH: number = 1;
  private tilesV: number = 1;
  private pieces: Piece[];
  private world: World;
  
  public height: number;
  public width: number;
  public texture: PIXI.Texture;

  constructor(world: World) {
    this.chunks = [];
    this.pieces = [];
    this.world = world;
  }

  public import(details: msgPuzzleDetails): void {
    console.log("Importing puzzle: ", details);

    this.tilesH = details.tilesH;
    this.tilesV = details.tilesV;
    this.width = details.width;
    this.height = details.height;

    this.texture = PIXI.Texture.from(details.texture);
    this.pieces.length = 0;

    for (let y = 0; y < this.tilesV; y++) {
      for (let x = 0; x < this.tilesH; x++) {
        let piece = new Piece(this, y * this.tilesH + x, x, y);
        this.pieces.push(piece);
      }
    }

    for (let c of details.chunks) {
      let chunk = new Chunk();
      chunk.setPosition(c.x, c.y);

      for (let piece of c.pieces) {
        chunk.addPiece(this.pieces[piece.id]);
      }

      this.world.viewport.addChild(chunk.pixi);
    }

    this.world.setWorldSize(this.width * 2, this.height * 2);

  }

  public get pieceWidth(): number {
    return this.width / this.tilesH;
  }

  public get pieceHeight(): number {
    return this.height / this.tilesV;
  }

}