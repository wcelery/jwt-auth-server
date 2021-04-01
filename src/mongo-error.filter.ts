import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';

const builder = (code: HttpStatus, message: string, host: ArgumentsHost) => {
  const ctx = host.switchToHttp();
  const response = ctx.getResponse();
  response.statusCode = code;
  response.json({
    statusCode: code,
    timestamp: new Date().toISOString(),
    message,
  });
};

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        builder(HttpStatus.FORBIDDEN, 'this email is already exists', host);
    }
  }
}

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    builder(HttpStatus.FORBIDDEN, Error.ValidationError.name, host);
  }
}
