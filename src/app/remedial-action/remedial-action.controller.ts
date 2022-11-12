import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BadRequestSwagger } from 'src/helpers/bad-request.swagger';
import { GenericRequestSwagger } from 'src/helpers/generic-request.swagger';
import { CreateOccurrenceSwagger } from '../occurrence/swagger/create-occurrence.swagger';
import { UpdateOccurrenceSwagger } from '../occurrence/swagger/update-occurrence.swagger';
import { CreateRemedialActionDto } from './dto/create-remedial-action.dto';
import { UpdateRemedialActionDto } from './dto/update-remedial-action.dto';
import { RemedialActionService } from './remedial-action.service';

@ApiTags('RemedialAction')
@Controller('remedial-action')
export class RemedialActionController {
  constructor(private readonly remedialActionService: RemedialActionService) {}

  @ApiOperation({ summary: 'Cria uma ação corretiva' })
  @ApiResponse({
    status: 201,
    description: 'Ação corretiva criada com sucesso',
    type: CreateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Erro ao criar ação corretiva',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRemedialActionDto: CreateRemedialActionDto) {
    return await this.remedialActionService.create(createRemedialActionDto);
  }

  @ApiOperation({ summary: 'Listar todas as ações corretivas' })
  @ApiResponse({
    status: 200,
    description: 'Ações corretivas listadas com sucesso',
    type: [CreateOccurrenceSwagger],
  })
  @ApiResponse({
    status: 401,
    description: 'Erro ao listar ações corretivas',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.remedialActionService.findAll();
  }

  @ApiOperation({ summary: 'Buscar ação corretiva por ID' })
  @ApiResponse({
    status: 200,
    description: 'Ação corretiva encontrada com sucesso',
    type: CreateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar ação corretiva',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.remedialActionService.findOne(id);
  }

  @ApiOperation({ summary: 'Buscar ação corretiva por ID da ocorrencia' })
  @ApiResponse({
    status: 200,
    description: 'Ação corretiva encontrada com sucesso',
    type: CreateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao buscar ação corretiva',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('occurrence/:id')
  async findOneByOccurrenceId(@Param('id') id: string) {
    return await this.remedialActionService.finOneByOccurrenceId(id);
  }

  @ApiOperation({ summary: 'Alterar ação corretiva por ID' })
  @ApiResponse({
    status: 201,
    description: 'Ação corretiva alterada com sucesso',
    type: UpdateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Erro ao alterar ação corretiva',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRemedialActionDto: UpdateRemedialActionDto,
  ) {
    console.log(updateRemedialActionDto);
    return await this.remedialActionService.update(id, updateRemedialActionDto);
  }

  @ApiOperation({ summary: 'Deletar ação corretiva por ID da ocorrencia' })
  @ApiResponse({
    status: 201,
    description: 'Ação corretiva alterada com sucesso',
    type: UpdateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Erro ao alterar ação corretiva',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeByOccurrenceId(@Param('id') id: string) {
    return await this.remedialActionService.removeByOccurrenceId(id);
  }
}
