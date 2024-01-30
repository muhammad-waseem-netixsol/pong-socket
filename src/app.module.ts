import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from './game/game.module';
import { EventsGateway } from './socket/socket.gateway';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://infowaseem1234:nestjs@cluster0.xkb1xah.mongodb.net/pong',
    ),
    GameModule,
    EventsGateway
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
