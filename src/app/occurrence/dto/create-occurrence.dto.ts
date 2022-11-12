import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOccurrenceDto {
  @ApiProperty({ description: 'Cliente da ocorrência' })
  @IsNotEmpty()
  client: string;

  @ApiProperty({ description: 'Tipo do cliente' })
  @IsNotEmpty()
  type_client: string;

  @ApiProperty({ description: 'Nome do cliente' })
  @IsNotEmpty()
  name_client: string;

  @ApiProperty({ description: 'Tipo da ocorrência' })
  @IsNotEmpty()
  type_occurrence: string;

  @ApiProperty({ description: 'Descrição da ocorrência' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Tipo de documento da ocorrência' })
  @IsNotEmpty()
  type_document: string;

  @ApiProperty({ description: 'Documento da ocorrência' })
  @IsNotEmpty()
  document: string;

  @ApiProperty({ description: 'Ação tomada na ocorrência' })
  @IsNotEmpty()
  action: string;

  @ApiProperty({ description: 'ID do responsavel de ocorrência' })
  responsible_id: string[];

  @ApiPropertyOptional({ description: 'Evidência da ocorrência' })
  evidence: string[];

  @ApiProperty({ description: 'Tipo da análise da ocorrência' })
  type_analysis: string;

  @ApiProperty({ description: 'Status da ocorrência' })
  status: string;

  @ApiProperty({ description: 'ID da ação corretiva' })
  remedial_action_id: string;

  @ApiProperty({ description: 'Etapa da ocorrência' })
  step: number;
}
