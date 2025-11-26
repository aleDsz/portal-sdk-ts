import { Event } from "../event";
import { GameObject } from "../game_object";
import { Player } from "./player";

export class AreaTrigger extends GameObject {
  protected declare _native: mod.AreaTrigger;

  private constructor(native: mod.AreaTrigger) {
    super(native);
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): AreaTrigger | null {
    return GameObject.spawnObject<AreaTrigger>(
      mod.RuntimeSpawn_Common.AreaTrigger,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.AreaTrigger): AreaTrigger {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as AreaTrigger;
    }

    return new AreaTrigger(native);
  }

  public get native(): mod.AreaTrigger {
    return this._native;
  }

  public static getById(id: number): AreaTrigger | null {
    const native = mod.GetAreaTrigger(id);

    if (native) {
      return AreaTrigger.fromNative(native);
    }

    if (GameObject.hasInstance(id)) {
      GameObject.removeInstance(id);
    }

    return null;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onPlayerEnter = new Event<(player: Player) => Promise<void>>();
  public onPlayerExit = new Event<(player: Player) => Promise<void>>();
}
