import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public login() {
    return { message: 'I have logged in' };
  }
  public signup() {
    return { message: 'I have signed up' };
  }
}
