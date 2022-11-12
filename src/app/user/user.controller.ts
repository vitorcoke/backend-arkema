import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/helpers/bad-request.swagger';
import { GenericRequestSwagger } from 'src/helpers/generic-request.swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar usuário',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários listados com sucesso',
    type: [CreateUserSwagger],
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao listar usuários',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
