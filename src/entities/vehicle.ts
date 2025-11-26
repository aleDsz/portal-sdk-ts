import { Event } from "../event";
import { GameObject } from "../game_object";
import { Player } from "./player";

export class Vehicle extends GameObject {
  protected _native: mod.Vehicle;

  protected constructor(native: mod.Vehicle) {
    super(native);
    this._native = native;
  }

  public static fromNative(native: mod.Vehicle): Vehicle {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as Vehicle;
    }

    return new Vehicle(native);
  }

  public get native(): mod.Vehicle {
    return this._native;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onPlayerEnterVehicle = new Event<(player: Player) => Promise<void>>();
  public onPlayerExitVehicle = new Event<(player: Player) => Promise<void>>();
  public onVehicleDestroyed = new Event<() => Promise<void>>();
  public onEnterVehicleSeat = new Event<(player: Player, seat: number) => Promise<void>>();
  public onExitVehicleSeat = new Event<(player: Player, seat: number) => Promise<void>>();
}
