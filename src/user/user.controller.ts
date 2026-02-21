import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from './decorators';
import { JwtGuard } from './guards';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: { userId: string; email: string }) {
    return user;
  }
}
