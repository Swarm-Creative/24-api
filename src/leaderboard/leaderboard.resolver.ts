import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { Leaderboard } from "./leaderboard.schema";
import { LeaderboardService } from "./leaderboard.service";
import { Schema as MongooseSchema } from "mongoose";
import { CreateLeaderboardInput } from "src/dto/create-leaderboard-input";

@Resolver(() => Leaderboard)
export class LeaderboardResolver {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Query(() => Leaderboard, { name: "getLeaderboardById" })
  findOne(
    @Args("id", { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.leaderboardService.getLeaderboardById(id);
  }

  @Query(() => Leaderboard, { name: "getGameState" })
  findCurrent() {
    return this.leaderboardService.getGameState();
  }

  @Mutation(() => Leaderboard)
  createLeaderboard(
    @Args("createLeaderboardInput")
    createLeaderboardInput: CreateLeaderboardInput
  ) {
    return this.leaderboardService.create(createLeaderboardInput);
  }
}
