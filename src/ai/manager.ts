import { AIPlayer } from "../entities/ai_player";
import { Player } from "../entities/player";
import { Spawner } from "../entities/spawner";
import { Team } from "../entities/team";
import { AIPersonality } from "./personality";
import { AISpawner } from "./spawner";

/**
 * Manages the lifecycle and behavior assignment for AI players.
 */
export abstract class AIManager {
  private static pendingPersonalities = new Map<number, AIPersonality>(); // spawnerId -> personality
  private static activeAIs = new Map<number, AIPlayer>(); // aiPlayerId -> AIPlayer

  /**
   * Spawns an AI with a specific personality from a given spawner.
   * @param personality The personality defining the AI's behavior and attributes.
   * @param spawner The spawner to use for creating the AI.
   * @param team The team to assign the AI to.
   */
  public static spawn(personality: AIPersonality, spawner: Spawner, team?: Team): void {
    const spawnerId = spawner.id;
    // Store the personality, so we can retrieve it when the OnSpawnerSpawned event fires.
    this.pendingPersonalities.set(spawnerId, personality);

    AISpawner.spawnAIFromSpawner(spawner, personality.options.soldierClass, personality.options.name, team);
  }

  /**
   * Called by the OnSpawnerSpawned event handler to assign a personality to a newly spawned AI.
   * @internal
   */
  public static _assignPersonality(player: AIPlayer, spawner: Spawner): void {
    const spawnerId = spawner.id;
    const personality = this.pendingPersonalities.get(spawnerId);

    if (personality) {
      player.personality = personality;
      this.activeAIs.set(player.id, player);

      // Apply options from the personality
      if (personality.options.health) {
        player.maxHealth = personality.options.health;
        mod.Heal(player.native, personality.options.health); // Heal to full health on spawn
      }

      if (personality.options.speedMultiplier) {
        mod.SetPlayerMovementSpeedMultiplier(player.native, personality.options.speedMultiplier);
      }

      if (personality.options.stance) {
        player.setStance(personality.options.stance);
      }

      if (personality.options.moveSpeed) {
        player.setMoveSpeed(personality.options.moveSpeed);
      }

      // Trigger the behavior's spawn logic
      personality.behavior.onSpawn(player);

      // Start the onGoing loop if it exists
      if (personality.behavior.onGoing) {
        this.startOnGoingLoop(player, personality);
      }

      // Clean up the pending personality for this spawner to avoid re-assigning it
      this.pendingPersonalities.delete(spawnerId);
    }
  }

  private static async startOnGoingLoop(player: AIPlayer, personality: AIPersonality) {
    const tickInterval = personality.options.behaviorTickInterval ?? 1.0;

    while (mod.IsPlayerValid(player.native) && player.isAlive) {
      try {
        personality.behavior.onGoing!(player);
      } catch (error: any) {
        mod.SendErrorReport(mod.Message(mod.stringkeys.SDK_ONGOING_LOOP_ERROR, error.message));
        mod.SendErrorReport(mod.Message(mod.stringkeys.SDK_ONGOING_LOOP_ERROR, error.message));
      }

      await mod.Wait(tickInterval);
    }
  }

  /**
   * Called by the OnPlayerDamaged event handler to delegate to the AI's behavior.
   * @internal
   */
  public static _handleDamage(victim: AIPlayer, damager: Player, damage: number, weapon: mod.WeaponUnlock): void {
    if (victim.personality) {
      victim.personality.behavior.onDamaged(victim, damager, damage, weapon);
    }
  }

  /**
   * Called by the OnPlayerDied event handler to delegate to the AI's behavior and clean up.
   * @internal
   */
  public static _handleDeath(victim: AIPlayer, killer: Player, deathType: mod.DeathType, weapon: mod.WeaponUnlock): void {
    if (this.activeAIs.has(victim.id)) {
      if (victim.personality) {
        victim.personality.behavior.onDeath(victim, killer, deathType, weapon);
      }
      this.activeAIs.delete(victim.id);
    }
  }
}
