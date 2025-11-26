import { GameObject } from "../game_object";

export class SpatialObject extends GameObject {
  protected _native: mod.SpatialObject;

  private constructor(native: mod.SpatialObject) {
    super(native);
    this._native = native;
  }

  public static fromNative(native: mod.SpatialObject): SpatialObject {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as SpatialObject;
    }

    return new SpatialObject(native);
  }

  public get native(): mod.SpatialObject {
    return this._native;
  }
}
