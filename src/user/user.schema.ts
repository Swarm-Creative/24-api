import { Field, ID, ObjectType, Directive } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Score } from 'src/score/score.schema';

@ObjectType()
@Schema({ collection: 'users' })
@Directive('@key(fields: "_id")')
export class User extends Document {
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;
    
  @Field()
  uid: string;

  @Field()
  name: string;

  @Field()
  avatarUrl: number;

  @Field(() => Score, { nullable: true })
  @Prop({type: Object})
  currentHighScore: Score;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);