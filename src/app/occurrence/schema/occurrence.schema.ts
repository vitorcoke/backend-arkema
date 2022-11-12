import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type OccurrenceDocument = Occurrence & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Occurrence {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  client: string;

  @ApiProperty()
  @Prop()
  type_client: string;

  @ApiProperty()
  @Prop()
  name_client: string;

  @ApiProperty()
  @Prop()
  type_occurrence: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  type_document: string;

  @ApiProperty()
  @Prop()
  document: string;

  @ApiProperty()
  @Prop()
  action: string;

  @ApiProperty()
  @Prop()
  responsible_id: string[];

  @ApiProperty()
  @Prop()
  evidence: string[];

  @ApiProperty()
  @Prop()
  type_analysis: string;

  @ApiProperty()
  @Prop()
  status: string;

  @ApiProperty()
  @Prop()
  remedial_action_id: string;

  @ApiProperty()
  @Prop()
  step: number;
}

export const OccurrenceSchema = SchemaFactory.createForClass(Occurrence);
