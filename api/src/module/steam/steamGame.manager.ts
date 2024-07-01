import { IProgressStatus } from "@aldahick/rex-sdk";
import { injectable } from "@athenajs/core";
import { chunk } from "remeda";
import { SteamGameModel } from "../../model/index.js";
import { DatabaseService } from "../../service/database/database.service.js";
import { SteamService } from "../../service/steam/steam.service.js";
import { ProgressManager } from "../progress/progress.manager.js";

const FETCH_CHUNK_SIZE = 1000;

@injectable()
export class SteamGameManager {
  constructor(
    private readonly db: DatabaseService,
    private readonly progressManager: ProgressManager,
    private readonly steamService: SteamService,
  ) {}

  async getMany(ids: number[]): Promise<SteamGameModel[]> {
    return await this.db.steamGames.whereIn("id", ids).selectAll();
  }

  async fetchAll(progressId: string): Promise<void> {
    await this.progressManager.addLogs(
      progressId,
      "Deleting all previous games...",
      IProgressStatus.InProgress,
    );
    await this.db.steamGames.where().delete();
    await this.progressManager.addLogs(progressId, "Fetching games...");
    const allGames = await this.steamService.getAllGames();
    for (const gameChunk of chunk(allGames, FETCH_CHUNK_SIZE)) {
      await this.progressManager.addLogs(
        progressId,
        `Saving game chunk, #${gameChunk.length} of ${allGames.length} total`,
      );
      await this.db.steamGames.createMany(
        gameChunk.map((game) => ({
          id: game.id,
          name: game.name,
        })),
      );
    }
    await this.progressManager.addLogs(
      progressId,
      `Finished inserting ${allGames.length} games.`,
      IProgressStatus.Complete,
    );
  }

  async search(
    text: string,
    { offset, limit }: { offset: number; limit: number },
  ): Promise<SteamGameModel[]> {
    return await this.db.steamGames
      .where({
        name: {
          contains: text,
        },
      })
      .offset(offset)
      .limit(limit)
      .order("name");
  }
}
