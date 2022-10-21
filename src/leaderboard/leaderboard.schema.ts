import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ID, ObjectType, Directive } from '@nestjs/graphql';
import { Score } from 'src/global/entities/score.entity';
import { Mod } from 'src/global/entities/mod.entity';


@ObjectType()
@Schema({ collection: 'leaderboards' })
@Directive('@key(fields: "_id")')
export class Leaderboard {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Date, { nullable: false })
  @Prop()
  date: Date;

  @Field(() => Date, { nullable: false })
  @Prop()
  expiresAt: Date;

  @Field(() => [Score], { nullable: true })
  @Prop()
  scores: Score[];

  @Field(() =>[Mod], { nullable: false })
  @Prop()
  activeMods: Mod[];
}

export type LeaderboardDocument = Leaderboard & Document;

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);