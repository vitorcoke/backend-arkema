import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/app/user/schema/user.schema';

export class LoginSwagger {
  @ApiProperty({ description: 'Usuário autenticado' })
  user: User;

  @ApiProperty({ description: 'Token de acesso' })
  token: string;
}
