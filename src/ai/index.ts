import * as PersonalityModule from "./personality";
import * as ManagerModule from "./manager";
import * as SpawnerModule from "./spawner";

export namespace AI {
  // Types from personality module
  export type AIOptions = PersonalityModule.AIOptions;
  export type AIBehavior = PersonalityModule.AIBehavior;

  // Personality
  export import AIPersonality = PersonalityModule.AIPersonality;

  // Manager
  export import AIManager = ManagerModule.AIManager;

  // Spawner
  export import AISpawner = SpawnerModule.AISpawner;
}
