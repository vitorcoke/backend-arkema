import { Module } from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { OccurrenceController } from './occurrence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Occurrence, OccurrenceSchema } from './schema/occurrence.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Occurrence.name, schema: OccurrenceSchema },
    ]),
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'mail',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'mail-consumer',
          },
        },
      },
    ]),
    UserModule,
  ],
  providers: [OccurrenceService],
  controllers: [OccurrenceController],
})
export class OccurrenceModule {}
