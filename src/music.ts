import { Player } from "./entities/player";
import { Squad } from "./entities/squad";
import { Team } from "./entities/team";

export abstract class Music {
  /**
   * Plays a music event, optionally loading a music package first.
   *
   * @param event The music event to play.
   * @param musicPackage The music package to load before playing (optional).
   * @param target The specific player, squad, or team to play the music for (optional).
   */
  public static play(event: mod.MusicEvents, musicPackage?: mod.MusicPackages, target?: Player | Squad | Team): void {
    if (musicPackage !== undefined) {
      mod.LoadMusic(musicPackage);
    }

    if (target) {
      mod.PlayMusic(event, target.native as any);
    } else {
      mod.PlayMusic(event);
    }
  }

  /**
   * Stops music by unloading a package or playing a stop event.
   *
   * Note: `mod.StopMusic/1` does not exist in the current SDK, so this method wraps `mod.UnloadMusic/1´ or ´mod.PlayMusic/1´ depending on arguments.
   *
   * @param event A specific stop event to play (optional).
   * @param musicPackage The music package to unload (optional).
   */
  public static stop(event?: mod.MusicEvents, musicPackage?: mod.MusicPackages): void {
    if (event !== undefined) {
      mod.PlayMusic(event);
    }
    if (musicPackage !== undefined) {
      mod.UnloadMusic(musicPackage);
    }
  }

  /**
   * Sets a parameter for the music system.
   *
   * @param parameter The parameter to set.
   * @param value The value to set.
   * @param target The specific player, squad, or team to set the parameter for (optional).
   */
  public static setParameter(parameter: mod.MusicParams, value: number, target?: Player | Squad | Team): void {
    if (target) {
      mod.SetMusicParam(parameter, value, target.native as any);
    } else {
      mod.SetMusicParam(parameter, value);
    }
  }
}
