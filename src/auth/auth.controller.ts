import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login() {
    return this.authService.login();
  }

  @Post('signup')
  public signup(@Body() dto: any) {
    console.log({ dto });
    return this.authService.signup();
  }
}
