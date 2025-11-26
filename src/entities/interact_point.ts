import { Event } from "../event";
import { GameObject } from "../game_object";
import { Player } from "./player";

export class InteractPoint extends GameObject {
  protected declare _native: mod.InteractPoint;

  private constructor(native: mod.InteractPoint) {
    super(native);
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): InteractPoint | null {
    return GameObject.spawnObject<InteractPoint>(
      mod.RuntimeSpawn_Common.InteractPoint,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.InteractPoint): InteractPoint {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as InteractPoint;
    }

    return new InteractPoint(native);
  }

  public get native(): mod.InteractPoint {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onPlayerInteract = new Event<(player: Player) => Promise<void>>();
}
