import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from './decorators';
import { JwtGuard } from './guards';
import { User } from '@prisma/client';
import { RolesGuard } from './guards/roles.guard';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorator';

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

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {}
}
