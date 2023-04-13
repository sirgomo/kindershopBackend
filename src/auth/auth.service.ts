import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const user = (await this.validateUser(
        usero.email,
        usero.password,
      )) as unknown as UserEntity;
      if (user === null) {
        throw new HttpException('Unauthorized !', HttpStatus.FORBIDDEN);
      }
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: await this.jwtAuthService.sign(payload),
      };
    } catch (err) {
      return err;
    }
  }
  async registerUser(user: IUserDTO) {
    try {
      const solt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, solt);
      const first = await this.usersService.getAllUserCount();
      user.role = 'user';
      if (first === 0) {
        user.role = 'admin';
      }
      const userE: UserEntity = new UserEntity();
      Object.assign(userE, user);
      userE.password = password;

      const registered = await this.usersService.createUser(userE);
      if (registered.id !== undefined) {
        return this.login({ email: user.email, password: user.password });
      }
    } catch (err) {
      return err;
    }
  }
}
