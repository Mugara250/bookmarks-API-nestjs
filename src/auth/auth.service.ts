import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { LoginDTO, SignupDTO } from '.';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  public login(loginDTO: LoginDTO) {
    return { message: 'I have logged in' };
  }
  public async signup(signUpDTO: SignupDTO) {
    const hashedPassword = await argon.hash(signUpDTO.password);
    const user = await this.prisma.user.create({
      data: {
        email: signUpDTO.email,
        hash: hashedPassword,
      },
      // select: {
      //   id: true,
      //   email: true,
      //   createdAt: true,
      // },
    });
    const { hash, ...safeUser } = user;
    return safeUser;
  }
}
