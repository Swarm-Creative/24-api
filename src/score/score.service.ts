import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema, isValidObjectId } from "mongoose";
import { Mod } from "src/global/mod.entity";
import { User } from "src/user/user.schema";
import { Score, ScoreDocument } from "src/score/score.schema";
import { Leaderboard } from "src/leaderboard/leaderboard.schema";
import { ServerError } from "../global/serverError";
import { CreateScoreInput } from "src/dto/create-score-input";

const dataLoader = [
  { path: "mods", model: Mod.name, justOne: false },
  { path: "user", model: User.name, justOne: true },
  { path: "leaderboard", model: Leaderboard.name, justOne: true },
];

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name)
    private scoreModel: Model<ScoreDocument>,
    private readonly logger: Logger
  ) {}

  async create(createScoreInput: CreateScoreInput) {
    try {
      const score = new this.scoreModel(createScoreInput);
      await score.populate(dataLoader);
      return score.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async getById(id: MongooseSchema.Types.ObjectId) {
    try {
      if (!isValidObjectId(id)) {
        throw new ServerError("Invalid ObjectId");
      }
      return await this.scoreModel.findById(id).populate(dataLoader);
    } catch (error) {
      this.logger.error(error);
      throw new ServerError(error);
    }
  }

  async findAll() {
    try {
      const data = await this.scoreModel.find().populate(dataLoader);

      if (data.length <= 0) {
        throw new ServerError("Invalid result list mod");
      }
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new ServerError(error);
    }
  }
}
