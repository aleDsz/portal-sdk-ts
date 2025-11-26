import { Event } from "../event";
import { GameObject } from "../game_object";

export class VehicleSpawner extends GameObject {
  protected _native: mod.VehicleSpawner;

  private constructor(native: mod.VehicleSpawner) {
    super(native);
    this._native = native;
  }

  public static create(
    position: mod.Vector,
    rotation: mod.Vector = mod.CreateVector(0, 0, 0),
    scale: mod.Vector = mod.CreateVector(1, 1, 1)
  ): VehicleSpawner | null {
    return GameObject.spawnObject<VehicleSpawner>(
      mod.RuntimeSpawn_Common.AI_Spawner,
      position,
      rotation,
      scale
    );
  }

  public static fromNative(native: mod.VehicleSpawner): VehicleSpawner {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as VehicleSpawner;
    }

    return new VehicleSpawner(native);
  }

  public get native(): mod.VehicleSpawner {
    return this._native;
  }

  public forceSpawn(): void {
    mod.ForceVehicleSpawnerSpawn(this._native);
  }

  public set autoSpawn(enabled: boolean) {
    mod.SetVehicleSpawnerAutoSpawn(this._native, enabled);
  }

  public set respawnTime(time: number) {
    mod.SetVehicleSpawnerRespawnTime(this._native, time);
  }

  public set vehicleType(vehicle: mod.VehicleList) {
    mod.SetVehicleSpawnerVehicleType(this._native, vehicle);
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
}
