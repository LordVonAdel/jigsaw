import Network from './Network';
import World from './World';
import PlayerProfile from './PlayerProfile';

export default class Game {
  
  public network: Network;
  public world: World;

  private players: PlayerProfile[];

  constructor() {
    this.world = new World(this);
    this.network = new Network(this);
    this.players = [];
  }

  public addPlayer(player: PlayerProfile): void {
    this.world.addPlayer(player);
    this.players.push(player);
  }

  public removePlayer(player: PlayerProfile): void {
    player.dispose();
    let index = this.players.indexOf(player);
    if (index >= 0) this.players.splice(index, 1);
  }

  public getPlayerById(id: number): PlayerProfile {
    for (let player of this.players) {
      if (player.id == id) return player;
    }
    return null;
  }

}