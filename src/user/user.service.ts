import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { Score } from 'src/score/score.schema';
import { ServerError } from 'src/global/serverError';
import { User, UserDocument } from './user.schema';

const dataLoader = [
    { path: 'currentHighScore', model: Score.name, justOne: true },
  ];

  @Injectable()
  export class UserService {
    constructor(
      @InjectModel(User.name)
      private userModel: Model<UserDocument>,
      private readonly logger: Logger
    ) {}
  
    async getByUid(id: string) {
      try {
        return await this.userModel.find({ uid: id}).populate(dataLoader);
      } catch (error) {
        this.logger.error(error);
        throw new ServerError(error);
      }
    }
  
  }
