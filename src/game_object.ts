import { Player } from "./entities/player";
import { Squad } from "./entities/squad";
import { Team } from "./entities/team";
import { SFX } from "./entities/sfx";
import { RuntimeSpawnable } from "./types";
import { Vehicle } from "./entities/vehicle";
import { CapturePoint } from "./entities/capture_point";
import { HQ } from "./entities/hq";
import { Sector } from "./entities/sector";
import { MCOM } from "./entities/mcom";
import { VFX } from "./entities/vfx";
import { SpatialObject } from "./entities/spatial_object";
import { SpawnPoint } from "./entities/spawn_point";
import { AreaTrigger } from "./entities/area_trigger";
import { InteractPoint } from "./entities/interact_point";
import { EmplacementSpawner } from "./entities/emplacement_spawner";
import { LootSpawner } from "./entities/loot_spawner";
import { Spawner } from "./entities/spawner";
import { WorldIcon } from "./entities/world_icon";
import { RingOfFire } from "./entities/ring_of_fire";
import { ScreenEffect } from "./entities/screen_effect";
import { WaypointPath } from "./entities/waypoint_path";
import { VehicleSpawner } from "./entities/vehicle_spawner";

export abstract class GameObject {
  protected _native: mod.Object;
  protected static instanceMap = new Map<number, GameObject>();

  protected constructor(native: mod.Object) {
    this._native = native;
    const id = mod.GetObjId(this._native);

    if (id !== -1 && !GameObject.instanceMap.has(id)) {
      GameObject.instanceMap.set(id, this);
    }
  }

  public static getInstance(id: number): GameObject | undefined {
    return GameObject.instanceMap.get(id);
  }

  public static hasInstance(id: number): boolean {
    return GameObject.instanceMap.has(id);
  }

  public static removeInstance(id: number): void {
    GameObject.instanceMap.delete(id);
  }

  public static fromNative(native: mod.Object): GameObject {
    const id = mod.GetObjId(native);
    if (id !== -1 && GameObject.hasInstance(id)) {
      return GameObject.getInstance(id)!;
    }

    if (mod.IsType(native, mod.Types.Player)) {
      return Player.fromNative(native as mod.Player);
    }
    if (mod.IsType(native, mod.Types.Vehicle)) {
      return Vehicle.fromNative(native as mod.Vehicle);
    }
    if (mod.IsType(native, mod.Types.CapturePoint)) {
      return CapturePoint.fromNative(native as mod.CapturePoint);
    }
    if (mod.IsType(native, mod.Types.HQ)) {
      return HQ.fromNative(native as mod.HQ);
    }
    if (mod.IsType(native, mod.Types.Sector)) {
      return Sector.fromNative(native as mod.Sector);
    }
    if (mod.IsType(native, mod.Types.MCOM)) {
      return MCOM.fromNative(native as mod.MCOM);
    }
    if (mod.IsType(native, mod.Types.VFX)) {
      return VFX.fromNative(native as mod.VFX);
    }
    if (mod.IsType(native, mod.Types.SFX)) {
      return SFX.fromNative(native as mod.SFX);
    }
    if (mod.IsType(native, mod.Types.SpatialObject)) {
      return SpatialObject.fromNative(native as mod.SpatialObject);
    }
    if (mod.IsType(native, mod.Types.SpawnPoint)) {
      return SpawnPoint.fromNative(native as mod.SpawnPoint);
    }
    if (mod.IsType(native, mod.Types.AreaTrigger)) {
      return AreaTrigger.fromNative(native as mod.AreaTrigger);
    }
    if (mod.IsType(native, mod.Types.InteractPoint)) {
      return InteractPoint.fromNative(native as mod.InteractPoint);
    }
    if (mod.IsType(native, mod.Types.EmplacementSpawner)) {
      return EmplacementSpawner.fromNative(native as mod.EmplacementSpawner);
    }
    if (mod.IsType(native, mod.Types.LootSpawner)) {
      return LootSpawner.fromNative(native as mod.LootSpawner);
    }
    if (mod.IsType(native, mod.Types.Spawner)) {
      return Spawner.fromNative(native as mod.Spawner);
    }
    if (mod.IsType(native, mod.Types.WorldIcon)) {
      return WorldIcon.fromNative(native as mod.WorldIcon);
    }
    if (mod.IsType(native, mod.Types.RingOfFire)) {
      return RingOfFire.fromNative(native as mod.RingOfFire);
    }
    if (mod.IsType(native, mod.Types.ScreenEffect)) {
      return ScreenEffect.fromNative(native as mod.ScreenEffect);
    }
    if (mod.IsType(native, mod.Types.WaypointPath)) {
      return WaypointPath.fromNative(native as mod.WaypointPath);
    }
    if (mod.IsType(native, mod.Types.VehicleSpawner)) {
      return VehicleSpawner.fromNative(native as mod.VehicleSpawner);
    }

    // Fallback for unknown types
    throw new Error(`Unknown object type for native object with id ${id}`);
  }

  protected static spawnObject<T extends GameObject>(
    prefab: RuntimeSpawnable,
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): T | null {
    const native = mod.SpawnObject(prefab, position, rotation, scale);
    if (native) {
      const id = mod.GetObjId(native);
      if (id !== -1) {
        return GameObject.fromNative(native) as T;
      }
    }
    return null;
  }

  public get native(): mod.Object {
    return this._native;
  }

  public get id(): number {
    return mod.GetObjId(this._native);
  }

  public get position(): mod.Vector {
    return mod.GetObjectPosition(this._native);
  }

  public set position(vector: mod.Vector) {
    this.moveBy(mod.Subtract(vector, this.position));
  }

  public get rotation(): mod.Vector {
    return mod.GetObjectRotation(this._native);
  }

  public set rotateBy(vector: mod.Vector) {
    this.rotateObject(mod.Subtract(vector, this.rotation));
  }

  public get transform(): mod.Transform {
    return mod.GetObjectTransform(this._native);
  }

  public set transform(transform: mod.Transform) {
    mod.SetObjectTransform(this._native, transform);
  }

  public destroy(): void {
    mod.UnspawnObject(this._native);
    GameObject.removeInstance(this.id);
  }

  /**
   * Moves the object by a relative position and rotation delta over a specified time.
   *
   * @param positionDelta The relative change in position.
   * @param rotationDelta The relative change in rotation (Euler angles).
   * @param time The duration of the movement in seconds.
   * @param shouldLoop Whether the movement should loop.
   * @param shouldReverse Whether the movement should reverse at the end of each loop.
   */
  public moveOverTime(positionDelta: mod.Vector, rotationDelta: mod.Vector, time: number, shouldLoop: boolean = false, shouldReverse: boolean = false): void {
    mod.MoveObjectOverTime(this._native, positionDelta, rotationDelta, time, shouldLoop, shouldReverse);
  }

  /**
   * Orbits the object around a central point.
   *
   * @param orbitCenter The transform of the central point to orbit.
   * @param time The duration of one full orbit in seconds.
   * @param radius The radius of the orbit.
   * @param shouldLoop Whether the orbit should loop.
   * @param shouldReverse Whether the orbit direction should reverse at the end of each loop.
   * @param clockwise Whether the orbit should be clockwise.
   * @param orbitAxis An optional axis for the orbit; defaults to the up vector of the orbitCenter transform.
   */
  public orbitOverTime(orbitCenter: mod.Transform, time: number, radius: number, shouldLoop: boolean = false, shouldReverse: boolean = false, clockwise: boolean = true, orbitAxis?: mod.Vector): void {
    if (orbitAxis) {
      mod.OrbitObjectOverTime(this._native, orbitCenter, time, radius, shouldLoop, shouldReverse, clockwise, orbitAxis);
    } else {
      mod.OrbitObjectOverTime(this._native, orbitCenter, time, radius, shouldLoop, shouldReverse, clockwise);
    }
  }

  /**
   * Instantly moves the object by a relative position and rotation delta.
   *
   * @param positionDelta The relative change in position.
   * @param rotationDelta An optional relative change in rotation (Euler angles).
   */
  public moveBy(positionDelta: mod.Vector, rotationDelta?: mod.Vector): void {
    if (rotationDelta) {
      mod.MoveObject(this._native, positionDelta, rotationDelta);
    } else {
      mod.MoveObject(this._native, positionDelta);
    }
  }

  /**
   * Instantly rotates the object by a relative rotation delta.
   *
   * @param rotationDelta The relative change in rotation (Euler angles).
   */
  public rotateObject(rotationDelta: mod.Vector): void {
    mod.RotateObject(this._native, rotationDelta);
  }

  /**
   * Moves the object to a new transform over a specified time.
   *
   * @param transform The target transform (position and rotation).
   * @param time The duration of the movement in seconds.
   * @param shouldLoop Whether the movement should loop.
   * @param shouldReverse Whether the movement should reverse at the end of each loop.
   */
  public setTransformOverTime(transform: mod.Transform, time: number, shouldLoop: boolean = false, shouldReverse: boolean = false): void {
    mod.SetObjectTransformOverTime(this._native, transform, time, shouldLoop, shouldReverse);
  }

  /**
   * Plays a sound from an SFX object, optionally restricted to a specific audience.
   *
   * @param sound The SFX object to play.
   * @param amplitude The volume of the sound (0.0 to 1.0).
   * @param location The position to play the sound at. Defaults to the object's current position.
   * @param attenuationRange The distance over which the sound attenuates.
   * @param restrictTo An optional player, squad, or team to restrict the sound to.
   */
  public playSound(sound: SFX, amplitude: number = 1.0, location?: mod.Vector, attenuationRange: number = 100, restrictTo?: Player | Squad | Team): void {
    const pos = location ?? this.position;

    if (restrictTo) {
      mod.PlaySound(sound.native, amplitude, pos, attenuationRange, restrictTo.native as any);
    } else {
      mod.PlaySound(sound.native, amplitude, pos, attenuationRange);
    }
  }

  /**
   * Stops the sound from an SFX object, optionally restricted to a specific audience.
   *
   * @param sound The SFX object to play.
   * @param restrictTo An optional player, squad, or team to restrict the sound to.
   */
  public stopSound(sound: SFX, restrictTo?: Player | Squad | Team): void {
    if (restrictTo) {
      mod.StopSound(sound.native, restrictTo.native as any);
    } else {
      mod.StopSound(sound.native);
    }
  }

  /**
   * Plays a voice-over event associated with this object.
   *
   * @param event The voice-over event to play.
   * @param flag A flag to specify variations of the voice-over.
   * @param restrictTo An optional player, squad, or team to restrict the voice-over to.
   */
  public playVoiceOver(event: mod.VoiceOverEvents2D, flag: mod.VoiceOverFlags, restrictTo?: Player | Squad | Team): void {
    if (restrictTo) {
      mod.PlayVO(this.id, event, flag, restrictTo.native as any);
    } else {
      mod.PlayVO(this.id, event, flag);
    }
  }

  public stopMovement(): void {
    mod.StopActiveMovementForObject(this._native);
  }
}
