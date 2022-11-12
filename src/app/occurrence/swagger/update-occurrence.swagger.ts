import { PartialType } from '@nestjs/swagger';
import { Occurrence } from '../schema/occurrence.schema';

export class UpdateOccurrenceSwagger extends PartialType(Occurrence) {}
