import { PartialType } from '@nestjs/swagger';
import { CreateRemedialActionSwagger } from './create-remedial-action.swagger';

export class UpdateRemedialActionSwagger extends PartialType(
  CreateRemedialActionSwagger,
) {}
