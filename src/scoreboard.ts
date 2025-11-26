import { Player } from "./entities/player";
import { Team } from "./entities/team";

export interface ScoreboardColumn {
  name: string | mod.Message;
  width: number;
}

export interface ScoreboardConfig {
  type: mod.ScoreboardType;
  header?: string | mod.Message | { team1: string | mod.Message; team2: string | mod.Message };
  columns: ScoreboardColumn[];
  sorting?: {
    columnIndex: number;
    reverse: boolean;
  };
}

export abstract class Scoreboard {
  public static create(config: ScoreboardConfig): void {
    mod.SetScoreboardType(config.type);

    if (config.header) {
      this.setHeader(config.header);
    }

    if (config.columns) {
      this.setColumns(config.columns);
    }

    if (config.sorting) {
      mod.SetScoreboardSorting(config.sorting.columnIndex, config.sorting.reverse);
    }
  }

  public static setHeader(header: string | mod.Message | { team1: string | mod.Message; team2: string | mod.Message }): void {
    if (typeof header === 'object' && 'team1' in header) {
      const team1Msg = typeof header.team1 === 'string' ? mod.Message(header.team1) : header.team1;
      const team2Msg = typeof header.team2 === 'string' ? mod.Message(header.team2) : header.team2;

      mod.SetScoreboardHeader(team1Msg, team2Msg);
    } else {
      const headerMsg = typeof header === 'string' ? mod.Message(header as string) : header as mod.Message;
      mod.SetScoreboardHeader(headerMsg);
    }
  }

  public static setColumns(columns: ScoreboardColumn[]): void {
    const names = columns.map(c => typeof c.name === 'string' ? mod.Message(c.name) : c.name);
    const widths = columns.map(c => c.width);

    switch (columns.length) {
      case 1:
        mod.SetScoreboardColumnNames(names[0]);
        mod.SetScoreboardColumnWidths(widths[0]);
        break;

      case 2:
        mod.SetScoreboardColumnNames(names[0], names[1]);
        mod.SetScoreboardColumnWidths(widths[0], widths[1]);
        break;

      case 3:
        mod.SetScoreboardColumnNames(names[0], names[1], names[2]);
        mod.SetScoreboardColumnWidths(widths[0], widths[1], widths[2]);
        break;

      case 4:
        mod.SetScoreboardColumnNames(names[0], names[1], names[2], names[3]);
        mod.SetScoreboardColumnWidths(widths[0], widths[1], widths[2], widths[3]);
        break;

      case 5:
        mod.SetScoreboardColumnNames(names[0], names[1], names[2], names[3], names[4]);
        mod.SetScoreboardColumnWidths(widths[0], widths[1], widths[2], widths[3], widths[4]);
        break;

      default:
        // It's good practice to handle cases where the array size is out of bounds.
        mod.SendErrorReport(mod.Message(mod.stringkeys.SDK_SCOREBOARD_COLUMNS_ERROR, columns.length));
        break;
    }
  }

  public static setPlayerValues(player: Player, values: number[]): void {
    switch (values.length) {
      case 1:
        mod.SetScoreboardPlayerValues(player.native, values[0]);
        break;

      case 2:
        mod.SetScoreboardPlayerValues(player.native, values[0], values[1]);
        break;

      case 3:
        mod.SetScoreboardPlayerValues(player.native, values[0], values[1], values[2]);
        break;

      case 4:
        mod.SetScoreboardPlayerValues(player.native, values[0], values[1], values[2], values[3]);
        break;

      case 5:
        mod.SetScoreboardPlayerValues(player.native, values[0], values[1], values[2], values[3], values[4]);
        break;
    }
  }

  public static setGameScore(target: Player | Team, score: number): void {
    if (target instanceof Player) {
      mod.SetGameModeScore(target.native, score);
    } else {
      mod.SetGameModeScore(target.native, score);
    }
  }

  public static setTargetScore(score: number): void {
    mod.SetGameModeTargetScore(score);
  }
}
