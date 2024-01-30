"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./schema/user.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { username, name, email, password } = signUpDto;
        const userExists = await this.userModel.findOne({ email: email });
        if (userExists)
            throw new common_1.ConflictException('User already exists. PLease try different email..');
        const hashed = await bcrypt.hash(password, 10);
        await this.userModel.create({
            username,
            name,
            email,
            password: hashed
        });
        return { success: 'User created' };
    }
    async logIn(logInDto) {
        try {
            const { email, password } = logInDto;
            const user = await this.userModel.find({ email: email });
            if (user.length === 0) {
                return { error: true, message: "User with email does not exist." };
            }
            const passwordMatched = await bcrypt.compare(password, user[0].password);
            if (!passwordMatched) {
                return { error: true, message: "Wrong password." };
            }
            return { token: this.jwtService.sign({ id: user[0]._id }) };
        }
        catch (err) {
            return { error: true, message: "Server error " };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map