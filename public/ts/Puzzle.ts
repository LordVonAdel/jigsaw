import Chunk from "./Chunk";
import { msgPuzzleDetails, msgChunk } from "./Network";
import Piece from "./Piece";
import World from "./World";

export default class Puzzle {
  private chunks: Chunk[];
  private pieces: Piece[];
  private world: World;
  private container: PIXI.Container;
  private sawStyles: number[];
  
  public tilesH: number = 1;
  public tilesV: number = 1;
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
    this.clear();

    console.log("Importing puzzle: ", details);

    this.tilesH = details.tilesH;
    this.tilesV = details.tilesV;
    this.width = details.width;
    this.height = details.height;

    this.sawStyles = details.sawStyles;

    this.texture = PIXI.Texture.from(details.texture);
    this.pieces.length = 0;

    for (let p of details.pieces) {
      let piece = new Piece(this, p.id, p.cellX, p.cellY);
      piece.setPosition(p.x, p.y);
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

  private getPieceById(id: number): Piece {
    for (let p of this.pieces) {
      if (p.id == id) return p;
    }
    return null;
  }

  public setChunkPosition(id: number, x: number, y: number): void {
    let chunk = this.getChunkById(id);
    if (!chunk) return;

    chunk.setPosition(x, y);
  }

  public updateChunk(data: msgChunk): void {
    let chunk = this.getChunkById(data.id);
    if (!chunk) return; 

    chunk.setPosition(data.x, data.y);
    for (let p of data.pieces) {
      let piece = this.getPieceById(p.id);
      piece.setPosition(p.x, p.y);
      chunk.addPiece(piece);
    }
  }

  public get pieceWidth(): number {
    return this.width / this.tilesH;
  }

  public get pieceHeight(): number {
    return this.height / this.tilesV;
  }

  public getSawStyle(x: number, y: number, vertical: number): number {
    return this.sawStyles[x + this.tilesH * y + vertical * this.tilesH * this.tilesV];
  }

  private clear() {
    this.container.removeChildren();
    this.pieces.length = 0;
    this.chunks.length = 0;
  }

}