import { Event } from "../event";
import { GameObject } from "../game_object";

export class EmplacementSpawner extends GameObject {
  protected _native: mod.EmplacementSpawner;

  private constructor(native: mod.EmplacementSpawner) {
    super(native);
    this._native = native;
  }

  public static fromNative(native: mod.EmplacementSpawner): EmplacementSpawner {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as EmplacementSpawner;
    }

    return new EmplacementSpawner(native);
  }

  public get native(): mod.EmplacementSpawner {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
