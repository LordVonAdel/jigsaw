export default class Draggable extends PIXI.Container {

  public isDragged: boolean;
  private eventData?: PIXI.InteractionData;

  constructor() {
    super();

    this.interactive = true;
    this.isDragged = false;

    // Drag logic
    this.on('mousedown', (e: PIXI.InteractionEvent) => this.onDragStart(e));
    this.on('touchstart', (e: PIXI.InteractionEvent) => this.onDragStart(e));
    this.on('mouseup', (e: PIXI.InteractionEvent) => this.onDragEnd());
    this.on('mouseupoutside', (e: PIXI.InteractionEvent) => this.onDragEnd());
    this.on('touchend', (e: PIXI.InteractionEvent) => this.onDragEnd());
    this.on('touchendoutside', (e: PIXI.InteractionEvent) => this.onDragEnd());
    this.on('mousemove', (e: PIXI.InteractionEvent) => this.onDragMove(e));
    this.on('touchmove', (e: PIXI.InteractionEvent) => this.onDragMove(e));
  }

  private onDragStart(event: PIXI.InteractionEvent): void {
    this.eventData = event.data;
    this.isDragged = true;

    event.stopPropagation();
    this.emit("dragstart");
  }

  private onDragEnd(): void {
    this.isDragged = false;
    this.eventData = null;

    this.emit("dragend");
  }

  private onDragMove(e: PIXI.InteractionEvent): void {  
    if (this.isDragged) {
      //let newPosition = this.eventData.getLocalPosition(this.parent);
      this.position.x += (e.data.originalEvent as MouseEvent).movementX;
      this.position.y += (e.data.originalEvent as MouseEvent).movementY;
    }
    this.emit("dragged");
  }

}