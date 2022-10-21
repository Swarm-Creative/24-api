import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { Model, Schema as MongooseSchema, isValidObjectId } from 'mongoose';
import { Score } from './entities/score.entity';
import { ScoreService } from './score.service';

@Resolver(() => Score)
export class ScoreResolver {
  constructor(private readonly scoreService: ScoreService) {}

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: MongooseSchema.Types.ObjectId;
  }) {
    return await this.scoreService.getById(reference._id);
  }

  @Query(() => [Score], { name: 'getScores' })
  async findAll() {
    return this.scoreService.findAll();
  }
}