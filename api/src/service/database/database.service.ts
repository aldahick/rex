import { MongoService } from "@athenajs/core";
import { injectable } from "@athenajs/core";
import { ReturnModelType } from "@typegoose/typegoose";

import { Progress } from "../../model";
import { Role } from "../../model";
import { SteamGame } from "../../module/steam/model";
import { User } from "../../module/user/model";
import { ConfigService } from "../config";

@singleton()
export class DatabaseService {
  progress!: ReturnModelType<typeof Progress>;

  roles!: ReturnModelType<typeof Role>;

  steamGames!: ReturnModelType<typeof SteamGame>;

  users!: ReturnModelType<typeof User>;

  constructor(
    private readonly config: ConfigService,
    private readonly mongo: MongoService
  ) {}

  async init(): Promise<void> {
    await this.mongo.init(this.config.mongoUrl);

    this.progress = this.mongo.getModel(Progress, "progress");
    this.steamGames = this.mongo.getModel(SteamGame, "steamGames");
    this.roles = this.mongo.getModel(Role, "roles");
    this.users = this.mongo.getModel(User, "users");
  }
}
