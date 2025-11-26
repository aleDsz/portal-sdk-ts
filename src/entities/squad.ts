import { Player } from "./player";
import { Team } from "./team";

export class Squad {
  protected _native: mod.Squad;
  protected static squadInstanceMap = new Map<number, Squad>();

  private constructor(native: mod.Squad) {
    this._native = native;
  }

  public static fromNative(native: mod.Squad): Squad {
    // The API does not provide a direct way to get a unique ID for a squad as it isn't part of mod.Object type.
    // We'll use the object ID of the first player in the squad as a proxy for the squad's identity.
    // This is a workaround and might not be perfectly stable if squad compositions change rapidly.
    const allPlayers = mod.AllPlayers();
    const count = mod.CountOf(allPlayers);
    let representativeId = -1;

    for (let i = 0; i < count; i++) {
      const player = mod.ValueInArray(allPlayers, i) as mod.Player;

      if (mod.GetSquad(player) === native) {
        representativeId = mod.GetObjId(player);
        break;
      }
    }

    if (representativeId !== -1 && Squad.squadInstanceMap.has(representativeId)) {
      return Squad.squadInstanceMap.get(representativeId)!;
    }

    const newSquad = new Squad(native);

    if (representativeId !== -1) {
      Squad.squadInstanceMap.set(representativeId, newSquad);
    }

    return newSquad;
  }

  public get native(): mod.Squad {
    return this._native;
  }

  /*
  public get id(): number {
      return mod.GetObjId(this._native);
  }
  */

  public get team(): Team | null {
    const allPlayers = mod.AllPlayers();
    const count = mod.CountOf(allPlayers);

    for (let i = 0; i < count; i++) {
      const player = mod.ValueInArray(allPlayers, i) as mod.Player;

      if (mod.GetSquad(player) === this.native) {
        return Team.fromNative(mod.GetTeam(player));
      }
    }

    return null;
  }

  public get players(): Player[] {
    const allPlayers = mod.AllPlayers();
    const count = mod.CountOf(allPlayers);
    const players: Player[] = [];

    for (let i = 0; i < count; i++) {
      const player = mod.ValueInArray(allPlayers, i) as mod.Player;

      if (mod.GetSquad(player) === this.native) {
        players.push(Player.fromNative(player));
      }
    }

    return players;
  }
}
