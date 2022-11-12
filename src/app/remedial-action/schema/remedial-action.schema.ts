import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RemedialActionDocument = RemedialAction & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class RemedialAction {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  occurrence_id: string;

  @ApiProperty()
  @Prop()
  description_problem: string;

  @ApiProperty()
  @Prop()
  description_solution: string;

  @ApiProperty()
  @Prop()
  responsible_id: string[];

  @ApiProperty()
  @Prop({ type: Object })
  five_whys: {
    why1: string;
    why2: string;
    why3: string;
    why4: string;
    why5: string;
  };

  @ApiProperty()
  @Prop({ type: Object })
  w2h: {
    who: string;
    what: string;
    where: string;
    when: string;
    why: string;
    how: string;
    how_much: string;
  };

  @ApiProperty()
  @Prop({ type: Object })
  effectiveness: {
    status: string;
    description: string;
  };

  @ApiProperty()
  @Prop()
  finished: boolean;
}

export const RemedialActionSchema =
  SchemaFactory.createForClass(RemedialAction);
