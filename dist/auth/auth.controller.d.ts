import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        success: string;
    }>;
    logIn(logInDto: LogInDto): Promise<{
        error: boolean;
        message: string;
        token?: undefined;
    } | {
        token: string;
        error?: undefined;
        message?: undefined;
    }>;
}
