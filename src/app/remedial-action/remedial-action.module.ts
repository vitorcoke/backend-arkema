import { Module } from '@nestjs/common';
import { RemedialActionService } from './remedial-action.service';
import { RemedialActionController } from './remedial-action.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RemedialAction,
  RemedialActionSchema,
} from './schema/remedial-action.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RemedialAction.name, schema: RemedialActionSchema },
    ]),
  ],
  providers: [RemedialActionService],
  controllers: [RemedialActionController],
})
export class RemedialActionModule {}
