import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreService } from 'src/score/score.service';
import { Score, ScoreSchema } from 'src/score/score.schema';
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
