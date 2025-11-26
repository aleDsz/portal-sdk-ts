import { Event } from "../event";
import { GameObject } from "../game_object";
import { AIPlayer } from "./ai_player";

export class Spawner extends GameObject {
  protected _native: mod.Spawner;

  private constructor(native: mod.Spawner) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): Spawner | null {
    return GameObject.spawnObject<Spawner>(
      mod.RuntimeSpawn_Common.AI_Spawner,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.Spawner): Spawner {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as Spawner;
    }

    return new Spawner(native);
  }

  public get native(): mod.Spawner {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onSpawned = new Event<(player: AIPlayer) => Promise<void>>();
}
