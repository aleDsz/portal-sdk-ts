import { Event } from "../event";
import { GameObject } from "../game_object";

export class WaypointPath extends GameObject {
  protected declare _native: mod.WaypointPath;

  private constructor(native: mod.WaypointPath) {
    super(native);
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): WaypointPath | null {
    return GameObject.spawnObject<WaypointPath>(
      mod.RuntimeSpawn_Common.AI_WaypointPath,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.WaypointPath): WaypointPath {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as WaypointPath;
    }

    return new WaypointPath(native);
  }

  public get native(): mod.WaypointPath {
    return this._native;
  }

  public static getById(id: number): WaypointPath | null {
    const native = mod.GetWaypointPath(id);

    if (native) {
      return WaypointPath.fromNative(native);
    }

    if (GameObject.hasInstance(id)) {
      GameObject.removeInstance(id);
    }

    return null;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
