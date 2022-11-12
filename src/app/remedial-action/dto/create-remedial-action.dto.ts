import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRemedialActionDto {
  @ApiProperty({ description: 'Ocorrência da ação corretiva' })
  @IsNotEmpty()
  occurrence_id: string;

  @ApiProperty({ description: 'Descrição do problema' })
  description_problem: string;

  @ApiProperty({ description: 'Descrição da solução' })
  description_solution: string;

  @ApiProperty({ description: 'Responsáveis pela ação corretiva' })
  responsible_id: string[];

  @ApiProperty({ description: '5 Porquês' })
  five_whys: {
    why1: string;
    why2: string;
    why3: string;
    why4: string;
    why5: string;
  };
  @ApiProperty({ description: 'W2H' })
  w2h: {
    who: string;
    what: string;
    where: string;
    when: string;
    why: string;
    how: string;
    how_much: string;
  };

  @ApiProperty({ description: 'Eficácia' })
  effectiveness: {
    status: string;
    description: string;
  };

  @ApiProperty({ description: 'Ação corretiva finalizada' })
  finished: boolean;
}
