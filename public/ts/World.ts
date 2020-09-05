import Chunk from './Chunk';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import PlayerProfile from './PlayerProfile';
import Game from './Game';
import Puzzle from './Puzzle';

export default class World {
  
  private texture: PIXI.Texture;
  private worldWidth: number;
  private worldHeight: number;
  private background: PIXI.TilingSprite;
  private outline: PIXI.Graphics;
  private app: PIXI.Application;
  private game: Game;
  
  public viewport: Viewport;
  public puzzle: Puzzle;

  constructor(game: Game) {
    this.game = game;

    this.puzzle = new Puzzle(this);

    this.app = new PIXI.Application();
    document.body.appendChild(this.app.view);

    window.addEventListener("resize", () => {
      this.onWindowResize();
    });

    document.addEventListener("mousemove", (e) => {
      let point = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.viewport) as PIXI.Point;
      this.game.network.sendMousePosition(point.x, point.y);
    });

    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,

      interaction: this.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    });

    this.app.stage.addChild(this.viewport);
    this.viewport.drag().wheel();

    this.background = new PIXI.TilingSprite(
      PIXI.Texture.from("./img/background.jpg"),
      2048,
      2048
    );
    this.viewport.addChild(this.background);

    this.outline = new PIXI.Graphics();
    this.viewport.addChild(this.outline);

    this.setWorldSize(1920, 1080);
    this.onWindowResize();
  }

  public setWorldSize(width: number, height: number): void {
    this.worldWidth = width;
    this.worldHeight = height;

    this.viewport.worldWidth = width;
    this.viewport.worldHeight = height;

    this.background.width = width * 2;
    this.background.height = height * 2;
    this.background.x = -width / 2;
    this.background.y = -height / 2;

    this.outline.clear();
    this.outline.lineStyle(2, 0xFF0000);
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