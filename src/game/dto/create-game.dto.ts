import { IsNotEmpty } from "class-validator";

export class CreateGameDto {
    @IsNotEmpty()
    userOne: string
    @IsNotEmpty()
    userOnePoints: number
    @IsNotEmpty()
    userTwo: string
    @IsNotEmpty()
    userTwoPoints: string
    @IsNotEmpty()
    winner: string
}
