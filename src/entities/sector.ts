import { Event } from "../event";
import { GameObject } from "../game_object";
import { Objective } from "./objective";

export class Sector extends Objective {
  protected _native: mod.Sector;

  private constructor(native: mod.Sector) {
    super(native);
    this._native = native;
  }


  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): Sector | null {
    return GameObject.spawnObject<Sector>(
      mod.RuntimeSpawn_Common.Sector,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.Sector): Sector {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as Sector;
    }

    return new Sector(native);
  }

  public get native(): mod.Sector {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
