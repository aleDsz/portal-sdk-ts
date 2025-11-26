import { Event } from "../event";
import { GameObject } from "../game_object";
import { Objective } from "./objective";

export class HQ extends Objective {
  protected _native: mod.HQ;

  private constructor(native: mod.HQ) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): HQ | null {
    return GameObject.spawnObject<HQ>(
      mod.RuntimeSpawn_Common.HQ_PlayerSpawner,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.HQ): HQ {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as HQ;
    }

    return new HQ(native);
  }

  public get native(): mod.HQ {
    return this._native;
  }

  public set team(team: mod.Team) {
    mod.SetHQTeam(this._native, team);
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
