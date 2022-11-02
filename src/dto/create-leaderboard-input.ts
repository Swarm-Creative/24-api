import { Schema as MongooseSchema } from "mongoose";
import { Field, InputType, OmitType, ID } from "@nestjs/graphql";
import { Leaderboard } from "src/leaderboard/leaderboard.schema";

@InputType()
export class CreateLeaderboardInput extends OmitType(
  Leaderboard,
  ["_id", "expiresAt", "activeMods"],
  InputType
) {
  @Field(() => [String], {
    description: "List of Mods that were active when this score was set",
  })
  activeMods?: MongooseSchema.Types.ObjectId[];
}
