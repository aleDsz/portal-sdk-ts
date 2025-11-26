import { Event } from "../event";
import { GameObject } from "../game_object";

export class RingOfFire extends GameObject {
  protected _native: mod.RingOfFire;

  private constructor(native: mod.RingOfFire) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): RingOfFire | null {
    return GameObject.spawnObject<RingOfFire>(
      mod.RuntimeSpawn_Common.RingOfFire,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.RingOfFire): RingOfFire {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as RingOfFire;
    }

    return new RingOfFire(native);
  }

  public get native(): mod.RingOfFire {
    return this._native;
  }

  public static getById(id: number): RingOfFire | null {
    const native = mod.GetRingOfFire(id);

    if (native) {
      return RingOfFire.fromNative(native);
    }

    if (GameObject.hasInstance(id)) {
      GameObject.removeInstance(id);
    }

    return null;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onZoneSizeChanged = new Event<(eventNumber: number) => Promise<void>>();
}
