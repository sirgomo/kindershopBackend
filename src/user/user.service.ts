import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/userEntity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    /**
     * Retrieves the total number of users in the database
     * @returns Promise<number> - Total number of users
     */
    async getAllUserCount(): Promise<number> {
        try {
            return await (
                await this.userRepository.find()
            ).length;
        } catch (err) {
            return err;
        }
    }

    /**
     * Creates a new user in the database
     * @param user - An instance of UserEntity containing the user's information
     * @returns Promise<UserEntity> - The newly created user
     */
    async createUser(user: UserEntity): Promise<UserEntity> {
        try {
            const createdUser = await this.userRepository.save(user);
            return createdUser;
        } catch (error) {
            throw new Error(`Could not create user: ${error.message}`);
        }
    }

    /**
     * Retrieves a user from the database by their email
     * @param useremail - The email of the user to retrieve
     * @returns Promise<UserEntity> - The requested user
     */
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

    /**
     * Retrieves a user from the database by their email and removes their password from the returned object
     * @param useremail - The email of the user to retrieve
     * @returns Promise<UserEntity> - The requested user with their password removed
     */
    async getUserByIdOut(useremail: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({
                where: { email: useremail },
            });
            user.password = null;
            return user;
        } catch (error) {
            throw new Error(`Could not get user by id: ${error.message}`);
        }
    }

    /**
     * Updates a user's information in the database
     * @param id - The ID of the user to update
     * @param user - An instance of UserEntity containing the updated information
     * @returns Promise<number> - The number of affected rows in the database
     */
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
            const result = await this.userRepository.update(
                { id: id },
                userToUpdate,
            );
            return result.affected;
        } catch (error) {
            throw new Error(`Could not update user: ${error.message}`);
        }
    }

    /**
     * Deletes a user from the database
     * @param id - The ID of the user to delete
     * @returns Promise<number> - The number of affected rows in the database
     */
    async deleteUser(id: number): Promise<number> {
        try {
            const result = await this.userRepository.delete({ id });
            return result.affected;
        } catch (error) {
            throw new Error(`Could not delete user: ${error.message}`);
        }
    }

    /**
     * Changes a user's password in the database
     * @param pass - An object containing the user's ID and their new password
     * @returns Promise<number> - The number of affected rows in the database
     */
    async changePassword(pass: {
        id: number;
        password: string;
        altpass: string;
    }): Promise<number> {
        try {
            let newpassword = '';
            const userToUpdate = await this.userRepository.findOne({
                where: { id: pass.id },
            });
            if (!userToUpdate) {
                throw new HttpException(
                    `User with id ${pass.id} not found`,
                    HttpStatus.NOT_FOUND,
                );
            }
            if (bcrypt.compareSync(pass.altpass, userToUpdate.password)) {
                const solt = await bcrypt.genSalt(10);
                newpassword = await bcrypt.hash(pass.password, solt);
            } else {
                throw new HttpException(
                    'Alt password stimmt nicht',
                    HttpStatus.NOT_FOUND,
                );
            }

            userToUpdate.password = newpassword;
            return (
                await this.userRepository.update({ id: pass.id }, userToUpdate)
            ).affected;
        } catch (error) {
            return error;
        }
    }
}
