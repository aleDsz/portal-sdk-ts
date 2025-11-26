import { Event } from "../event";
import { GameObject } from "../game_object";
import { Objective } from "./objective";

export class MCOM extends Objective {
  protected _native: mod.MCOM;

  private constructor(native: mod.MCOM) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): MCOM | null {
    return GameObject.spawnObject<MCOM>(
      mod.RuntimeSpawn_Common.MCOM,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.MCOM): MCOM {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as MCOM;
    }

    return new MCOM(native);
  }

  public get native(): mod.MCOM {
    return this._native;
  }

  public set fuseTime(time: number) {
    mod.SetMCOMFuseTime(this._native, time);
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onArmed = new Event<() => Promise<void>>();
  public onDefused = new Event<() => Promise<void>>();
  public onDestroyed = new Event<() => Promise<void>>();
}
