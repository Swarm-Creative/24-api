import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User, { name: 'getUserByUid' })
  findOne(
    @Args('id', { type: () => String }) id: string
  ) {
    return this.usersService.getByUid(id);
  }

}