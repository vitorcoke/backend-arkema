import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Nome de login' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Permissão do usuário' })
  @IsNotEmpty()
  permission: number;
}
