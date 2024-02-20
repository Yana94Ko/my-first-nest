import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { isEmail } from 'validator';
import { PrismaService } from './../../../db/prisma/prisma.service';
import { UsersLogInDto, UsersSignUpDto } from './users.dto';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  generateAccessToken(user: Pick<User, 'id' | 'email'>) {
    const accessToken = sign({ email: user.email }, JWT_SECRET_KEY, {
      subject: String(user.id),
      expiresIn: '5m',
    });
    return accessToken;
  }

  async signUp(dto: UsersSignUpDto) {
    const { email, password } = dto;
    if (!email.trim()) throw new Error('No Email Input');
    if (!isEmail(email)) throw new Error('Invalid Email');
    if (!password.trim()) throw new Error('No Password Input');
    if (password.length < 4) throw new Error('Password is Too Short');
    const encryptedPassword = await hash(password, 12);
    let newUser: User;
    try {
      newUser = await this.prismaService.user.create({
        data: {
          email: email,
          encryptedPassword: encryptedPassword,
          profile: {
            create: {},
          },
          cart: {
            create: {},
          },
        },
      });
    } catch (e) {
      throw new Error('fail to signUp');
    }
    const accessToken = this.generateAccessToken(newUser);
    return { accessToken: accessToken };
  }

  async logIn(dto: UsersLogInDto) {
    const { email, password } = dto;

    if (!email.trim()) throw new Error('No Email Input');
    if (!isEmail(email)) throw new Error('Invalid Email');
    if (!password.trim()) throw new Error('No Password Input');
    if (password.length < 4) throw new Error('Password is Too Short');
    let user: User;
    try {
      user = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (e) {
      throw new Error('Cannot find User');
    }
    try {
      await compare(password, user.encryptedPassword);
    } catch (e) {
      throw new Error('Invalid password');
    }
    const accessToken = this.generateAccessToken(user);
    return { accessToken: accessToken };
  }
}
