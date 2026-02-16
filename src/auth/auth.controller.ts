import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginDTO, SignupDTO } from '.';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    console.log({ username, password });
    return this.authService.login();
  }

  @Post('signup')
  public signup(@Body() dto: SignupDTO) {
    console.log({ dto });
    return this.authService.signup();
  }
}
