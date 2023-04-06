import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ILoginForm } from 'src/model/loginForm';
import { UserEntity } from 'src/entity/userEntity';
import { IUserDTO } from 'src/dto/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtAuthService: JwtService,
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
    if (user === null) {
      return new Error('Unauthorized!');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: await this.jwtAuthService.sign(payload),
    };
  }
  async registerUser(user: IUserDTO) {
    const solt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, solt);
    user.role = 'user';
    let userE: UserEntity;
    Object.assign(userE, user);
    userE.password = password;
    const registered = await this.usersService.createUser(userE);
    if (registered.id !== undefined) {
      return this.login({ email: user.email, password: user.password });
    }
  }
}
