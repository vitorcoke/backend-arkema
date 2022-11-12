import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
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
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { SendEmailOccurrenceDto } from './dto/send-mail-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { OccurrenceService } from './occurrence.service';
import { CreateOccurrenceSwagger } from './swagger/create-occurrence.swagger';
import { UpdateOccurrenceSwagger } from './swagger/update-occurrence.swagger';

@ApiTags('Occurrence')
@Controller('occurrence')
export class OccurrenceController {
  constructor(private readonly occurrenceService: OccurrenceService) {}

  @ApiOperation({ summary: 'Criar uma nova ocorrência' })
  @ApiResponse({
    status: 201,
    description: 'Ocorrência criada com sucesso',
    type: CreateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar ocorrência',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @Post()
  async create(@Body() createOccurrenceDto: CreateOccurrenceDto) {
    return await this.occurrenceService.create(createOccurrenceDto);
  }

  @ApiOperation({ summary: 'Listar todas as ocorrências' })
  @ApiResponse({
    status: 200,
    description: 'Ocorrências listadas com sucesso',
    type: [CreateOccurrenceSwagger],
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao listar ocorrências',
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
    return await this.occurrenceService.findAll();
  }

  @ApiOperation({ summary: 'Atualizar uma ocorrência' })
  @ApiResponse({
    status: 200,
    description: 'Ocorrência atualizada com sucesso',
    type: UpdateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao atualizar ocorrência',
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
    @Body() updateOccurrenceDto: UpdateOccurrenceDto,
  ) {
    return await this.occurrenceService.update(id, updateOccurrenceDto);
  }

  @ApiOperation({ summary: 'Enviar email para os usuarios solicitados' })
  @ApiResponse({
    status: 200,
    description: 'Email enviado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao enviar email',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor',
    type: GenericRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('send-email')
  async sendEmail(@Body() sendEmailOccurrenceDto: SendEmailOccurrenceDto) {
    return await this.occurrenceService.sendMail(sendEmailOccurrenceDto);
  }

  @ApiOperation({ summary: 'Remover uma ocorrência' })
  @ApiResponse({
    status: 202,
    description: 'Ocorrência removida com sucesso',
    type: CreateOccurrenceSwagger,
  })
  @ApiResponse({
    status: 402,
    description: 'Erro ao remover ocorrência',
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
  async remove(@Param('id') id: string) {
    return await this.occurrenceService.remove(id);
  }
}
