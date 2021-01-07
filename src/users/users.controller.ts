import { ReturnUser } from './interfaces/return.interfaces';
import { ICreateUser } from './interfaces/create-user.interfaces';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
  async createAdminUser(
    @Body(ValidationPipe) User: ICreateUser,
  ): Promise<ReturnUser> {
    const user = await this.usersService.createAdminUser(User);
    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }
}
