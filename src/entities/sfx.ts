import { GameObject } from "../game_object";

export class SFX extends GameObject {
  protected declare _native: mod.SFX;

  protected constructor(native: mod.SFX) {
    super(native);
  }

  public static fromNative(native: mod.SFX): SFX {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as SFX;
    }

    return new SFX(native);
  }

  public get native(): mod.SFX {
    return this._native;
  }
}
