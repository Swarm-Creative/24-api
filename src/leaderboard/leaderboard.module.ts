import { Logger, Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardResolver } from './leaderboard.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from 'src/global/entities/score.entity';
import { ScoreService } from 'src/global/score.service';
import { Mod, ModSchema } from 'src/global/entities/mod.entity';
import { ModService } from 'src/global/mod.service';
import { Leaderboard, LeaderboardSchema } from './leaderboard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leaderboard.name, schema: LeaderboardSchema},
      { name: Score.name, schema: ScoreSchema },
      { name: Mod.name, schema: ModSchema}
    ]),
  ],
  providers: [LeaderboardResolver, LeaderboardService, ScoreService, ModService, Logger]
})
export class LeaderboardModule {}
