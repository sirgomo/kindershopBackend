import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ILoginForm } from 'src/model/loginForm';
import { UserEntity } from 'src/entity/userEntity';
import { UserDTO } from 'src/dto/userDTO';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtAuthService: JwtService,
    ) {}

    /**
     * Validates user login credentials
     * @param useremail - string representing user's email
     * @param password - string representing user's password
     * @returns Promise resolving to user object if login is valid, null otherwise
     */
    async validateUser(useremail: string, password: string): Promise<any> {
        const user = await this.usersService.getUserById(useremail);
        if (user && bcrypt.compareSync(password, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Logs in user with given credentials and returns an access token
     * @param usero - object containing user's email and password
     * @returns Promise resolving to an object with an access token if login is valid, error object otherwise
     */
    async login(usero: ILoginForm): Promise<any> {
        try {
            const user = (await this.validateUser(
                usero.email,
                usero.password,
            )) as unknown as UserEntity;
            if (user === null) {
                throw new HttpException('Unauthorized !', HttpStatus.FORBIDDEN);
            }
            const payload = {
                email: user.email,
                sub: user.id,
                role: user.role,
            };
            return {
                access_token: await this.jwtAuthService.sign(payload),
            };
        } catch (err) {
            return err;
        }
    }

    /**
     * Registers user with given information
     * @param user - object containing user's information including email and password
     * @returns Promise resolving to an object with an access token if registration is successful and user is logged in, error object otherwise
     */
    async registerUser(user: UserDTO) {
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
                return this.login({
                    email: user.email,
                    password: user.password,
                });
            }
        } catch (err) {
            return err;
        }
    }

    /**
     * Decodes a JWT token and returns its payload
     * @param token - string representing a JWT token
     * @returns decoded payload of the JWT token
     */
    public decode(token: string) {
        return this.jwtAuthService.decode(token);
    }
}
