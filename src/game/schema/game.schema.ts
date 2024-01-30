import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class GameHistory extends Document {
    @Prop({require: true})
    userOne: string
    @Prop({require: true})
    userOnePoints: string

    @Prop({require: true})
    userTwo: string
    @Prop({require: true})
    userTwoPoints: string

    @Prop({require: true})
    winner: string

}

export const historySchema = SchemaFactory.createForClass(GameHistory);
