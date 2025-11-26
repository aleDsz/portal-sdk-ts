import { GameObject } from "../game_object";

export class VFX extends GameObject {
  protected declare _native: mod.VFX;

  protected constructor(native: mod.VFX) {
    super(native);
  }

  public static fromNative(native: mod.VFX): VFX {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as VFX;
    }

    return new VFX(native);
  }

  public get native(): mod.VFX {
    return this._native;
  }

  public static getById(id: number): VFX | null {
    const native = mod.GetVFX(id);

    if (native) {
      return VFX.fromNative(native);
    }

    if (GameObject.hasInstance(id)) {
      GameObject.removeInstance(id);
    }

    return null;
  }

  public set enabled(value: boolean) {
    mod.EnableVFX(this.native, value);
  }

  public set color(color: mod.Vector) {
    mod.SetVFXColor(this.native, color);
  }

  public set speed(speed: number) {
    mod.SetVFXSpeed(this.native, speed);
  }

  public set scale(scale: number) {
    mod.SetVFXScale(this.native, scale);
  }
}
