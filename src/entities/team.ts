import { Event } from "../event";
import { GameObject } from "../game_object";
import { Player } from "./player";
import { Squad } from "./squad";
import { Scoreboard } from "../scoreboard";

export class Team extends GameObject {
  protected declare _native: mod.Team;

  private constructor(native: mod.Team) {
    super(native);
  }

  public static fromNative(native: mod.Team): Team {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as Team;
    }

    return new Team(native);
  }

  public get native(): mod.Team {
    return this._native;
  }

  public get players(): Player[] {
    const allPlayers = mod.AllPlayers();
    const count = mod.CountOf(allPlayers);
    const players: Player[] = [];

    for (let i = 0; i < count; i++) {
      const player = mod.ValueInArray(allPlayers, i) as mod.Player;

      if (mod.GetTeam(player) === this.native) {
        players.push(Player.fromNative(player));
      }
    }

    return players;
  }

  public setGameScore(score: number): void {
    Scoreboard.setGameScore(this, score);
  }

  public isFaction(faction: mod.Factions): boolean {
    return mod.IsFaction(this._native, faction);
  }

  public getSquad(id: number): Squad | null {
    const squad = mod.GetSquad(this.id, id);
    return Squad.fromNative(squad);
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onPlayerSwitchIn = new Event<(player: Player) => Promise<void>>();
}
