import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendEmailOccurrenceDto {
  @ApiProperty({ description: 'Ocorrência da ação corretiva' })
  @IsNotEmpty()
  occurrence_id: string;

  @ApiProperty({ description: 'ID dos responsaveis' })
  @IsNotEmpty()
  responsible_id: string[];
}
