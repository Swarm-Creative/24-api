import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Score, ScoreSchema } from "src/score/score.schema";
import { ScoreService } from "src/score/score.service";
import { Mod, ModSchema } from "src/global/mod.entity";
import { ModService } from "src/global/mod.service";
import { User, UserSchema } from "src/user/user.schema";
import { ScoreResolver } from "./score.resolver";
import { UserService } from "src/user/user.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Score.name, schema: ScoreSchema },
      { name: Mod.name, schema: ModSchema },
    ]),
  ],
  providers: [ScoreResolver, ScoreService, UserService, ModService, Logger],
})
export class ScoreModule {}
