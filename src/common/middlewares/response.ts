import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseFormatMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send.bind(res);

    res.send = (body: any) => {
      const statusCode = res.statusCode.toString();

      const formattedResponse = {
        statusCode,
        result: body,
      };

      return originalSend(formattedResponse);
    };

    next();
  }
}
