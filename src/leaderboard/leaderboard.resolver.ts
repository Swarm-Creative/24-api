import { Resolver, Query, Args } from '@nestjs/graphql';
import { Leaderboard } from './leaderboard.schema';
import { LeaderboardService } from './leaderboard.service';
import { Schema as MongooseSchema} from 'mongoose';

@Resolver(() => Leaderboard)
export class LeaderboardResolver {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Query(() => Leaderboard, { name: 'getById' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.leaderboardService.getById(id);
  }

  @Query(() => Leaderboard, { name: 'getGameState' })
  findCurrent(
  ) {
    return this.leaderboardService.getGameState();
  }

}