import { Player } from "./entities/player";
import { Vehicle } from "./entities/vehicle";
import { Event } from "./event";

export abstract class Game {
  // Static Global Events
  public static onGoing = new Event<() => Promise<void>>();
  public static onGameModeStarted = new Event<() => Promise<void>>();
  public static onGameModeEnding = new Event<() => Promise<void>>();
  public static onTimeLimitReached = new Event<() => Promise<void>>();
  public static onVehicleSpawned = new Event<(vehicle: Vehicle) => Promise<void>>();
  public static onPlayerJoined = new Event<(player: Player) => Promise<void>>();
  public static onPlayerLeft = new Event<(playerId: number) => Promise<void>>();

  // Static Global Functions
  public static end(winner?: Player | mod.Team): void {
    if (winner) {
      if (winner instanceof Player) {
        mod.EndGameMode(winner.native);
      } else {
        mod.EndGameMode(winner);
      }
    } else {
      // Ends in a draw
      mod.EndGameMode(mod.GetTeam(0));
    }
  }

  public static DisablePlayerJoin(): void {
    mod.DisablePlayerJoin();
  }

  public static pauseTimer(shouldPause: boolean): void {
    mod.PauseGameModeTime(shouldPause);
  }

  public static setFriendlyFire(enabled: boolean): void {
    mod.SetFriendlyFire(enabled);
  }

  public static get matchTimeElapsed(): number {
    return mod.GetMatchTimeElapsed();
  }

  public static get matchTimeRemaining(): number {
    return mod.GetMatchTimeRemaining();
  }

  public static resetTimer(): void {
    mod.ResetGameModeTime();
  }

  public static setTargetScore(score: number): void {
    mod.SetGameModeTargetScore(score);
  }

  public static setTimeLimit(seconds: number): void {
    mod.SetGameModeTimeLimit(seconds);
  }

  public static deployAllPlayers(): void {
    mod.DeployAllPlayers();
  }

  public static undeployAllPlayers(): void {
    mod.UndeployAllPlayers();
  }

  public static enableAllPlayerDeploy(enabled: boolean): void {
    mod.EnableAllPlayerDeploy(enabled);
  }

  public static setAIToHumanDamageModifier(multiplier: number): void {
    mod.SetAIToHumanDamageModifier(multiplier);
  }

  public static setCameraTypeForAll(cameraType: mod.Cameras, cameraIndex?: number): void {
    if (cameraIndex !== undefined) {
      mod.SetCameraTypeForAll(cameraType, cameraIndex);
    } else {
      mod.SetCameraTypeForAll(cameraType);
    }
  }

  private static raycastCallbacks = new Map<number, {
    onHit: (position: mod.Vector, normal: mod.Vector, hitPlayer: Player | null, hitVehicle: Vehicle | null) => void;
    onMiss: () => void;
  }>();

  /**
   * Performs a raycast and executes a callback on hit or miss.
   *
   * @param player The player initiating the raycast. Used to identify the callback.
   * @param start The starting position of the raycast.
   * @param stop The ending position of the raycast.
   * @param onHit The function to call if the raycast hits something.
   * @param onMiss The function to call if the raycast misses.
   */
  public static raycast(
    player: Player,
    start: mod.Vector,
    stop: mod.Vector,
    onHit: (position: mod.Vector, normal: mod.Vector, hitPlayer: Player | null, hitVehicle: Vehicle | null) => void,
    onMiss: () => void
  ): void {
    this.raycastCallbacks.set(player.id, { onHit, onMiss });
    mod.RayCast(player.native, start, stop);
  }

  /** @internal */
  public static _handleRaycastHit(eventPlayer: mod.Player, eventPosition: mod.Vector, eventNormal: mod.Vector, eventHitPlayer: mod.Player, eventHitVehicle: mod.Vehicle): void {
    const playerId = mod.GetObjId(eventPlayer);
    const callbacks = this.raycastCallbacks.get(playerId);

    if (callbacks) {
      const hitPlayer = eventHitPlayer ? Player.fromNative(eventHitPlayer) : null;
      const hitVehicle = eventHitVehicle ? Vehicle.fromNative(eventHitVehicle) : null;

      callbacks.onHit(eventPosition, eventNormal, hitPlayer, hitVehicle);
      this.raycastCallbacks.delete(playerId);
    }
  }

  /** @internal */
  public static _handleRaycastMiss(eventPlayer: mod.Player): void {
    const playerId = mod.GetObjId(eventPlayer);
    const callbacks = this.raycastCallbacks.get(playerId);

    if (callbacks) {
      callbacks.onMiss();
      this.raycastCallbacks.delete(playerId);
    }
  }
}
