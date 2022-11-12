import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);

      user.set('password', undefined);

      if (user) {
        return user;
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      if (users) {
        return users;
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findUserById(id: string[]) {
    try {
      const users = await this.userModel.find({ _id: { $in: id } });
      if (!users) throw new NotFoundException('User not found');
      return users;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(filter: FilterQuery<UserDocument>) {
    try {
      const user = await this.userModel.findOne(filter);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
