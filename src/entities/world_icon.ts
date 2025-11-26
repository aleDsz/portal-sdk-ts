import { Event } from "../event";
import { GameObject } from "../game_object";

export class WorldIcon extends GameObject {
  protected _native: mod.WorldIcon;

  private constructor(native: mod.WorldIcon) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): WorldIcon | null {
    return GameObject.spawnObject<WorldIcon>(
      mod.RuntimeSpawn_Common.WorldIcon,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.WorldIcon): WorldIcon {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as WorldIcon;
    }

    return new WorldIcon(native);
  }

  public get native(): mod.WorldIcon {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
