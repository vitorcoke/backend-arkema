import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({ username: username });

    if (!user) null;

    const passwordValidete = await bcrypt.compare(password, user.password);

    if (!passwordValidete) return null;

    user.set('password', undefined);

    return user;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      permission: user.permission,
      sub: user._id,
    };

    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
