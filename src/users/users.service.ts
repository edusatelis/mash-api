import { User } from './user.entity';
import { ICreateUser } from './interfaces/create-user.interfaces';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UserRole } from './interfaces/user-roles.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async createAdminUser(User: ICreateUser): Promise<User>{
        if(User.password != User.passwordConfirmation){
            throw new UnprocessableEntityException('As senhas não conferem');
        }else{
            return this.userRepository.createUser(User, UserRole.ADMIN);
        }
    }
}
