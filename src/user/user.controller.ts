import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/entity/userEntity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  @Get(':id')
  async getUserById(@Param('id') email: string): Promise<UserEntity> {
    return await this.userService.getUserByIdOut(email);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserEntity,
  ): Promise<number> {
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<number> {
    return await this.userService.deleteUser(id);
  }

  @Patch('/changepassword')
  async changePassword(
    @Body() pass: { id: number; password: string },
  ): Promise<number> {
    return await this.userService.changePassword(pass);
  }
}
