
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaderboardModule } from 'src/leaderboard/leaderboard.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MONO_DB_CONNECTION_STRING } from 'src/constants';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:bPhaTx8VOLImFHrpLtHF@containers-us-west-105.railway.app:7901'),    
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
  }), LeaderboardModule, UserModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}