import * as AIPlayerModule from "./ai_player";
import * as AreaTriggerModule from "./area_trigger";
import * as CapturePointModule from "./capture_point";
import * as EmplacementSpawnerModule from "./emplacement_spawner";
import * as HQModule from "./hq";
import * as InteractPointModule from "./interact_point";
import * as LootSpawnerModule from "./loot_spawner";
import * as MCOMModule from "./mcom";
import * as ObjectiveModule from "./objective";
import * as PlayerModule from "./player";
import * as RingOfFireModule from "./ring_of_fire";
import * as ScreenEffectModule from "./screen_effect";
import * as SectorModule from "./sector";
import * as SFXModule from "./sfx";
import * as SpatialObjectModule from "./spatial_object";
import * as SpawnerModule from "./spawner";
import * as SpawnPointModule from "./spawn_point";
import * as SquadModule from "./squad";
import * as TeamModule from "./team";
import * as VehicleModule from "./vehicle";
import * as VehicleSpawnerModule from "./vehicle_spawner";
import * as VFXModule from "./vfx";
import * as WaypointPathModule from "./waypoint_path";
import * as WorldIconModule from "./world_icon";

export namespace Entities {
  // Players
  export import Player = PlayerModule.Player;
  export import AIPlayer = AIPlayerModule.AIPlayer;

  // Vehicles
  export import Vehicle = VehicleModule.Vehicle;

  // Objectives
  export import Objective = ObjectiveModule.Objective;
  export import CapturePoint = CapturePointModule.CapturePoint;
  export import MCOM = MCOMModule.MCOM;
  export import HQ = HQModule.HQ;
  export import Sector = SectorModule.Sector;

  // Teams and Squads
  export import Team = TeamModule.Team;
  export import Squad = SquadModule.Squad;

  // Spawners
  export import Spawner = SpawnerModule.Spawner;
  export import SpawnPoint = SpawnPointModule.SpawnPoint;
  export import VehicleSpawner = VehicleSpawnerModule.VehicleSpawner;
  export import EmplacementSpawner = EmplacementSpawnerModule.EmplacementSpawner;
  export import LootSpawner = LootSpawnerModule.LootSpawner;

  // Triggers and Interactions
  export import AreaTrigger = AreaTriggerModule.AreaTrigger;
  export import InteractPoint = InteractPointModule.InteractPoint;

  // Spatial Objects
  export import SpatialObject = SpatialObjectModule.SpatialObject;
  export import WaypointPath = WaypointPathModule.WaypointPath;

  // Effects
  export import VFX = VFXModule.VFX;
  export import SFX = SFXModule.SFX;
  export import ScreenEffect = ScreenEffectModule.ScreenEffect;
  export import RingOfFire = RingOfFireModule.RingOfFire;

  // UI Elements
  export import WorldIcon = WorldIconModule.WorldIcon;
}
