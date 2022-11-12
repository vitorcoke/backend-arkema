import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/helpers/bad-request.swagger';
import { GenericRequestSwagger } from 'src/helpers/generic-request.swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginSwagger } from './swagger/login.swagger';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: LoginSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao realizar login',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return await this.authService.login(req.user);
  }
}
