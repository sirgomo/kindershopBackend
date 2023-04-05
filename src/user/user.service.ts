import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/userEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      const createdUser = await this.userRepository.save(user);
      return createdUser;
    } catch (error) {
      throw new Error(`Could not create user: ${error.message}`);
    }
  }

  async getUserById(useremail: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: useremail },
      });
      return user;
    } catch (error) {
      throw new Error(`Could not get user by id: ${error.message}`);
    }
  }

  async updateUser(id: number, user: UserEntity): Promise<number> {
    try {
      const userToUpdate = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!userToUpdate) {
        throw new Error(`User with id ${id} not found`);
      }
      userToUpdate.email = user.email;
      userToUpdate.vorname = user.vorname;
      userToUpdate.nachname = user.nachname;
      userToUpdate.strasse = user.strasse;
      userToUpdate.hausnummer = user.hausnummer;
      userToUpdate.plz = user.plz;
      userToUpdate.stadt = user.stadt;
      userToUpdate.l_nachname = user.l_nachname;
      userToUpdate.l_strasse = user.l_strasse;
      userToUpdate.l_hausnummer = user.l_hausnummer;
      userToUpdate.l_plz = user.l_plz;
      userToUpdate.l_stadt = user.l_stadt;
      const result = await this.userRepository.update({ id: id }, userToUpdate);
      return result.affected;
    } catch (error) {
      throw new Error(`Could not update user: ${error.message}`);
    }
  }

  async deleteUser(id: number): Promise<number> {
    try {
      const result = await this.userRepository.delete({ id });
      return result.affected;
    } catch (error) {
      throw new Error(`Could not delete user: ${error.message}`);
    }
  }

  async changePassword(pass: {
    id: number;
    password: string;
  }): Promise<number> {
    try {
      const userToUpdate = await this.userRepository.findOne({
        where: { id: pass.id },
      });
      if (!userToUpdate) {
        throw new Error(`User with id ${pass.id} not found`);
      }
      userToUpdate.password = pass.password;
      return (await this.userRepository.update({ id: pass.id }, userToUpdate))
        .affected;
    } catch (error) {
      throw new Error(`Could not change password: ${error.message}`);
    }
  }
}
