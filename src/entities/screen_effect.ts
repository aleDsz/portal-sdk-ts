import { GameObject } from "../game_object";

export class ScreenEffect extends GameObject {
  protected _native: mod.ScreenEffect;

  private constructor(native: mod.ScreenEffect) {
    super(native);
    this._native = native;
  }

  public static fromNative(native: mod.ScreenEffect): ScreenEffect {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as ScreenEffect;
    }

    return new ScreenEffect(native);
  }

  public get native(): mod.ScreenEffect {
    return this._native;
  }
}
