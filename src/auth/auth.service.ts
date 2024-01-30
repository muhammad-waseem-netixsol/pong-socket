/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  // sign up controller
  async signUp(signUpDto: SignUpDto) {
    const { username, name, email, password} = signUpDto;
    const userExists = await this.userModel.findOne({ email: email });
    if (userExists)
      throw new ConflictException(
        'User already exists. PLease try different email..',
      );
    const hashed = await bcrypt.hash(password, 10);
    await this.userModel.create({
      username,
      name,
      email,
      password: hashed
    });
    return { success: 'User created' };
  }
  // login controller
  async logIn(logInDto: LogInDto) {
    try {
      const { email, password } = logInDto;
      const user = await this.userModel.find({ email: email });
      if (user.length === 0) {
        return {error : true, message: "User with email does not exist."}
      }
  
      const passwordMatched = await bcrypt.compare(password, user[0].password);
      if (!passwordMatched) {
        return {error: true, message: "Wrong password."}
      }
      return { token: this.jwtService.sign({ id: user[0]._id }) };
    } catch (err) {
      return { error: true, message: "Server error " };
    }
  }
  
}
