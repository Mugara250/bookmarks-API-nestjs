import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService, LoginDTO, SignupDTO } from '.';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @Post('signup')
  public async signup(@Body() signUpDTO: SignupDTO) {
    return await this.authService.signup(signUpDTO);
  }
}
