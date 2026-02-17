import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDTO } from '.';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  public async login(loginDTO: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDTO.email,
      },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');
    const hashCheck = await argon.verify(user.hash, loginDTO.password);
    if (!hashCheck) throw new ForbiddenException('Invalid credentials');
    const { hash, ...safeUser } = user;
    return safeUser;
  }
  public async signup(signUpDTO: AuthDTO) {
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
