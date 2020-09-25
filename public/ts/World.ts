import Chunk from './Chunk';
import * as PIXI from 'pixi.js';
import PlayerProfile from './PlayerProfile';
import Game from './Game';
import Puzzle from './Puzzle';
import Draggable from './Draggable';

export default class World {
  
  private texture: PIXI.Texture;
  private worldWidth: number;
  private worldHeight: number;
  private background: PIXI.TilingSprite;
  private outline: PIXI.Graphics;
  private app: PIXI.Application;
  private mousePosition: PIXI.Point;
  
  public game: Game;
  public viewport: PIXI.Container;
  public puzzle: Puzzle;

  constructor(game: Game) {
    this.game = game;

    this.app = new PIXI.Application();
    document.body.appendChild(this.app.view);

    window.addEventListener("resize", () => {
      this.onWindowResize();
    });

    document.addEventListener("mousemove", (e) => {
      this.mousePosition = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.viewport) as PIXI.Point;
      this.game.network.sendMousePosition(this.mousePosition.x, this.mousePosition.y);
    });

    document.addEventListener("wheel", e => {
      if (e.deltaY > 0) { // Zoom in
        this.zoom(this.mousePosition, 0.9);
      } else { // Zoom out
        this.zoom(this.mousePosition, 1.1);
      }
      
    });

    this.viewport = new Draggable();

    this.app.stage.addChild(this.viewport);
    //this.viewport.drag().wheel();

    this.background = new PIXI.TilingSprite(
      PIXI.Texture.from("./img/background.jpg"),
      2048,
      2048
    );
    this.viewport.addChild(this.background);

    this.outline = new PIXI.Graphics();
    this.viewport.addChild(this.outline);

    this.puzzle = new Puzzle(this);

    this.setWorldSize(1920, 1080);
    this.onWindowResize();
  }

  public zoom(origin: PIXI.Point, amount: number) {
    let w = this.viewport.width;
    let h = this.viewport.height;
    this.viewport.scale.x *= amount;
    this.viewport.scale.y *= amount;
    let deltaW = this.viewport.width - w;
    let deltaH = this.viewport.height - h;

    this.viewport.position.x -= deltaW / 2;
    this.viewport.position.y -= deltaH / 2;
  }

  public setWorldSize(width: number, height: number): void {
    this.worldWidth = width;
    this.worldHeight = height;

    this.background.width = width * 2;
    this.background.height = height * 2;
    this.background.x = -width / 2;
    this.background.y = -height / 2;

    this.outline.clear();
    this.outline.lineStyle(2, 0xFFFFFF);
    this.outline.moveTo(0, 0);
    this.outline.lineTo(width, 0);
    this.outline.lineTo(width, height);
    this.outline.lineTo(0, height);
    this.outline.lineTo(0, 0);
    this.outline.endFill();
  }

  private onWindowResize(): void {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  public addPlayer(player: PlayerProfile) {
    this.viewport.addChild(player.cursorSprite);
  }

}