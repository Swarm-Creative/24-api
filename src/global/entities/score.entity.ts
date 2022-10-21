import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ID, ObjectType, Directive } from '@nestjs/graphql';
import { Mod } from './mod.entity';
import { User } from 'src/user/user.schema';

@ObjectType()
@Schema({ collection: 'scores' })
@Directive('@key(fields: "_id")')
export class Score {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => User, { nullable: false })
  @Prop()
  user: User;

  @Field(() => String, { nullable: false })
  @Prop()
  platform: 'ios' | 'android' | 'pc' | 'mac' | 'tvos';

  @Field(() => String, { nullable: true })
  @Prop()
  country: string;

  @Field(() => Number, { nullable: false })
  @Prop()
  scoreValue: number;

  @Field(() => [Mod], { nullable: false })
  @Prop()
  mods: [Mod];
}

export type ScoreDocument = Score & Document;

export const ScoreSchema = SchemaFactory.createForClass(Score);