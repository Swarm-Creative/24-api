import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { Model, Schema as MongooseSchema, isValidObjectId } from 'mongoose';
import { Mod } from './entities/mod.entity';
import { ModService } from './mod.service';

@Resolver(() => Mod)
export class ModResolver {
  constructor(private readonly modService: ModService) {}

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    _id: MongooseSchema.Types.ObjectId;
  }) {
    return await this.modService.getById(reference._id);
  }

  @Query(() => [Mod], { name: 'getMods' })
  async findAll() {
    return this.modService.findAll();
  }
}