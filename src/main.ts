import { Portal } from "./index";

export async function OngoingGlobal() { }

export async function OngoingAreaTrigger(eventAreaTrigger: mod.AreaTrigger) {
  const area = Portal.Entities.AreaTrigger.fromNative(eventAreaTrigger);
  await area.onGoing.dispatch();
}

export async function OngoingCapturePoint(eventCapturePoint: mod.CapturePoint) {
  const cp = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  await cp.onGoing.dispatch();
}

export async function OngoingEmplacementSpawner(eventEmplacementSpawner: mod.EmplacementSpawner) {
  const spawner = Portal.Entities.EmplacementSpawner.fromNative(eventEmplacementSpawner);
  await spawner.onGoing.dispatch();
}

export async function OngoingHQ(eventHQ: mod.HQ) {
  const hq = Portal.Entities.HQ.fromNative(eventHQ);
  await hq.onGoing.dispatch();
}

export async function OngoingInteractPoint(eventInteractPoint: mod.InteractPoint) {
  const interactPoint = Portal.Entities.InteractPoint.fromNative(eventInteractPoint);
  await interactPoint.onGoing.dispatch();
}

export async function OngoingLootSpawner(eventLootSpawner: mod.LootSpawner) {
  const lootSpawner = Portal.Entities.LootSpawner.fromNative(eventLootSpawner);
  await lootSpawner.onGoing.dispatch();
}

export async function OngoingMCOM(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  await mcom.onGoing.dispatch();
}

export async function OngoingPlayer(eventPlayer: mod.Player) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  await player.onGoing.dispatch();
}

export async function OngoingRingOfFire(eventRingOfFire: mod.RingOfFire) {
  const ringOfFire = Portal.Entities.RingOfFire.fromNative(eventRingOfFire);
  await ringOfFire.onGoing.dispatch();
}

export async function OngoingSector(eventSector: mod.Sector) {
  const sector = Portal.Entities.Sector.fromNative(eventSector);
  await sector.onGoing.dispatch();
}

export async function OngoingSpawner(eventSpawner: mod.Spawner) {
  const spawner = Portal.Entities.Spawner.fromNative(eventSpawner);
  await spawner.onGoing.dispatch();
}

export async function OngoingSpawnPoint(eventSpawnPoint: mod.SpawnPoint) {
  const spawnPoint = Portal.Entities.SpawnPoint.fromNative(eventSpawnPoint);
  await spawnPoint.onGoing.dispatch();
}

export async function OngoingTeam(eventTeam: mod.Team) {
  const team = Portal.Entities.Team.fromNative(eventTeam);
  await team.onGoing.dispatch();
}

export async function OngoingVehicle(eventVehicle: mod.Vehicle) {
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);
  await vehicle.onGoing.dispatch();
}

export async function OngoingVehicleSpawner(eventVehicleSpawner: mod.VehicleSpawner) {
  const vehicleSpawner = Portal.Entities.VehicleSpawner.fromNative(eventVehicleSpawner);
  await vehicleSpawner.onGoing.dispatch();
}

export async function OngoingWaypointPath(eventWaypointPath: mod.WaypointPath) {
  const waypointPath = Portal.Entities.WaypointPath.fromNative(eventWaypointPath);
  await waypointPath.onGoing.dispatch();
}

export async function OngoingWorldIcon(eventWorldIcon: mod.WorldIcon) {
  const worldIcon = Portal.Entities.WorldIcon.fromNative(eventWorldIcon);
  await worldIcon.onGoing.dispatch();
}

export async function Ongoing() {
  Portal.Game.onGoing.dispatch();
}

export async function OnPlayerDied(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock) {
  const victim = Portal.Entities.Player.fromNative(eventPlayer);
  const killer = Portal.Entities.Player.fromNative(eventOtherPlayer);

  await victim.onPlayerDied.dispatch(killer, eventDeathType, eventWeaponUnlock);

  const aiVictim = victim.asAI();
  if (aiVictim == null) return;

  Portal.AI.AIManager._handleDeath(aiVictim, killer, eventDeathType, eventWeaponUnlock);
}

export async function OnPlayerDamaged(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock) {
  const victim = Portal.Entities.Player.fromNative(eventPlayer);
  const damager = Portal.Entities.Player.fromNative(eventOtherPlayer);

  // This is a workaround
  // const damage = mod.GetSoldierState(victim.native, mod.SoldierStateNumber.CurrentHealth) - victim.currentHealth;

  await victim.onPlayerDamaged.dispatch(damager, eventDamageType, eventWeaponUnlock);

  const aiVictim = victim.asAI();
  if (aiVictim == null) return;

  // The API does not provide the damage amount directly in this event.
  // A possible workaround is to get health before and after, but that's not reliable.
  // For now, we'll pass 0 and the behavior can calculate it if needed.
  Portal.AI.AIManager._handleDamage(aiVictim, damager, 0, eventWeaponUnlock);
}

export async function OnPlayerEnterVehicle(eventPlayer: mod.Player, eventVehicle: mod.Vehicle) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);

  await player.onPlayerEnterVehicle.dispatch(vehicle);
  await vehicle.onPlayerEnterVehicle.dispatch(player);
}

export async function OnPlayerExitVehicle(eventPlayer: mod.Player, eventVehicle: mod.Vehicle) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);

  await player.onPlayerExitVehicle.dispatch(vehicle);
  await vehicle.onPlayerExitVehicle.dispatch(player);
}

export async function OnVehicleDestroyed(eventVehicle: mod.Vehicle) {
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);
  await vehicle.onVehicleDestroyed.dispatch();
}

export async function OnAIMoveToFailed(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  await aiPlayer.onAIMoveToFailed.dispatch();
}

export async function OnAIMoveToRunning(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  await aiPlayer.onAIMoveToRunning.dispatch();
}

export async function OnAIMoveToSucceeded(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  // Internal logic for path following
  aiPlayer._onMoveToSucceeded();
  await aiPlayer.onAIMoveToSucceeded.dispatch();
}

export async function OnAIParachuteRunning(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  await aiPlayer.onAIParachuteRunning.dispatch();
}

export async function OnPlayerUIButtonEvent(eventPlayer: mod.Player, eventUIWidget: mod.UIWidget, eventUIButtonEvent: mod.UIButtonEvent) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const widget = Portal.UI.UIWidget.fromNative(eventUIWidget);

  if (widget && widget instanceof Portal.UI.ButtonWidget) {
    switch (eventUIButtonEvent) {
      case mod.UIButtonEvent.ButtonDown:
        await widget.onButtonDown.dispatch(player);
        break;

      case mod.UIButtonEvent.ButtonUp:
        await widget.onButtonUp.dispatch(player);
        break;

      case mod.UIButtonEvent.FocusIn:
        await widget.onFocusIn.dispatch(player);
        break;

      case mod.UIButtonEvent.FocusOut:
        await widget.onFocusOut.dispatch(player);
        break;

      case mod.UIButtonEvent.HoverIn:
        await widget.onHoverIn.dispatch(player);
        break;

      case mod.UIButtonEvent.HoverOut:
        await widget.onHoverOut.dispatch(player);
        break;
    }
  }
}

export async function OnAIWaypointIdleFailed(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  await aiPlayer.onAIWaypointIdleFailed.dispatch();
}

export async function OnAIWaypointIdleRunning(eventPlayer: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (aiPlayer == null) return;

  await aiPlayer.onAIWaypointIdleRunning.dispatch();
}

export async function OnAIWaypointIdleSucceeded(eventPlayer: mod.Player) {
  const player = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (player == null) return;

  await player.onAIWaypointIdleSucceeded.dispatch();
}

export async function OnSpawnerSpawned(eventPlayer: mod.Player, eventSpawner: mod.Spawner) {
  const spawner = Portal.Entities.Spawner.fromNative(eventSpawner);
  const player = Portal.Entities.Player.fromNative(eventPlayer).asAI();
  if (player == null) return;

  await spawner.onSpawned.dispatch(player);
  Portal.AI.AIManager._assignPersonality(player, spawner);
}

export async function OnVehicleSpawned(eventVehicle: mod.Vehicle) {
  const vehicle = Portal.Entities.Vehicle.fromNative(eventVehicle);
  await Portal.Game.onVehicleSpawned.dispatch(vehicle);
}

export async function OnMandown(eventPlayer: mod.Player, eventKiller: mod.Player | null) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const killer = eventKiller ? Portal.GameObject.fromNative(eventKiller) as Portal.Entities.Player : null;

  await player.onManDown.dispatch(killer);
}

export async function OnRayCastHit(eventPlayer: mod.Player, eventPosition: mod.Vector, eventNormal: mod.Vector, eventHitPlayer: mod.Player, eventHitVehicle: mod.Vehicle) {
  Portal.Game._handleRaycastHit(eventPlayer, eventPosition, eventNormal, eventHitPlayer, eventHitVehicle);
}

export async function OnRayCastMissed(eventPlayer: mod.Player) {
  Portal.Game._handleRaycastMiss(eventPlayer);
}

export async function OnCapturePointCaptured(eventCapturePoint: mod.CapturePoint) {
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  await capturePoint.onCaptured.dispatch();
}

export async function OnPlayerEarnedKillAssist(eventPlayer: mod.Player, eventVictim: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const victim = Portal.GameObject.fromNative(eventVictim) as Portal.Entities.Player;

  await player.onEarnedKillAssist.dispatch(victim);
}

export async function OnCapturePointCapturing(eventCapturePoint: mod.CapturePoint) {
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  await capturePoint.onCapturing.dispatch();
}

export async function OnCapturePointLost(eventCapturePoint: mod.CapturePoint) {
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);
  await capturePoint.onLost.dispatch();
}

export async function OnPlayerEnterCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);

  await player.onEnterCapturePoint.dispatch(capturePoint);
  await capturePoint.onPlayerEnter.dispatch(player);
}

export async function OnPlayerExitCapturePoint(eventPlayer: mod.Player, eventCapturePoint: mod.CapturePoint) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const capturePoint = Portal.Entities.CapturePoint.fromNative(eventCapturePoint);

  await player.onExitCapturePoint.dispatch(capturePoint);
  await capturePoint.onPlayerExit.dispatch(player);
}

export async function OnPlayerExitVehicleSeat(eventPlayer: mod.Player, eventVehicle: mod.Vehicle, seat: number) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const vehicle = Portal.GameObject.fromNative(eventVehicle) as Portal.Entities.Vehicle;

  await player.onExitVehicleSeat.dispatch(vehicle, seat);
  await vehicle.onExitVehicleSeat.dispatch(player, seat);
}

export async function OnPlayerEnterVehicleSeat(eventPlayer: mod.Player, eventVehicle: mod.Vehicle, seat: number) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const vehicle = Portal.GameObject.fromNative(eventVehicle) as Portal.Entities.Vehicle;

  await player.onEnterVehicleSeat.dispatch(vehicle, seat);
  await vehicle.onEnterVehicleSeat.dispatch(player, seat);
}

export async function OnPlayerSwitchTeam(eventPlayer: mod.Player, eventTeam: mod.Team) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const team = Portal.Entities.Team.fromNative(eventTeam);

  await player.onSwitchTeam.dispatch(team);
  await team.onPlayerSwitchIn.dispatch(player);
}

export async function OnMCOMArmed(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  await mcom.onArmed.dispatch();
}

export async function OnMCOMDefused(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  await mcom.onDefused.dispatch();
}

export async function OnMCOMDestroyed(eventMCOM: mod.MCOM) {
  const mcom = Portal.Entities.MCOM.fromNative(eventMCOM);
  await mcom.onDestroyed.dispatch();
}

export async function OnPlayerUndeploy(eventPlayer: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  await player.onUndeploy.dispatch();
}

export async function OnPlayerDeployed(eventPlayer: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  await player.onDeployed.dispatch();
}

export async function OnPlayerEnterAreaTrigger(eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const areaTrigger = Portal.Entities.AreaTrigger.fromNative(eventAreaTrigger);

  await player.onEnterAreaTrigger.dispatch(areaTrigger);
  await areaTrigger.onPlayerEnter.dispatch(player);
}

export async function OnRevived(eventPlayer: mod.Player, eventReviver: mod.Player) {
  const player = Portal.GameObject.fromNative(eventPlayer) as Portal.Entities.Player;
  const reviver = Portal.GameObject.fromNative(eventReviver) as Portal.Entities.Player;

  await player.onRevived.dispatch(reviver);
}

export async function OnPlayerExitAreaTrigger(eventPlayer: mod.Player, eventAreaTrigger: mod.AreaTrigger) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const areaTrigger = Portal.Entities.AreaTrigger.fromNative(eventAreaTrigger);

  await player.onExitAreaTrigger.dispatch(areaTrigger);
  await areaTrigger.onPlayerExit.dispatch(player);
}

export async function OnRingOfFireZoneSizeChange(eventRingOfFire: mod.RingOfFire, eventNumber: number) {
  const ringOfFire = Portal.GameObject.fromNative(eventRingOfFire) as Portal.Entities.RingOfFire;
  await ringOfFire.onZoneSizeChanged.dispatch(eventNumber);
}

export async function OnPlayerInteract(eventPlayer: mod.Player, eventInteractPoint: mod.InteractPoint) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  const interactPoint = Portal.Entities.InteractPoint.fromNative(eventInteractPoint);

  await player.onInteract.dispatch(interactPoint);
  await interactPoint.onPlayerInteract.dispatch(player);
}

export async function OnGameModeStarted() {
  await Portal.Game.onGameModeStarted.dispatch();
}

export async function OnGameModeEnding() {
  await Portal.Game.onGameModeEnding.dispatch();
}

export async function OnTimeLimitReached() {
  await Portal.Game.onTimeLimitReached.dispatch();
}

export async function OnPlayerJoinGame(eventPlayer: mod.Player) {
  const player = Portal.Entities.Player.fromNative(eventPlayer);
  await Portal.Game.onPlayerJoined.dispatch(player);
}

export async function OnPlayerLeaveGame(playerId: number) {
  await Portal.Game.onPlayerLeft.dispatch(playerId);
  Portal.GameObject.removeInstance(playerId);
}

export async function OnPlayerEarnedKill(player: mod.Player, victim: mod.Player, deathType: mod.DeathType, weapon: mod.WeaponUnlock) {
  const aiPlayer = Portal.GameObject.fromNative(player) as Portal.Entities.Player;
  const aiVictim = Portal.GameObject.fromNative(victim) as Portal.Entities.Player;

  await aiPlayer.onEarnedKill.dispatch(aiVictim, deathType, weapon);
}

export async function OnAIParachuteSucceeded(player: mod.Player) {
  const aiPlayer = Portal.Entities.Player.fromNative(player).asAI();
  if (aiPlayer == null) return;

  await aiPlayer.onAIParachuteSucceeded.dispatch();
}
