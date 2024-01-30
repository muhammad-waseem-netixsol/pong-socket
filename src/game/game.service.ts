import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GameHistory } from './schema/game.schema';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(@InjectModel(GameHistory.name) private historySchema: Model<GameHistory>,){

  }
  async create(createGameDto: CreateGameDto) {
    try{
      const { userOne, userOnePoints, userTwo, userTwoPoints, winner} = createGameDto;
      await this.historySchema.create({
        userOne, userOnePoints, userTwo, userTwoPoints, winner
      });
      return {message: "History created!"}
    }catch(err){
      return {message: "Error occurred!"}
    }
    
  
  }

  async findAll() {
    try{
     return await this.historySchema.find();
    }catch(err){
      return {message: "Error occurred!"}
    }
  }

}
