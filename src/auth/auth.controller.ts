import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService, AuthDTO } from '.';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDTO: AuthDTO) {
    return await this.authService.login(loginDTO);
  }

  @Post('signup')
  public async signup(@Body() signupDTO: AuthDTO) {
    return await this.authService.signup(signupDTO);
  }
}
