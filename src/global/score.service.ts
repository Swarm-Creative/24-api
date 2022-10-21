import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema, isValidObjectId } from 'mongoose';
import { Score, ScoreDocument } from '../global/entities/score.entity';
import { ServerError } from '../global/serverError';

@Injectable()
export class ScoreService {
    constructor(
        @InjectModel(Score.name)
        private scoreModel: Model<ScoreDocument>,
        private readonly logger: Logger
    ) {}

    async getById(id: MongooseSchema.Types.ObjectId) {
        try {
            if (!isValidObjectId(id)) {
                throw new ServerError('Invalid ObjectId');
            }
            return await this.scoreModel
                .findById(id)
        } catch (error) {
            this.logger.error(error);
            throw new ServerError(error);
        }
    }

    async findAll() {
        try {
            const data = await this.scoreModel
                .find();

            if (data.length <= 0) {
                throw new ServerError('Invalid result list mod');
            }
            return data;
        } catch (error) {
            this.logger.error(error);
            throw new ServerError(error);
        }
    }
}