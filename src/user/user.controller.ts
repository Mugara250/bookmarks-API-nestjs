import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from './decorators';
import { JwtGuard } from './guards';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  getMe(
    @GetUser() user,
    @GetUser('id') userId: number,
    @GetUser('email') email: string,
  ) {
    console.log({ userId, email });
    return user;
  }
}
