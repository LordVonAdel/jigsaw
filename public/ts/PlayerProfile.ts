export default class PlayerProfile {

  public id: number;
  public cursorSprite: PIXI.Sprite;

  private _name: string;
  private color: number;

  constructor(id: number) {
    this.id = id;

    this._name = "Unnamed";
    this.color = 0xFFDAFF;

    this.cursorSprite = PIXI.Sprite.from("./img/cursor.png");
    this.cursorSprite.interactive = false;
  }

  public get name(): string {
    return this._name;
  }

  public setPosition(x: number, y: number): void {
    this.cursorSprite.position.x = x - 12;
    this.cursorSprite.position.y = y - 12;
  }

  public setColor(color: number): void {
    this.color = color;
    this.cursorSprite.tint = color;
  }

  public dispose(): void {
    this.cursorSprite.parent.removeChild(this.cursorSprite);
  }

}