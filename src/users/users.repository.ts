import * as bcrypt from  'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { UserRole } from './interfaces/user-roles.enum';
import { ICreateUser } from './interfaces/create-user.interfaces';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async hashPassword(password: any): Promise <any>{
      var salt = bcrypt.genSalt(10);
      var hash = await bcrypt.hash(password, salt);
      console.log("SALT : " + salt + " HASH: "+ hash);
      console.log(hash);
      return hash;
    }

    async createUser(User: ICreateUser, role: UserRole): Promise<User> {

        var pass;
        const user = this.create();
        console.log(User);

        user.email = User.email;
        user.name = User.name;
        user.role = role;
        user.status = true;
        pass= this.hashPassword(User.password);
        console.log( pass);
        user.password = await  this.hashPassword(User.password);

        try {
            await user.save()
            return user;
        } catch (error) {
             throw new Error(error);
        }
    }

}
