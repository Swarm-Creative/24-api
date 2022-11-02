import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";
import { User } from "src/user/user.schema";
import { Leaderboard } from "src/leaderboard/leaderboard.schema";
@ObjectType()
@Schema({ collection: "scores", timestamps: true })
@Directive('@key(fields: "_id")')
export class Score {
  @Field(() => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => User, { nullable: false })
  @Prop({ default: MongooseSchema.Types.ObjectId, required: true })
  user: MongooseSchema.Types.ObjectId;

  @Field(() => Leaderboard, { nullable: false })
  @Prop({ default: MongooseSchema.Types.ObjectId, required: true })
  leaderboard: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: false })
  @Prop()
  platform:
    | "ios"
    | "android"
    | "pc"
    | "mac"
    | "tvos"
    | "steamdeck"
    | "playstation"
    | "xbox";

  @Field(() => String, { nullable: true })
  @Prop()
  country: string;

  @Field(() => Number, { nullable: false })
  @Prop()
  scoreValue: number;
}

export type ScoreDocument = Score & Document;

export const ScoreSchema = SchemaFactory.createForClass(Score);
