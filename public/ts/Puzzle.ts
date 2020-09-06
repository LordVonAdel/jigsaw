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
  private container: PIXI.Container;
  
  public height: number;
  public width: number;
  public texture: PIXI.Texture;

  constructor(world: World) {
    this.chunks = [];
    this.pieces = [];
    this.world = world;

    this.container = new PIXI.Container();
    this.world.viewport.addChild(this.container);
  }

  public import(details: msgPuzzleDetails): void {
    console.log("Importing puzzle: ", details);

    this.tilesH = details.tilesH;
    this.tilesV = details.tilesV;
    this.width = details.width;
    this.height = details.height;

    this.texture = PIXI.Texture.from(details.texture);
    this.pieces.length = 0;

    for (let p of details.pieces) {
      let piece = new Piece(this, p.id, p.cellX, p.cellY);
      this.pieces.push(piece);
    }

    for (let c of details.chunks) {
      let chunk = new Chunk(c.id, this.world.game);
      this.chunks.push(chunk);
      chunk.setPosition(c.x, c.y);

      for (let piece of c.pieces) {
        chunk.addPiece(this.pieces[piece.id]);
      }

      this.container.addChild(chunk);
    }

    this.world.setWorldSize(this.width * 2, this.height * 2);
  }

  private getChunkById(id: number): Chunk {
    for (let c of this.chunks) {
      if (c.id == id) return c;
    }
    return null;
  }

  public setChunkPosition(id: number, x: number, y: number) {
    let chunk = this.getChunkById(id);
    if (!chunk) return false;

    chunk.setPosition(x, y);
  }

  public get pieceWidth(): number {
    return this.width / this.tilesH;
  }

  public get pieceHeight(): number {
    return this.height / this.tilesV;
  }

}