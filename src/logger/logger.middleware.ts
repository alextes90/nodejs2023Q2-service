import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './custom-logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLogger();
  use(req: Request, res: Response, next: NextFunction) {
    const { body, baseUrl, query } = req;
    const bodyStringified = JSON.stringify(body);
    const queryStrigified = JSON.stringify(query);
    this.logger.log(
      `Logging HTTP request: body: ${bodyStringified}, url: ${baseUrl}, query: ${queryStrigified}, response status: ${res.statusCode}`,
    );
    next();
  }
}
