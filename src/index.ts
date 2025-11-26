import * as AIModule from "./ai";
import * as EventModule from "./event";
import * as EntitiesModule from "./entities";
import * as GameModule from "./game";
import * as GameObjectModule from "./game_object";
import * as InputRestrictionsModule from "./input_restrictions";
import * as InventoryModule from "./inventory_manager";
import * as MusicModule from "./music";
import * as UIModule from "./ui";
import * as ScoreboardModule from "./scoreboard";
import * as TypesModule from "./types";
import * as WeaponModule from "./weapon";

export namespace Portal {
  // Event system
  export import Event = EventModule.Event;

  // Base game object
  export import GameObject = GameObjectModule.GameObject;

  // Entities
  export import Entities = EntitiesModule;

  // Game controller
  export import Game = GameModule.Game;

  // AI System
  export import AI = AIModule;

  // Inventory and Weapons
  export import Weapon = WeaponModule.Weapon;
  export import InventoryManager = InventoryModule.InventoryManager;

  // Input
  export import InputRestrictions = InputRestrictionsModule.InputRestrictions;

  // Music
  export import Music = MusicModule.Music;

  // UI
  export import UI = UIModule;

  // Types
  export type RuntimeSpawnable = TypesModule.RuntimeSpawnable;
  export type ObjectivePoint = TypesModule.ObjectivePoint;

  // Scoreboard
  export import Scoreboard = ScoreboardModule.Scoreboard;
  export import ScoreboardConfig = ScoreboardModule.ScoreboardConfig;
  export import ScoreboardColumn = ScoreboardModule.ScoreboardColumn;
}
