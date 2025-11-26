import { Event } from "../event";
import { GameObject } from "../game_object";

export class SpawnPoint extends GameObject {
  protected _native: mod.SpawnPoint;

  private constructor(native: mod.SpawnPoint) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): SpawnPoint | null {
    return GameObject.spawnObject<SpawnPoint>(
      mod.RuntimeSpawn_Common.PlayerSpawner,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.SpawnPoint): SpawnPoint {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as SpawnPoint;
    }

    return new SpawnPoint(native);
  }

  public get native(): mod.SpawnPoint {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
