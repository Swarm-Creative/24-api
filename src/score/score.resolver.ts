import {
  Resolver,
  Query,
  Args,
  ResolveReference,
  Mutation,
} from "@nestjs/graphql";
import { Schema as MongooseSchema } from "mongoose";
import { CreateScoreInput } from "src/dto/create-score-input";
import { Score } from "./score.schema";
import { ScoreService } from "./score.service";

@Resolver(() => Score)
export class ScoreResolver {
  constructor(private readonly scoreService: ScoreService) {}

  @ResolveReference()
  async getById(reference: {
    __typename: string;
    _id: MongooseSchema.Types.ObjectId;
  }) {
    return await this.scoreService.getById(reference._id);
  }

  @Mutation(() => Score)
  createScore(@Args("createScoreInput") createScoreInput: CreateScoreInput) {
    return this.scoreService.create(createScoreInput);
  }

  @Query(() => [Score], { name: "getScores" })
  async findAll() {
    return this.scoreService.findAll();
  }

  @Query(() => [Score], { name: "getScoresByUser" })
  async findAllByUser(
    @Args("userId", { type: () => String })
    userId: MongooseSchema.Types.ObjectId
  ) {
    return this.scoreService.findAllByUser(userId);
  }
}
