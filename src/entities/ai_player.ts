import { AIPersonality } from "../ai/personality";
import { Event } from "../event";
import { Player } from "./player";
import { WaypointPath } from "./waypoint_path";

export class AIPlayer extends Player {
  constructor(native: mod.Player) {
    super(native);
  }

  public setBehavior(behavior: 'battlefield' | 'idle' | 'parachute'): void {
    if (behavior === 'battlefield') mod.AIBattlefieldBehavior(this.native);
    else if (behavior === 'idle') mod.AIIdleBehavior(this.native);
    else if (behavior === 'parachute') mod.AIParachuteBehavior(this.native);
  }

  public moveTo(position: mod.Vector, isLOS: boolean = false): void {
    if (isLOS) {
      mod.AILOSMoveToBehavior(this.native, position);
    } else {
      mod.AIMoveToBehavior(this.native, position);
    }
  }

  // AI specific events
  public onAIMoveToFailed = new Event<() => Promise<void>>();
  public onAIMoveToRunning = new Event<() => Promise<void>>();
  public onAIMoveToSucceeded = new Event<() => Promise<void>>();
  public onAIParachuteRunning = new Event<() => Promise<void>>();
  public onAIParachuteSucceeded = new Event<() => Promise<void>>();
  public onAIWaypointIdleFailed = new Event<() => Promise<void>>();
  public onAIWaypointIdleRunning = new Event<() => Promise<void>>();
  public onAIWaypointIdleSucceeded = new Event<() => Promise<void>>();

  public personality: AIPersonality | null = null;

  private _currentPath: mod.Vector[] | null = null;
  private _currentWaypointIndex: number = 0;

  /**
   * Instructs the AI to follow a dynamic path of waypoints.
   *
   * The AI will move to each waypoint in sequence, looping when the end is reached.
   *
   * @param path An array of Vector positions or WaypointPath objects to follow.
   * @param startIndex The index of the waypoint to start from.
   */
  public followPath(path: (mod.Vector | WaypointPath)[], startIndex: number = 0): void {
    if (path.length > 0 && path[0] instanceof WaypointPath) {
      this._currentPath = (path as WaypointPath[]).map(wp => wp.position);
    } else {
      this._currentPath = path as mod.Vector[];
    }

    this._currentWaypointIndex = startIndex;

    if (this._currentPath && this._currentPath.length > 0) {
      const targetWaypoint = this._currentPath[this._currentWaypointIndex];
      if (targetWaypoint) {
        this.moveTo(targetWaypoint);
      }
    }
  }

  /**
   * Stops the AI from following its current path.
   */
  public stopFollowingPath(): void {
    this._currentPath = null;
    this._currentWaypointIndex = 0;
    this.setBehavior('idle'); // Or another default behavior
  }

  /** @internal */
  public _onMoveToSucceeded(): void {
    if (this._currentPath && this._currentPath.length > 0) {
      this._currentWaypointIndex++;

      // Loop back to the start if we've completed the path
      if (this._currentWaypointIndex >= this._currentPath.length) {
        this._currentWaypointIndex = 0;
      }

      const nextWaypoint = this._currentPath[this._currentWaypointIndex];
      if (nextWaypoint) this.moveTo(nextWaypoint);
    }
  }

  public defendPosition(position: mod.Vector, minDistance: number, maxDistance: number): void {
    mod.AIDefendPositionBehavior(this.native, position, minDistance, maxDistance);
  }

  public validatedMoveTo(position: mod.Vector): void {
    mod.AIValidatedMoveToBehavior(this.native, position);
  }

  public patrolWaypoint(waypointPath: WaypointPath): void {
    mod.AIWaypointIdleBehavior(this.native, waypointPath.native);
  }

  public enableShooting(enable: boolean): void {
    mod.AIEnableShooting(this.native, enable);
  }

  public enableTargeting(enable: boolean): void {
    mod.AIEnableTargeting(this.native, enable);
  }

  public forceFire(duration: number): void {
    mod.AIForceFire(this.native, duration);
  }

  public setFocusPoint(point: mod.Vector, isTarget: boolean): void {
    mod.AISetFocusPoint(this.native, point, isTarget);
  }

  public setMoveSpeed(speed: mod.MoveSpeed): void {
    mod.AISetMoveSpeed(this.native, speed);
  }

  public setStance(stance: mod.Stance): void {
    mod.AISetStance(this.native, stance);
  }

  public setTarget(target: Player | null): void {
    if (target) {
      mod.AISetTarget(this.native, target.native);
    } else {
      mod.AISetTarget(this.native);
    }
  }

  public startUsingGadget(gadget: mod.OpenGadgets, target: mod.Vector | Player): void {
    if (mod.IsType(target, mod.Types.Vector)) {
      mod.AIStartUsingGadget(this.native, gadget, target as mod.Vector);
    } else if (target instanceof Player) {
      mod.AIStartUsingGadget(this.native, gadget, target.native);
    }
  }

  public stopUsingGadget(): void {
    mod.AIStopUsingGadget(this.native);
  }
}
