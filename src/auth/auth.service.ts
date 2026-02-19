import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDTO: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDTO.email,
      },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');
    const hashCheck = await argon.verify(user.hash, loginDTO.password);
    if (!hashCheck) throw new ForbiddenException('Invalid credentials');
    // const { hash, ...safeUser } = user;
    return this.signToken(user.id, user.email);
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

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ id: number; access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const token = await this.jwtService.signAsync(payload);
    return { id: userId, access_token: token };
  }
}
