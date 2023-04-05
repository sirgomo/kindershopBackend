import { Injectable } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth-service.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ILoginForm } from 'src/model/loginForm';
import { UserEntity } from 'src/entity/userEntity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async validateUser(useremail: string, password: string): Promise<any> {
    const user = await this.usersService.getUserById(useremail);
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(usero: ILoginForm): Promise<any> {
    const user = this.validateUser(
      usero.email,
      usero.password,
    ) as unknown as UserEntity;
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtAuthService.signPayload(payload),
    };
  }
}
