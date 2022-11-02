import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";

@ObjectType()
@Schema({ collection: "mods" })
@Directive('@key(fields: "_id")')
export class Mod {
  @Field(() => ID, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop()
  name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  attribute: string;

  @Field(() => String, { nullable: true })
  @Prop()
  affectObjectWTag: "player" | "enemy" | "world";

  @Field(() => String, { nullable: true })
  @Prop()
  iconUrl: string;

  @Field(() => Number || Boolean, { nullable: true })
  @Prop({ type: Number || Boolean })
  value: number | boolean;
}

export type ModDocument = Mod & Document;

export const ModSchema = SchemaFactory.createForClass(Mod);
