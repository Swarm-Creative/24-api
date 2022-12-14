import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@ObjectType()
@Schema({ collection: "users" })
@Directive('@key(fields: "_id")')
export class User extends Document {
  @Field(() => ID, { nullable: false })
  @Prop({ default: MongooseSchema.Types.ObjectId, required: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ unique: true })
  uid: string;

  @Field(() => String, { nullable: true })
  @Prop({ unique: true })
  name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  avatarUrl: number;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
