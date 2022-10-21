import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema, isValidObjectId } from 'mongoose';
import { Mod, ModDocument } from './mod.entity';
import { ServerError } from './serverError';

@Injectable()
export class ModService {
    constructor(
        @InjectModel(Mod.name)
        private modModel: Model<ModDocument>,
        private readonly logger: Logger
    ) {}

    async getById(id: MongooseSchema.Types.ObjectId) {
        try {
            if (!isValidObjectId(id)) {
                throw new ServerError('Invalid ObjectId');
            }
            return await this.modModel
                .findById(id)
        } catch (error) {
            this.logger.error(error);
            throw new ServerError(error);
        }
    }

    async findAll() {
        try {
            const data = await this.modModel
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