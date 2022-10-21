import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreResolver } from 'src/global/score.resolver';
import { ScoreService } from 'src/global/score.service';
import { Score, ScoreSchema } from 'src/global/entities/score.entity';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema},
        { name: Score.name, schema: ScoreSchema }
      ]
    ),
  ],
  providers: [UserService, UserResolver, ScoreService, Logger],
  exports: [UserService]
})
export class UserModule {}
