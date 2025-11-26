import { AIPlayer } from "../entities/ai_player";
import { Player } from "../entities/player";

/**
 * Defines a set of optional attributes for an AI personality.
 */
export interface AIOptions {
  health?: number;
  speedMultiplier?: number;
  stance?: mod.Stance;
  moveSpeed?: mod.MoveSpeed;
  soldierClass?: mod.SoldierClass;
  name?: string;
  behaviorTickInterval?: number;
}

/**
 * Defines the behavior contract for an AI, with methods for lifecycle events.
 */
export interface AIBehavior {
  onSpawn(player: AIPlayer): void | Promise<void>;
  onDamaged(player: AIPlayer, damager: Player, damage: number, weapon: mod.WeaponUnlock): void | Promise<void>;
  onDeath(player: AIPlayer, killer: Player, deathType: mod.DeathType, weapon: mod.WeaponUnlock): void | Promise<void>;
  onGoing?(player: AIPlayer): void | Promise<void>;
}

/**
 * Represents an AI's blueprint, combining a behavior with specific options.
 */
export class AIPersonality {
  constructor(public behavior: AIBehavior, public options: AIOptions = {}) { }
}
