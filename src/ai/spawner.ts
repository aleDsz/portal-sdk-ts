import { Spawner } from "../entities/spawner";
import { Team } from "../entities/team";

export abstract class AISpawner {
  public static setUnspawnOnDead(spawner: Spawner, enable: boolean): void {
    mod.AISetUnspawnOnDead(spawner.native, enable);
  }

  public static setUnspawnDelay(spawner: Spawner, delay: number): void {
    mod.SetUnspawnDelayInSeconds(spawner.native, delay);
  }

  public static spawnAIFromSpawner(spawner: Spawner, soldierClass?: mod.SoldierClass, name?: string, team?: Team): void {
    if (soldierClass && name && team) {
      mod.SpawnAIFromAISpawner(spawner.native, soldierClass, mod.Message(name), team.native);
    } else if (soldierClass && team) {
      mod.SpawnAIFromAISpawner(spawner.native, soldierClass, team.native);
    } else if (soldierClass && name) {
      mod.SpawnAIFromAISpawner(spawner.native, soldierClass, mod.Message(name));
    } else if (name && team) {
      mod.SpawnAIFromAISpawner(spawner.native, mod.Message(name), team.native);
    } else if (soldierClass) {
      mod.SpawnAIFromAISpawner(spawner.native, soldierClass);
    } else if (name) {
      mod.SpawnAIFromAISpawner(spawner.native, mod.Message(name));
    } else if (team) {
      mod.SpawnAIFromAISpawner(spawner.native, team.native);
    } else {
      mod.SpawnAIFromAISpawner(spawner.native);
    }
  }

  public static unspawnAllAIsFromSpawner(spawner: Spawner): void {
    mod.UnspawnAllAIsFromAISpawner(spawner.native);
  }
}
