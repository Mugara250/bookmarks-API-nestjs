import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { LoginDTO, SignupDTO } from '.';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  public login(loginDTO: LoginDTO) {
    return { message: 'I have logged in' };
  }
  public async signup(signUpDTO: SignupDTO) {
    try {
      const hashedPassword = await argon.hash(signUpDTO.password);
      const user = await this.prisma.user.create({
        data: {
          email: signUpDTO.email,
          hash: hashedPassword,
        },
      });
      const { hash, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }
}
