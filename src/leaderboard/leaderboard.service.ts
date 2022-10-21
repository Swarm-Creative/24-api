import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema, isValidObjectId } from 'mongoose';
import { Mod } from 'src/global/mod.entity';
import { Score } from 'src/score/score.schema';
import { ServerError } from 'src/global/serverError';
import { Leaderboard, LeaderboardDocument } from './leaderboard.schema';

const dataLoader = [
    { path: 'scores', model: Score.name, justOne: false },
    { path: 'activeMods', model: Mod.name, justOne: false },
  ];

  @Injectable()
  export class LeaderboardService {
    constructor(
      @InjectModel(Leaderboard.name)
      private leaderboardModel: Model<LeaderboardDocument>,
      private readonly logger: Logger
    ) {}
  
    async getById(id: MongooseSchema.Types.ObjectId) {
        try {
          if (!isValidObjectId(id)) {
            throw new ServerError('Invalid ObjectId');
          }
          return await this.leaderboardModel.findById(id).populate(dataLoader);
        } catch (error) {
          this.logger.error(error);
          throw new ServerError(error);
        }
      }
    
    async getGameState() {
        try {
          return await this.leaderboardModel.findOne().sort({ created_at: -1 }).limit(1).populate(dataLoader);
        } catch (error) {
          this.logger.error(error);
          throw new ServerError(error);
        }
      }
  
  }