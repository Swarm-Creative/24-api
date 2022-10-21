import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerError extends HttpException {
  constructor(error: any) {
    super(
      // Show a standard error on PROD and the actual error everywhere else
      process.env.NODE_ENV === 'production'
        ? 'An internal server error occurred'
        : error,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}