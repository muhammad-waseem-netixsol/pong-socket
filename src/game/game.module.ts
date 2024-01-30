import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { historySchema } from './schema/game.schema';

@Module({
  imports:[AuthModule, MongooseModule.forFeature([{name: "GameHistory", schema: historySchema}])],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
