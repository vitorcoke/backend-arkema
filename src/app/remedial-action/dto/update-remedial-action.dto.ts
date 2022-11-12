import { PartialType } from '@nestjs/swagger';
import { CreateRemedialActionDto } from './create-remedial-action.dto';

export class UpdateRemedialActionDto extends PartialType(
  CreateRemedialActionDto,
) {}
