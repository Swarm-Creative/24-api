import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LeaderboardModule } from "src/leaderboard/leaderboard.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { UserModule } from "src/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ScoreModule } from "src/score/score.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb://${config.get<string>("MONGOUSER")}:${config.get<string>(
          "MONGOPASSWORD"
        )}@${config.get<string>("MONGOHOST")}:${config.get<string>(
          "MONGOPORT"
        )}`,
        dbName: `${config.get<string>("MONOGODATABASE") || "test"}`,
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
    }),
    LeaderboardModule,
    UserModule,
    ScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
