import { GameObject } from "../game_object";
import { ObjectivePoint } from "../types";

export abstract class Objective extends GameObject {
  protected constructor(native: mod.Object) {
    super(native);
  }

  public set isEnabled(value: boolean) {
    mod.EnableGameModeObjective(this.native as ObjectivePoint, value);
  }
}
