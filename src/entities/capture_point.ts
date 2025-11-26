import { Event } from "../event";
import { GameObject } from "../game_object";
import { Objective } from "./objective";
import { Player } from "./player";

export class CapturePoint extends Objective {
  protected _native: mod.CapturePoint;

  private constructor(native: mod.CapturePoint) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): CapturePoint | null {
    return GameObject.spawnObject<CapturePoint>(
      mod.RuntimeSpawn_Common.CapturePoint,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.CapturePoint): CapturePoint {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as CapturePoint;
    }

    return new CapturePoint(native);
  }

  public get native(): mod.CapturePoint {
    return this._native;
  }

  public get captureProgress(): number {
    return mod.GetCaptureProgress(this._native);
  }

  public get owner(): mod.Team {
    return mod.GetCurrentOwnerTeam(this._native);
  }

  public set owner(team: mod.Team) {
    mod.SetCapturePointOwner(this._native, team);
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onCaptured = new Event<() => Promise<void>>();
  public onCapturing = new Event<() => Promise<void>>();
  public onLost = new Event<() => Promise<void>>();
  public onPlayerEnter = new Event<(player: Player) => Promise<void>>();
  public onPlayerExit = new Event<(player: Player) => Promise<void>>();
}
