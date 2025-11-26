import { Event } from "../event";
import { GameObject } from "../game_object";
import { InputRestrictions } from "../input_restrictions";
import { InventoryManager } from "../inventory_manager";
import { Scoreboard } from "../scoreboard";
import { AIPlayer } from "./ai_player";
import { AreaTrigger } from "./area_trigger";
import { CapturePoint } from "./capture_point";
import { InteractPoint } from "./interact_point";
import { Squad } from "./squad";
import { Team } from "./team";
import { Vehicle } from "./vehicle";

export class Player extends GameObject {
  protected declare _native: mod.Player;
  public readonly inputRestrictions: InputRestrictions;
  public readonly inventory: InventoryManager;

  protected constructor(native: mod.Player) {
    super(native);

    this.inputRestrictions = new InputRestrictions(this);
    this.inventory = new InventoryManager(this);
  }

  public static fromNative(native: mod.Player): Player {
    const id = mod.GetObjId(native);

    if (GameObject.hasInstance(id)) {
      return GameObject.getInstance(id) as Player;
    }

    const isAI = mod.GetSoldierState(native, mod.SoldierStateBool.IsAISoldier);

    if (isAI) {
      return new AIPlayer(native);
    }

    return new Player(native);
  }

  public get native(): mod.Player {
    return this._native;
  }

  public get isAISoldier(): boolean {
    return mod.GetSoldierState(this._native, mod.SoldierStateBool.IsAISoldier);
  }

  public asAI(): AIPlayer | null {
    if (this.isAISoldier) {
      return this as unknown as AIPlayer;
    }

    return null;
  }

  public get currentHealth(): number {
    return mod.GetSoldierState(this._native, mod.SoldierStateNumber.CurrentHealth);
  }

  public set currentHealth(value: number) {
    if (value > this.currentHealth) {
      this.heal(value - this.currentHealth);
    } else {
      this.damage(this.currentHealth - value);
    }
  }

  public get maxHealth(): number {
    return mod.GetSoldierState(this._native, mod.SoldierStateNumber.MaxHealth);
  }

  public set maxHealth(value: number) {
    mod.SetPlayerMaxHealth(this._native, value);
  }

  public get isAlive(): boolean {
    return mod.GetSoldierState(this._native, mod.SoldierStateBool.IsAlive);
  }

  public kill(): void {
    mod.Kill(this._native);
  }

  public spot(duration: number, spotStatus: mod.SpotStatus, spotter?: Player): void {
    if (spotter) {
      mod.SpotTarget(this.native, spotter.native, duration, spotStatus);
    } else {
      mod.SpotTarget(this.native, duration, spotStatus);
    }
  }

  public teleport(destination: mod.Vector, orientation?: number): void {
    mod.Teleport(this.native, destination, orientation ?? 0);
  }

  public set skipManDown(value: boolean) {
    mod.SkipManDown(this.native, value);
  }

  public forceRevive(): void {
    mod.ForceRevive(this.native);
  }

  public forceManDown(): void {
    mod.ForceManDown(this.native);
  }

  public resupply(type: mod.ResupplyTypes): void {
    mod.Resupply(this.native, type);
  }

  public set movementSpeedMultiplier(value: number) {
    mod.SetPlayerMovementSpeedMultiplier(this.native, value);
  }

  public setTeam(team: Team): void {
    mod.SetTeam(this.native, team.native);
  }

  public deploy(): void {
    mod.DeployPlayer(this.native);
  }

  public undeploy(): void {
    mod.UndeployPlayer(this.native);
  }

  public setDeployAllowed(allowed: boolean): void {
    mod.EnablePlayerDeploy(this.native, allowed);
  }

  public setRedeployTime(time: number): void {
    mod.SetRedeployTime(this.native, time);
  }

  public setScoreboardValues(values: number[]): void {
    Scoreboard.setPlayerValues(this, values);
  }

  public setGameScore(score: number): void {
    Scoreboard.setGameScore(this, score);
  }

  public unspot(spotter?: Player): void {
    if (spotter) {
      mod.SpotTarget(this.native, spotter.native, 0, mod.SpotStatus.Unspot);
    } else {
      mod.SpotTarget(this.native, 0, mod.SpotStatus.Unspot);
    }
  }

  public heal(amount: number): void {
    mod.Heal(this.native, amount);
  }

  public damage(amount: number): void {
    mod.DealDamage(this.native, amount);
  }

  public enableScreenEffect(effect: mod.ScreenEffects, enable: boolean): void {
    mod.EnableScreenEffect(this.native, effect, enable);
  }

  public static getAll(): Player[] {
    const allPlayersNative = mod.AllPlayers();
    const count = mod.CountOf(allPlayersNative);
    const players: Player[] = [];
    for (let i = 0; i < count; i++) {
      const playerNative = mod.ValueInArray(allPlayersNative, i) as mod.Player;
      players.push(Player.fromNative(playerNative));
    }
    return players;
  }

  public static getClosestTo(position: mod.Vector, team?: Team): Player | null {
    const playerNative = team ? mod.ClosestPlayerTo(position, team.native) : mod.ClosestPlayerTo(position);

    if (mod.IsPlayerValid(playerNative)) {
      return Player.fromNative(playerNative);
    }

    return null;
  }

  public static getFarthestFrom(position: mod.Vector, team?: Team): Player | null {
    const playerNative = team ? mod.FarthestPlayerFrom(position, team.native) : mod.FarthestPlayerFrom(position);
    if (mod.IsPlayerValid(playerNative)) {
      return Player.fromNative(playerNative);
    }
    return null;
  }

  // Events
  public onGoing = new Event<() => Promise<void>>();
  public onPlayerDied = new Event<(killer: Player, deathType: mod.DeathType, weapon: mod.WeaponUnlock) => Promise<void>>();
  public onPlayerDamaged = new Event<(damager: Player, damageType: mod.DamageType, weapon: mod.WeaponUnlock) => Promise<void>>();
  public onPlayerEnterVehicle = new Event<(vehicle: Vehicle) => Promise<void>>();
  public onPlayerExitVehicle = new Event<(vehicle: Vehicle) => Promise<void>>();
  public onEnterCapturePoint = new Event<(capturePoint: CapturePoint) => Promise<void>>();
  public onExitCapturePoint = new Event<(capturePoint: CapturePoint) => Promise<void>>();
  public onEnterAreaTrigger = new Event<(areaTrigger: AreaTrigger) => Promise<void>>();
  public onExitAreaTrigger = new Event<(areaTrigger: AreaTrigger) => Promise<void>>();
  public onInteract = new Event<(interactPoint: InteractPoint) => Promise<void>>();
  public onManDown = new Event<(killer: Player | null) => Promise<void>>();
  public onDeployed = new Event<() => Promise<void>>();
  public onEarnedKill = new Event<(victim: Player, deathType: mod.DeathType, weapon: mod.WeaponUnlock) => Promise<void>>();
  public onEarnedKillAssist = new Event<(victim: Player) => Promise<void>>();
  public onEnterVehicleSeat = new Event<(vehicle: Vehicle, seat: number) => Promise<void>>();
  public onExitVehicleSeat = new Event<(vehicle: Vehicle, seat: number) => Promise<void>>();
  public onPlayerRejoinGame = new Event<() => Promise<void>>();
  public onSwitchTeam = new Event<(newTeam: Team) => Promise<void>>();
  public onUndeploy = new Event<() => Promise<void>>();
  public onRevived = new Event<(reviver: Player) => Promise<void>>();

  public get team(): Team {
    return Team.fromNative(mod.GetTeam(this.native));
  }

  public get squad(): Squad {
    return Squad.fromNative(mod.GetSquad(this.native));
  }
}
