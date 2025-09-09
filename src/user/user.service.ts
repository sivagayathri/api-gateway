import { Inject, Injectable, Post } from '@nestjs/common';
import { CreateUserDto, SignInDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userClient.send('create-user', createUserDto);
  }

  createAdmin(createUserDto: CreateUserDto) {
    return this.userClient.send('create-admin', createUserDto);
  }

  findOne(id: number) {
    return this.userClient.send('get-user', id);
  }

  login(signInDto: SignInDto) {
    return this.userClient.send('login', signInDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
