import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Score } from 'src/score/score.schema';

@InputType()
export class CreateScoreInput extends OmitType(
  Score,
  [
      '_id',
      'user',
      'platform', 
      'country',
      'scoreValue',
      'mods'
  ],
  InputType) {
  @Field(() => String, { nullable: true, description: 'User who set this score' })
  user?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'Platform that this score was set on', nullable:false })
  platform: 'ios' | 'android' | 'pc' | 'mac' | 'tvos' | 'steam-deck';

  @Field(() => String, { description: 'Country user is from', nullable:true })
  country: string;

  @Field(() => Number, { description: 'Value of the score', nullable:false })
  scoreValue: number;

  @Field(() => [String], {description: 'List of Mods that were active when this score was set'})
  mods?: MongooseSchema.Types.ObjectId[];
}
