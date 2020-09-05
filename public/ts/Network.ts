import 'socket.io-client';
import Game from './Game';
import PlayerProfile from './PlayerProfile';

type msgPlayerPosition = {
  playerId: number,
  x: number,
  y: number
}

type msgPlayerId = {
  playerId: number
}

type msgChunk = {
  x: number,
  y: number,
  pieces: msgPiece[]
}

type msgPiece = {
  x: number,
  y: number,
  id: number,
  cellX: number,
  cellY: number
}

export type msgPuzzleDetails = {
  tilesV: number,
  tilesH: number,
  width: number,
  height: number,
  texture: string,
  chunks: msgChunk[]
}

export default class Network {

  private socket: SocketIOClient.Socket;
  private game: Game;

  constructor(game: Game) {
    this.game = game;

    this.socket = io();
    this.socket.on("player:move", (data: msgPlayerPosition) => {
      this.game.getPlayerById(data.playerId)?.setPosition(data.x, data.y);
    });

    this.socket.on("player:joined", (data: msgPlayerId) => {
      console.log("Player joined the game!");
      let player = new PlayerProfile(data.playerId);
      this.game.addPlayer(player);
    });

    this.socket.on("player:left", (data: msgPlayerId) => {
      let player = this.game.getPlayerById(data.playerId);
      this.game.removePlayer(player);
    });

    this.socket.on("puzzle:details", (data: msgPuzzleDetails) => {
      this.game.world.puzzle.import(data);
    });
  }

  public sendMousePosition(x: number, y: number): void {
    this.socket.emit("move", {x, y});
  }

}