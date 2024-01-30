import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('history')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    console.log("posted")
    return this.gameService.create(createGameDto);
  }

  @Get("/get-history")
  findAll() {
    return this.gameService.findAll();
  }

}
