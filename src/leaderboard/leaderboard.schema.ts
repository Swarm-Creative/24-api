import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";
import { Mod } from "src/global/mod.entity";

@ObjectType()
@Schema({ collection: "leaderboards", timestamps: true })
@Directive('@key(fields: "_id")')
export class Leaderboard {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Date, { nullable: false })
  @Prop()
  expiresAt: Date;

  @Field(() => [Mod], { nullable: false })
  @Prop({ default: new Array<MongooseSchema.Types.ObjectId>(), required: true })
  activeMods: [MongooseSchema.Types.ObjectId];
}

export type LeaderboardDocument = Leaderboard & Document;

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);
