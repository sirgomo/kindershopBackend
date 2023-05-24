import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ILoginForm } from 'src/model/loginForm';
import { UserDTO } from 'src/dto/userDTO';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() user: ILoginForm) {
        return this.authService.login(user);
    }
    @Post('new')
    async registerUser(@Body() user: UserDTO) {
        return this.authService.registerUser(user);
    }
}
