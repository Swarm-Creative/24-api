import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ID, ObjectType, Directive } from '@nestjs/graphql';
import { Mod } from '../global/mod.entity';
import { User } from 'src/user/user.schema';
import * as mongoose from 'mongoose';
@ObjectType()
@Schema({ collection: 'scores' })
@Directive('@key(fields: "_id")')
export class Score {
  @Field(() => ID, { nullable: true})
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => User, { nullable: false})
  @Prop({ default: MongooseSchema.Types.ObjectId, required: true})
  user: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: false })
  @Prop()
  platform: 'ios' | 'android' | 'pc' | 'mac' | 'tvos' | 'steam-deck';

  @Field(() => String, { nullable: true })
  @Prop()
  country: string;

  @Field(() => Number, { nullable: false })
  @Prop()
  scoreValue: number;

  @Field(() => [Mod], { nullable: false })
  @Prop({ default: new Array<MongooseSchema.Types.ObjectId>, required: true })
  mods: [MongooseSchema.Types.ObjectId];
}

export type ScoreDocument = Score & Document;

export const ScoreSchema = SchemaFactory.createForClass(Score);