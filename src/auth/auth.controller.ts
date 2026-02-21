import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() loginDTO: AuthDTO) {
    return await this.authService.login(loginDTO);
  }

  @Post('signup')
  public async signup(@Body() signupDTO: AuthDTO) {
    return await this.authService.signup(signupDTO);
  }
}
