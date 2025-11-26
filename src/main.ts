import { Portal } from "./index";

export function OngoingGlobal() { }

export function OngoingAreaTrigger(eventAreaTrigger: mod.AreaTrigger) {
  const area = Portal.Entities.AreaTrigger.fromNative(eventAreaTrigger);
  area.onGoing.dispatch();
}

export function OngoingCapturePoint(eventCapturePoint: mod.CapturePoint) {
  const cp = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  cp.onGoing.dispatch();
}

export function OngoingEmplacementSpawner(eventEmplacementSpawner: mod.EmplacementSpawner) {
  const spawner = Portal.Entities.EmplacementSpawner.fromNative(eventEmplacementSpawner);
  spawner.onGoing.dispatch();
}

export function OngoingHQ(eventHQ: mod.HQ) {
  const hq = Portal.Entities.HQ.fromNative(eventHQ);
  hq.onGoing.dispatch();
}

export function OngoingInteractPoint(eventInteractPoint: mod.InteractPoint) {
  const interactPoint = Portal.Entities.InteractPoint.fromNative(eventInteractPoint);
  interactPoint.onGoing.dispatch();
}

export function OngoingLootSpawner(eventLootSpawner: mod.LootSpawner) {
  const lootSpawner = Portal.Entities.LootSpawner.fromNative(eventLootSpawner);
  lootSpawner.onGoing.dispatch();
}

export function OngoingMCOM(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  mcom.onGoing.dispatch();
}

export function OngoingPlayer(eventPlayer: mod.Player) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  player.onGoing.dispatch();
}

export function OngoingRingOfFire(eventRingOfFire: mod.RingOfFire) {
  const ringOfFire = Portal.Entities.RingOfFire.fromNative(eventRingOfFire);
  ringOfFire.onGoing.dispatch();
}

export function OngoingSector(eventSector: mod.Sector) {
  const sector = Portal.Entities.Sector.fromNative(eventSector);
  sector.onGoing.dispatch();
}

export function OngoingSpawner(eventSpawner: mod.Spawner) {
  const spawner = Portal.Entities.Spawner.fromNative(eventSpawner);
  spawner.onGoing.dispatch();
}

export function OngoingSpawnPoint(eventSpawnPoint: mod.SpawnPoint) {
  const spawnPoint = Portal.Entities.SpawnPoint.fromNative(eventSpawnPoint);
  spawnPoint.onGoing.dispatch();
}

export function OngoingTeam(eventTeam: mod.Team) {
  const team = Portal.Entities.Team.fromNative(eventTeam);
  team.onGoing.dispatch();
}

export function OngoingVehicle(eventVehicle: mod.Vehicle) {
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);
  vehicle.onGoing.dispatch();
}

export function OngoingVehicleSpawner(eventVehicleSpawner: mod.VehicleSpawner) {
  const vehicleSpawner = Portal.Entities.VehicleSpawner.fromNative(eventVehicleSpawner);
  vehicleSpawner.onGoing.dispatch();
}

export function OngoingWaypointPath(eventWaypointPath: mod.WaypointPath) {
  const waypointPath = Portal.Entities.WaypointPath.fromNative(eventWaypointPath);
  waypointPath.onGoing.dispatch();
}

export function OngoingWorldIcon(eventWorldIcon: mod.WorldIcon) {
  const worldIcon = Portal.Entities.WorldIcon.fromNative(eventWorldIcon);
  worldIcon.onGoing.dispatch();
}

export function Ongoing() {
  Portal.Game.onGoing.dispatch();
}

export function OnPlayerDied(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock) {
  const victim = Portal.Entities.Player.fromNative(eventPlayer);
  const killer = Portal.Entities.Player.fromNative(eventOtherPlayer);

  victim.onPlayerDied.dispatch(killer, eventDeathType, eventWeaponUnlock);

  const aiVictim = victim.asAI();
  if (aiVictim == null) return;

  Portal.AI.AIManager._handleDeath(aiVictim, killer, eventDeathType, eventWeaponUnlock);
}

export function OnPlayerDamaged(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock) {
  const victim = Portal.Entities.Player.fromNative(eventPlayer);
  const damager = Portal.Entities.Player.fromNative(eventOtherPlayer);

  // This is a workaround
  // const damage = mod.GetSoldierState(victim.native, mod.SoldierStateNumber.CurrentHealth) - victim.currentHealth;

  victim.onPlayerDamaged.dispatch(damager, eventDamageType, eventWeaponUnlock);

  const aiVictim = victim.asAI();
  if (aiVictim == null) return;

  // The API does not provide the damage amount directly in this event.
  // A possible workaround is to get health before and after, but that's not reliable.
  // For now, we'll pass 0 and the behavior can calculate it if needed.
  Portal.AI.AIManager._handleDamage(aiVictim, damager, 0, eventWeaponUnlock);
}

export function OnPlayerEnterVehicle(eventPlayer: mod.Player, eventVehicle: mod.Vehicle) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);

  player.onPlayerEnterVehicle.dispatch(vehicle);
  vehicle.onPlayerEnterVehicle.dispatch(player);
}

export function OnPlayerExitVehicle(eventPlayer: mod.Player, eventVehicle: mod.Vehicle) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);

  player.onPlayerExitVehicle.dispatch(vehicle);
  vehicle.onPlayerExitVehicle.dispatch(player);
}

export function OnVehicleDestroyed(eventVehicle: mod.Vehicle) {
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);
  vehicle.onVehicleDestroyed.dispatch();
}

export function OnAIMoveToFailed(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  aiPlayer.onAIMoveToFailed.dispatch();
}

export function OnAIMoveToRunning(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  aiPlayer.onAIMoveToRunning.dispatch();
}

export function OnAIMoveToSucceeded(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  // Internal logic for path following
  aiPlayer._onMoveToSucceeded();
  aiPlayer.onAIMoveToSucceeded.dispatch();
}

export function OnAIParachuteRunning(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  aiPlayer.onAIParachuteRunning.dispatch();
}

export function OnPlayerUIButtonEvent(eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const widget = Portal.UI.UIWidget.fromNative(eventUIWidget);

  if (widget && widget instanceof Portal.UI.ButtonWidget) {
    switch (eventUIButtonEvent) {
      case mod.UIButtonEvent.ButtonDown:
        widget.onButtonDown.dispatch(player);
        break;

      case mod.UIButtonEvent.ButtonUp:
        widget.onButtonUp.dispatch(player);
        break;

      case mod.UIButtonEvent.FocusIn:
        widget.onFocusIn.dispatch(player);
        break;

      case mod.UIButtonEvent.FocusOut:
        widget.onFocusOut.dispatch(player);
        break;

      case mod.UIButtonEvent.HoverIn:
        widget.onHoverIn.dispatch(player);
        break;

      case mod.UIButtonEvent.HoverOut:
        widget.onHoverOut.dispatch(player);
        break;
    }
  }
}

export function OnAIWaypointIdleFailed(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  aiPlayer.onAIWaypointIdleFailed.dispatch();
}

export function OnAIWaypointIdleRunning(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  aiPlayer.onAIWaypointIdleRunning.dispatch();
}

export function OnAIWaypointIdleSucceeded(eventPlayer: mod.Player) {
  const player = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (player == null) return;

  player.onAIWaypointIdleSucceeded.dispatch();
}

export function OnSpawnerSpawned(eventPlayer: mod.Player, eventSpawner: mod.Spawner) {
  const spawner = Portal.Entities.Spawner.fromNative(eventSpawner);
  const player = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (player == null) return;

  spawner.onSpawned.dispatch(player);
  Portal.AI.AIManager._assignPersonality(player, spawner);
}

export function OnVehicleSpawned(eventVehicle: mod.Vehicle) {
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);
  Portal.Game.onVehicleSpawned.dispatch(vehicle);
}

export function OnMandown(eventPlayer: mod.Player, eventKiller: mod.Player | null) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const killer = eventKiller ? Portal.GameObject.fromNative(eventKiller) as Portal.Entities.Player : null;

  player.onManDown.dispatch(killer);
}

export function OnRayCastHit(eventPlayer: mod.Player, eventPosition: mod.Vector, eventNormal: mod.Vector, eventHitPlayer: mod.Player, eventHitVehicle: mod.Vehicle) {
  Portal.Game._handleRaycastHit(eventPlayer, eventPosition, eventNormal, eventHitPlayer, eventHitVehicle);
}

export function OnRayCastMissed(eventPlayer: mod.Player) {
  Portal.Game._handleRaycastMiss(eventPlayer);
}

export function OnCapturePointCaptured(eventCapturePoint: mod.CapturePoint) {
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  capturePoint.onCaptured.dispatch();
}

export function OnPlayerEarnedKillAssist(eventPlayer: mod.Player, eventVictim: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const victim = Portal.GameObject.fromNative(eventVictim) as Portal.Entities.Player;

  player.onEarnedKillAssist.dispatch(victim);
}

export function OnCapturePointCapturing(eventCapturePoint: mod.CapturePoint) {
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  capturePoint.onCapturing.dispatch();
}

export function OnCapturePointLost(eventCapturePoint: mod.CapturePoint) {
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  capturePoint.onLost.dispatch();
}

export function OnPlayerEnterCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);

  player.onEnterCapturePoint.dispatch(capturePoint);
  capturePoint.onPlayerEnter.dispatch(player);
}

export function OnPlayerExitCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);

  player.onExitCapturePoint.dispatch(capturePoint);
  capturePoint.onPlayerExit.dispatch(player);
}

export function OnPlayerExitVehicleSeat(eventPlayer: mod.Player, eventVehicle: mod.Vehicle, seat: number) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const vehicle = Portal.GameObject.fromNative(eventVehicle) as Portal.Entities.Vehicle;

  player.onExitVehicleSeat.dispatch(vehicle, seat);
  vehicle.onExitVehicleSeat.dispatch(player, seat);
}

export function OnPlayerEnterVehicleSeat(eventPlayer: mod.Player, eventVehicle: mod.Vehicle, seat: number) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const vehicle = Portal.GameObject.fromNative(eventVehicle) as Portal.Entities.Vehicle;

  player.onEnterVehicleSeat.dispatch(vehicle, seat);
  vehicle.onEnterVehicleSeat.dispatch(player, seat);
}

export function OnPlayerSwitchTeam(eventPlayer: mod.Player, eventTeam: mod.Team) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const team = Portal.Entities.Team.fromNative(eventTeam);

  player.onSwitchTeam.dispatch(team);
  team.onPlayerSwitchIn.dispatch(player);
}

export function OnMCOMArmed(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  mcom.onArmed.dispatch();
}

export function OnMCOMDefused(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  mcom.onDefused.dispatch();
}

export function OnMCOMDestroyed(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  mcom.onDestroyed.dispatch();
}

export function OnPlayerUndeploy(eventPlayer: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  player.onUndeploy.dispatch();
}

export function OnPlayerDeployed(eventPlayer: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  player.onDeployed.dispatch();
}

export function OnPlayerEnterAreaTrigger(eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const areaTrigger = Portal.Entities.AreaTrigger.fromNative(eventAreaTrigger);

  player.onEnterAreaTrigger.dispatch(areaTrigger);
  areaTrigger.onPlayerEnter.dispatch(player);
}

export function OnRevived(eventPlayer: mod.Player, eventReviver: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const reviver = Portal.GameObject.fromNative(eventReviver) as Portal.Entities.Player;

  player.onRevived.dispatch(reviver);
}

export function OnPlayerExitAreaTrigger(eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const areaTrigger = Portal.Entities.AreaTrigger.fromNative(eventAreaTrigger);

  player.onExitAreaTrigger.dispatch(areaTrigger);
  areaTrigger.onPlayerExit.dispatch(player);
}

export function OnRingOfFireZoneSizeChange(eventRingOfFire: mod.RingOfFire, eventNumber: number) {
  const ringOfFire = Portal.GameObject.fromNative(eventRingOfFire) as Portal.Entities.RingOfFire;
  ringOfFire.onZoneSizeChanged.dispatch(eventNumber);
}

export function OnPlayerInteract(eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const interactPoint = Portal.Entities.InteractPoint.fromNative(eventInteractPoint);

  player.onInteract.dispatch(interactPoint);
  interactPoint.onPlayerInteract.dispatch(player);
}

export function OnGameModeStarted() {
  Portal.Game.onGameModeStarted.dispatch();
}

export function OnGameModeEnding() {
  Portal.Game.onGameModeEnding.dispatch();
}

export function OnTimeLimitReached() {
  Portal.Game.onTimeLimitReached.dispatch();
}

export function OnPlayerJoinGame(eventPlayer: mod.Player) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  Portal.Game.onPlayerJoined.dispatch(player);
}

export function OnPlayerLeaveGame(playerId: number) {
  Portal.Game.onPlayerLeft.dispatch(playerId);
  Portal.GameObject.removeInstance(playerId);
}

export function OnPlayerEarnedKill(player: mod.Player, victim: mod.Player, deathType: mod.DeathType, weapon: mod.WeaponUnlock) {
  const aiPlayer = Portal.GameObject.fromNative(player) as Portal.Entities.Player;
  const aiVictim = Portal.GameObject.fromNative(victim) as Portal.Entities.Player;

  aiPlayer.onEarnedKill.dispatch(aiVictim, deathType, weapon);
}

export function OnAIParachuteSucceeded(player: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(player).asAI();
  if (aiPlayer == null) return;

  aiPlayer.onAIParachuteSucceeded.dispatch();
}
