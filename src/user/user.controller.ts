import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from './decorators';
import { JwtGuard } from './guards';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(
    @GetUser() user: User,
    @GetUser('id') userId: number,
    @GetUser('email') email: string,
  ) {
    console.log({ userId, email });
    return user;
  }
}
