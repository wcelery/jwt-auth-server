import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from './config/db.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.model';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(connectionString)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
