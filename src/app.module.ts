import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connectionString } from './config/db.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(connectionString, { useCreateIndex: true }), //connects with AuthModule
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
