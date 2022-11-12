import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { OccurrenceModule } from './app/occurrence/occurrence.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RemedialActionModule } from './app/remedial-action/remedial-action.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/arkema'),
    UserModule,
    OccurrenceModule,
    AuthModule,
    RemedialActionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
