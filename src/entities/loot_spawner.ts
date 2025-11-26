import { Event } from "../event";
import { GameObject } from "../game_object";

export class LootSpawner extends GameObject {
  protected declare _native: mod.LootSpawner;

  private constructor(native: mod.LootSpawner) {
    super(native);
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): LootSpawner | null {
    return GameObject.spawnObject<LootSpawner>(
      mod.RuntimeSpawn_Common.AI_Spawner,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.LootSpawner): LootSpawner {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as LootSpawner;
    }

    return new LootSpawner(native);
  }

  public get native(): mod.LootSpawner {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
